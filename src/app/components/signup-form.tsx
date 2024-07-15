import React from "react";
import { InputWithLabel } from "./input-with-label";
import { Button } from "./ui/button";

function SignUpForm() {
  return (
    <form className="mx-auto flex max-w-[456px] flex-col gap-6 md:gap-8">
      <InputWithLabel id="name" label="Name" type="text" placeholder="Enter your name" required />
      <InputWithLabel
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your Email"
        required
      />
      <InputWithLabel
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        required
      />
      <Button className="mt-2 h-auto text-wrap bg-black py-3.5 text-white md:text-base md:tracking-[0.07em]">
        CREATE ACCOUNT
      </Button>
    </form>
  );
}

export default SignUpForm;
