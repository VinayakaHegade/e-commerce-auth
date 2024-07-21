import { TRPCError } from "@trpc/server";
import { type Context } from "./auth-controller";

export const getCategoriesHandler = async ({
  input,
  ctx,
}: {
  input: { page: number };
  ctx: Context;
}) => {
  try {
    const pageSize = 6;
    const skip = (input.page - 1) * pageSize;

    const [categories, totalCategories, userCategories] = await Promise.all([
      ctx.db.category.findMany({
        skip,
        take: pageSize,
        orderBy: { name: "asc" },
      }),
      ctx.db.category.count(),
      ctx.db.categoryOnUser.findMany({
        where: { userId: ctx.user?.id },
        select: { categoryId: true },
      }),
    ]);

    return {
      status: "success",
      data: {
        categories,
        totalPages: Math.ceil(totalCategories / pageSize),
        userCategories: userCategories.map((uc) => uc.categoryId),
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const updateUserCategoriesHandler = async ({
  input,
  ctx,
}: {
  input: { categoryIds: number[] };
  ctx: Context;
}) => {
  try {
    const userId = ctx.user?.id;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not authenticated",
      });
    }

    // Removes all existing user categories
    await ctx.db.categoryOnUser.deleteMany({
      where: { userId },
    });

    // Adds new user categories
    await ctx.db.categoryOnUser.createMany({
      data: input.categoryIds.map((categoryId) => ({ userId, categoryId })),
    });

    return {
      status: "success",
      message: "User categories updated successfully",
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
