"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "../components/ui/use-toast";
import LoginForm from "../components/login-form";
import Link from "next/link";
import LoadingSpinner from "../components/loading-spinner";

function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      toast({
        title: "Email verified successfully",
        description: "You can now log in to your account.",
        className: "bg-green-500 text-white",
      });
    }
  }, [searchParams]);

  return (
    <section className="mx-auto my-10 max-w-xl rounded-[20px] border border-gray-350 px-6 pb-12 pt-8 md:px-[60px] md:pb-[51px] md:pt-10">
      <h2 className="mb-8 text-center text-2xl font-semibold md:mb-9 md:text-[32px]/[39px]">
        Login
      </h2>
      <h3 className="mb-[13px] text-center font-medium md:text-2xl/[29px]">
        Welcome back to ECOMMERCE
      </h3>
      <p className="mb-[31px] text-center">The next gen business marketplace</p>
      <LoginForm />
      <div className="my-[30px] h-[1px] bg-gray-350" />
      <p className="flex flex-wrap justify-center gap-[11px] text-center text-sm text-carbon md:text-base">
        Don&apos;t have an Account?
        <Link
          href="/signup"
          className="font-medium leading-6 tracking-[0.07em] text-black hover:font-semibold"
        >
          SIGN UP
        </Link>
      </p>
    </section>
  );
}

export default LoginPage;
