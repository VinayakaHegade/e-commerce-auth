"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWithLabel } from "./input-with-label";
import { Button } from "./ui/button";
import { createUserSchema, type CreateUserInput } from "~/lib/user-schema";
import { api } from "~/trpc/react";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const { mutate, isPending } = api.auth.registerUser.useMutation({
    onSuccess: () => {
      // Todo: Redirect to otp page after successful signup
      console.log("success login");
    },
    onError: (error) => {
      setError("root", {
        type: "manual",
        message: error.message || "An error occurred during sign up",
      });
    },
  });

  function onSubmit(data: CreateUserInput) {
    mutate(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-[456px] flex-col gap-6 md:gap-8"
    >
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
        placeholder="Enter your Email"
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
      {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}
      <Button className="mt-2 h-auto text-wrap bg-black py-3.5 text-white md:text-base md:tracking-[0.07em]">
        {isPending ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
      </Button>
    </form>
  );
}

export default SignUpForm;
