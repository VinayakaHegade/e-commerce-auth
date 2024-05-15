import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getUserHandler } from "../utils/user-controller";

const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ ctx }) => getUserHandler({ ctx })),
});

export default userRouter;
