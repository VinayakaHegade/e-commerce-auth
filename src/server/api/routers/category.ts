import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { getCategoriesHandler, updateUserCategoriesHandler } from "../utils/category-controller";

const categoryRouter = createTRPCRouter({
  getCategories: protectedProcedure
    .input(z.object({ page: z.number().min(1) }))
    .query(({ input, ctx }) => getCategoriesHandler({ input, ctx })),

  updateUserCategories: protectedProcedure
    .input(z.object({ categoryIds: z.array(z.number()) }))
    .mutation(({ input, ctx }) => updateUserCategoriesHandler({ input, ctx })),
});

export default categoryRouter;
