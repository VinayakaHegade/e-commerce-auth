import { createTRPCRouter, publicProcedure } from "../trpc";

const statusCheckRouter = createTRPCRouter({
  statuschecker: publicProcedure.query(() => {
    return {
      status: "success",
      message: "Welcome to the trpc server!",
    };
  }),
});

export default statusCheckRouter;
