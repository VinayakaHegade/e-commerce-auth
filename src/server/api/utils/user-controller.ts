import { TRPCError } from "@trpc/server";
import { type Context } from "./auth-controller";

export const getUserHandler = ({ ctx }: { ctx: Context }) => {
  try {
    const user = ctx.user;
    const name = user?.name;

    return {
      status: "success",
      data: {
        name,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
