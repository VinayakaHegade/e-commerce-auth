import { type InputHTMLAttributes } from "react";
import { cn } from "~/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-4 py-3.5 text-base file:border-0 file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export default Input;
