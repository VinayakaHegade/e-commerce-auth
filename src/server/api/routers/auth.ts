import { createUserSchema, loginUserSchema } from "~/lib/user-schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from "~/server/api/utils/auth-controller";

const authRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(createUserSchema)
    .mutation(({ input, ctx }) => registerHandler({ input, ctx })),

  loginUser: publicProcedure
    .input(loginUserSchema)
    .mutation(({ input, ctx }) => loginHandler({ input, ctx })),

  logoutUser: protectedProcedure.mutation(() => logoutHandler()),
});

export default authRouter;
