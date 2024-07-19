"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "../components/ui/use-toast";

function LoginPage() {
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
    <div>
      <h1>Login</h1>
    </div>
  );
}

export default LoginPage;
