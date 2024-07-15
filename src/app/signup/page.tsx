import React from "react";
import SignUpForm from "../components/signup-form";
import Link from "next/link";

function SignUpPage() {
  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-[576px] rounded-[20px] border border-solid border-gray-350 px-6 pb-12 pt-8 md:px-[60px] md:pb-[131px] md:pt-10">
        <h2 className="mb-6 text-center text-2xl font-semibold md:mb-8 md:text-[32px]">
          Create your account
        </h2>
        <SignUpForm />
        <p className="mt-12 flex flex-wrap justify-center gap-[11px] text-center text-sm text-carbon md:text-base">
          Have an Account?
          <Link
            href="/signin"
            className="font-medium leading-6 tracking-[0.07em] text-black hover:font-semibold"
          >
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
