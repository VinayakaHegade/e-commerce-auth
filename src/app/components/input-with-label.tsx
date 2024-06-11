"use client";

import { Label } from "@radix-ui/react-label";
import Input from "./ui/input";
import { type InputHTMLAttributes } from "react";

type InputWithLabelProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  placeholder: string;
};

export function InputWithLabel({
  id,
  label,
  type,
  placeholder,
  ...props
}: InputWithLabelProps) {
  return (
    <div className="grid w-full items-center gap-[7px]">
      <Label htmlFor={id} className="text-sm md:text-base">
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        {...props}
        className="text-sm md:h-12 md:text-base"
      />
    </div>
  );
}
