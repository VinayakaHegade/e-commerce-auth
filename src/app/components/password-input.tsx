import { forwardRef, type InputHTMLAttributes, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        id="password"
        placeholder="Enter your password"
        type={showPassword ? "text" : "password"}
        {...props}
        ref={ref}
        className="hide-password-toggle pr-14 text-sm md:h-12 md:text-base"
      />
      <Button
        type="button"
        variant="ghost"
        className="absolute right-0 top-0 h-full p-3.5 font-normal underline underline-offset-2 hover:bg-transparent md:text-base"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? "Hide" : "Show"}
        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
      </Button>

      {/* hides browsers password toggles */}
      <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
