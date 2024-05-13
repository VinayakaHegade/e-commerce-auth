import authRouter from "~/server/api/routers/auth-route";
import { protectedProcedure, t } from "~/server/api/trpc";
import { getUserHandler } from "~/server/auth/user-controller";
import { createContext } from "~/utils/trpc-context";

const statusCheckRouter = t.router({
  statuschecker: t.procedure.query(() => {
    return {
      status: "success",
      message: "Welcome to the trpc server!",
    };
  }),
});

const userRouter = t.router({
  getUser: protectedProcedure.query(({ ctx }) => getUserHandler({ ctx })),
});

export const appRouter = t.mergeRouters(
  statusCheckRouter,
  authRouter,
  userRouter,
);

export const createCaller = t.createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
