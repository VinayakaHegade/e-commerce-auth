"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { InputWithLabel } from "./input-with-label";
import { Button } from "./ui/button";
import { createUserSchema, type CreateUserInput } from "~/lib/user-schema";
import { api } from "~/trpc/react";

function SignUpForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const { mutate, isPending } = api.auth.registerUser.useMutation({
    onSuccess: (data) => {
      router.push(`/verify-email?email=${encodeURIComponent(data.data.user.email)}`);
    },
    onError: (error) => {
      setServerError(error.message || "An error occurred during sign up");
    },
  });

  function onSubmit(data: CreateUserInput) {
    clearErrors();
    setServerError(null);
    mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex w-full flex-col gap-6 md:gap-8">
      {serverError && (
        <div
          className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <span className="block sm:inline">{serverError}</span>
        </div>
      )}

      <InputWithLabel
        id="name"
        label="Name"
        type="text"
        placeholder="Enter your name"
        {...register("name")}
        error={errors.name?.message}
      />
      <InputWithLabel
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email?.message}
      />
      <InputWithLabel
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        {...register("password")}
        error={errors.password?.message}
      />
      <Button
        type="submit"
        className="mt-2 min-h-14 text-wrap bg-black p-[18px] text-white md:text-base md:tracking-[0.07em]"
        disabled={isPending}
      >
        {isPending ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
      </Button>
    </form>
  );
}

export default SignUpForm;
