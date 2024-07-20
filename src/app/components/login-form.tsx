import { InputWithLabel } from "./input-with-label";
import { Button } from "./ui/button";
import { Label } from "./ui/lable";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type LoginUserInput, loginUserSchema } from "~/lib/user-schema";
import { api } from "~/trpc/react";
import { useState } from "react";
import { PasswordInput } from "./password-input";

function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const { mutate, isPending } = api.auth.loginUser.useMutation({
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      setServerError(error.message || "An error occurred during login");
    },
  });

  const onSubmit = (data: LoginUserInput) => {
    clearErrors();
    setServerError(null);
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      {serverError && (
        <div
          className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <span className="block sm:inline">{serverError}</span>
        </div>
      )}

      <InputWithLabel
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email?.message}
      />
      <div className="flex flex-col gap-[7px]">
        <Label htmlFor="password" className="text-sm font-normal md:text-base">
          Password
        </Label>
        <PasswordInput id="password" placeholder="Enter your password" {...register("password")} />
        {errors.password?.message && (
          <p className="text-sm text-red-500">{errors.password?.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="mt-2 min-h-14 text-wrap bg-black p-[18px] text-white md:text-base md:tracking-[0.07em]"
        disabled={isPending}
      >
        {isPending ? "LOGGING IN" : "LOGIN"}
      </Button>
    </form>
  );
}

export default LoginForm;
