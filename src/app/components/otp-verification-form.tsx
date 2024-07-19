import { type FormEvent, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { Button } from "./ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { Label } from "./ui/lable";
import { cn } from "~/lib/utils";

interface OtpVerificationFormProps {
  email: string;
}

function OtpVerificationForm({ email }: OtpVerificationFormProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { mutate: verifyEmail, isPending: isVerifying } = api.auth.verifyEmail.useMutation({
    onSuccess: () => {
      router.push("/login?verified=true");
    },
    onError: (error) => {
      setError(error.message || "Verification failed. Please try again.");
    },
  });

  const { mutate: resendCode, isPending: isResending } =
    api.auth.resendVerificationCode.useMutation({
      onSuccess: () => {
        setError(null);
        setOtp("");
        toast({
          title: "Code resent successfully",
          description: "Please check your email for the new verification code.",
          className: "bg-green-500 text-white",
        });
      },
      onError: (error) => {
        setError(error.message || "Failed to resend code. Please try again.");
      },
    });

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (otp.length === 8) {
      verifyEmail({ email, code: otp });
    } else {
      setError("Please enter a valid 8-digit OTP.");
    }
  };

  const handleResend = () => {
    setError(null);
    resendCode({ email });
  };

  return (
    <form onSubmit={handleVerify} className="space-y-6">
      <div>
        <Label htmlFor="otp" className="text-base font-normal">
          Code
        </Label>
        <InputOTP
          id="otp"
          value={otp}
          onChange={setOtp}
          maxLength={8}
          containerClassName="gap-3 mt-[7px] mb-4 flex-wrap"
          pattern={REGEXP_ONLY_DIGITS}
        >
          {[...Array(8)].map((_, index) => (
            <InputOTPGroup key={index}>
              <InputOTPSlot index={index} className="text-base md:h-12 md:w-[46px]" />
            </InputOTPGroup>
          ))}
        </InputOTP>
      </div>

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      <Button
        type="submit"
        className="min-h-14 w-full bg-black p-[18px] text-white md:text-base md:tracking-[0.07em]"
        disabled={isVerifying || otp.length !== 8}
      >
        {isVerifying ? "VERIFYING..." : "VERIFY"}
      </Button>

      <p className="text-center text-sm">
        Didn&apos;t receive code?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className={cn(
            "text-blue-600 transition-opacity duration-300 hover:underline focus:outline-none",
            isResending && "cursor-not-allowed opacity-50"
          )}
        >
          {isResending ? "Resending..." : "Resend"}
        </button>
      </p>
    </form>
  );
}

export default OtpVerificationForm;
