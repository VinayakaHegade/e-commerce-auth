import { TRPCError } from "@trpc/server";
import crypto from "crypto";
import { db } from "~/server/db";
import { MAX_OTP_ATTEMPTS, OTP_LOCKOUT_DURATION } from "./constants";
import { sendVerificationEmail } from "./sendEmail";

/**
 * Generates a random code of the specified length
 * @param length - The desired length of the code
 * @returns A random code as a string
 */
const generateRandomCode = (length: number): string => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

export const generateAndStoreVerificationCode = async (
  email: string,
  expirationMinutes: number
) => {
  const verificationCode = generateRandomCode(8);
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + expirationMinutes);

  await db.user.update({
    where: { email },
    data: {
      verificationCode,
      verificationExpiry: expirationTime,
    },
  });

  const emailSent = await sendVerificationEmail(email, verificationCode);
  if (!emailSent) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to send verification email",
    });
  }
};

export const isVerificationCodeValid = async (email: string, code: string) => {
  const user = await db.user.findUnique({ where: { email } });

  if (
    !user ||
    user.verificationCode !== code ||
    !user.verificationExpiry ||
    user.verificationExpiry < new Date()
  ) {
    return false;
  }

  return true;
};

export const markUserAsVerified = async (email: string) => {
  await db.user.update({
    where: { email },
    data: {
      verified: true,
      verificationCode: null,
      verificationExpiry: null,
    },
  });
};

export const handleFailedOtpAttempt = async (email: string) => {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
  }

  const failedAttempts = (user.failedOtpAttempts ?? 0) + 1;
  if (failedAttempts >= MAX_OTP_ATTEMPTS) {
    const lockoutExpiry = new Date();
    lockoutExpiry.setMinutes(lockoutExpiry.getMinutes() + OTP_LOCKOUT_DURATION);
    await db.user.update({
      where: { email },
      data: {
        failedOtpAttempts: 0,
        otpLockoutExpiry: lockoutExpiry,
      },
    });

    return {
      status: "error",
      message: `Account temporarily locked due to too many failed attempts. Please try again after ${OTP_LOCKOUT_DURATION} minutes.`,
    };
  }

  await db.user.update({
    where: { email },
    data: { failedOtpAttempts: failedAttempts },
  });
};

export const resetFailedOtpAttempts = async (email: string) => {
  await db.user.update({
    where: { email },
    data: {
      failedOtpAttempts: 0,
      otpLockoutExpiry: null,
    },
  });
};
