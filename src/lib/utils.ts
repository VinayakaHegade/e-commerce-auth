import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maskEmail(email: string | null): string {
  if (!email) {
    return "No email provided";
  }

  const parts = email.split("@");

  if (parts.length !== 2) {
    return "Invalid email format";
  }

  const localPart = parts[0];
  const domain = parts[1];

  if (!localPart || !domain) {
    return "Invalid email format";
  }

  const maskedLocalPart = localPart.slice(0, 3) + "*".repeat(Math.max(0, localPart.length - 3));
  const maskedEmail = `${maskedLocalPart}@${domain}`;

  return maskedEmail;
}
