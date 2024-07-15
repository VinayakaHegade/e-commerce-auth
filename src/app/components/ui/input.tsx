import { type InputHTMLAttributes } from "react";
import { cn } from "~/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-input px-4 py-3.5 text-base ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export default Input;
