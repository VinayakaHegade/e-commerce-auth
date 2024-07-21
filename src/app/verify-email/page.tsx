"use client";

import { useSearchParams } from "next/navigation";
import { maskEmail } from "~/lib/utils";
import OtpVerificationForm from "../components/otp-verification-form";
import { Suspense } from "react";
import LoadingSpinner from "../components/loading-spinner";

function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyEmailPageContent />
    </Suspense>
  );
}

function VerifyEmailPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const maskedEmail = maskEmail(email);

  if (!email) {
    return <h2>Invalid request. Please go back to the signup page.</h2>;
  }

  return (
    <section className="mx-auto my-10 max-w-xl rounded-[20px] border border-solid border-gray-350 px-6 py-8 md:px-[60px] md:pb-[60px] md:pt-10 ">
      <h2 className="text-center text-[32px] font-semibold">Verify your email</h2>
      <p className="mb-[46px] mt-8 max-w-sm text-center">
        Enter the 8 digit code you have received on {maskedEmail}
      </p>
      <OtpVerificationForm email={email} />
    </section>
  );
}

export default VerifyEmailPage;
