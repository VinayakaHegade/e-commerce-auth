import { createUserSchema, loginUserSchema } from "~/lib/user-schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { loginHandler, logoutHandler, registerHandler } from "~/server/api/utils/auth-controller";
import { z } from "zod";
import {
  resendVerificationCodeHandler,
  verifyEmailHandler,
} from "../utils/email-verification-controller";

const authRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(createUserSchema)
    .mutation(({ input, ctx }) => registerHandler({ input, ctx })),
  loginUser: publicProcedure
    .input(loginUserSchema)
    .mutation(({ input, ctx }) => loginHandler({ input, ctx })),
  logoutUser: protectedProcedure.mutation(() => logoutHandler()),
  verifyEmail: publicProcedure
    .input(z.object({ email: z.string(), code: z.string() }))
    .mutation(({ input }) => verifyEmailHandler(input)),
  resendVerificationCode: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(({ input }) => resendVerificationCodeHandler(input)),
});

export default authRouter;
