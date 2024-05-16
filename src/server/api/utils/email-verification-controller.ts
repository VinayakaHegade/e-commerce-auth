import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import {
  generateAndStoreVerificationCode,
  handleFailedOtpAttempt,
  isVerificationCodeValid,
  markUserAsVerified,
  resetFailedOtpAttempts,
} from "~/utils/emailVerification";

export const verifyEmailHandler = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  const isCodeValid = await isVerificationCodeValid(email, code);
  if (!isCodeValid) {
    await handleFailedOtpAttempt(email);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid or expired verification code",
    });
  }

  await markUserAsVerified(email);
  await resetFailedOtpAttempts(email);

  return { status: "success" };
};

export const resendVerificationCodeHandler = async ({
  email,
}: {
  email: string;
}) => {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
  }

  if (user.verificationExpiry && user.verificationExpiry > new Date()) {
    await db.user.update({
      where: { email },
      data: {
        verificationCode: null,
        verificationExpiry: null,
      },
    });
  }

  await generateAndStoreVerificationCode(email, 10);

  return { status: "success", message: "New verification code sent" };
};
