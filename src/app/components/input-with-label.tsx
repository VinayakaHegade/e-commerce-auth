"use client";

import { Label } from "@radix-ui/react-label";
import { forwardRef, type InputHTMLAttributes } from "react";
import { Input } from "./ui/input";

type InputWithLabelProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ id, label, error, ...props }, ref) => {
    return (
      <div className="grid w-full items-center gap-[7px]">
        <Label htmlFor={id} className="text-sm md:text-base">
          {label}
        </Label>
        <Input ref={ref} {...props} className="text-sm md:h-12 md:text-base" />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";
