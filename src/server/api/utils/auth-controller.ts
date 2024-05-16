import {
  type CreateUserInput,
  type LoginUserInput,
} from "../../../lib/user-schema";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import jwt, { type Secret } from "jsonwebtoken";
import { cookies } from "next/headers";
import { type PrismaClient } from "@prisma/client";
import { type DefaultArgs } from "@prisma/client/runtime/library";
import { generateAndStoreVerificationCode } from "~/utils/emailVerification";

export type Context =
  | {
      user: null;
      db: PrismaClient<
        {
          log: ("query" | "warn" | "error")[];
        },
        never,
        DefaultArgs
      >;
    }
  | {
      user: {
        id: string;
        email: string;
        name: string;
        verified: boolean | null;
        verificationCode: string | null;
        verificationExpiry: Date | null;
        failedOtpAttempts: number | null;
        otpLockoutExpiry: Date | null;
      };
      db: PrismaClient<
        {
          log: ("query" | "warn" | "error")[];
        },
        never,
        DefaultArgs
      >;
    };

export const registerHandler = async ({
  input,
  ctx,
}: {
  input: CreateUserInput;
  ctx: Context;
}) => {
  try {
    const hashedPassword = await bcrypt.hash(input.password, 12);

    const user = await ctx.db.user.create({
      data: {
        email: input.email,
        name: input.name,
        password: hashedPassword,
      },
    });

    await generateAndStoreVerificationCode(input.email, 10);

    const { password, ...userWithoutPassword } = user;

    return {
      status: "success",
      message: "Please check your email for the verification code",
      data: {
        user: userWithoutPassword,
      },
    };
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email already exists",
      });
    }
    throw err;
  }
};

export const loginHandler = async ({
  input,
  ctx,
}: {
  input: LoginUserInput;
  ctx: Context;
}) => {
  try {
    const user = await ctx.db.user.findUnique({
      where: { email: input.email },
    });

    if (user?.otpLockoutExpiry && user.otpLockoutExpiry > new Date()) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: `Account temporarily locked due to too many failed attempts. Please try again after ${Math.ceil((user.otpLockoutExpiry.getTime() - Date.now()) / (1000 * 60))} minutes.`,
      });
    }

    const compare = await bcrypt.compare(input.password, user?.password ?? "");

    if (!user || !compare || !(user?.verified ?? false)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: user?.verified
          ? "Invalid email or password"
          : "Account not verified",
      });
    }

    const secret: Secret = process.env.JWT_SECRET!;

    const token = jwt.sign({ sub: user.id }, secret, {
      expiresIn: 60 * 60,
    });

    const cookieOptions = {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
    };

    cookies().set("token", token, cookieOptions);

    return {
      status: "success",
      token,
    };
  } catch (err) {
    throw err;
  }
};

export const logoutHandler = async () => {
  try {
    cookies().set("token", "", {
      maxAge: -1,
    });
    return { status: "success" };
  } catch (err) {
    throw err;
  }
};
