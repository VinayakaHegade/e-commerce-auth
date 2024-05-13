import {
  createUserSchema,
  loginUserSchema,
  type CreateUserInput,
  type LoginUserInput,
} from "~/server/auth/user-schema";
import { protectedProcedure, publicProcedure, t } from "../trpc";
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from "~/server/auth/auth-controller";

const authRouter = t.router({
  registerUser: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }: { input: CreateUserInput }) =>
      registerHandler({ input }),
    ),
  loginUser: publicProcedure
    .input(loginUserSchema)
    .mutation(({ input }: { input: LoginUserInput }) =>
      loginHandler({ input }),
    ),
  logoutUser: protectedProcedure.mutation(() => logoutHandler()),
});

export default authRouter;
