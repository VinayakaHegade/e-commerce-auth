"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { api } from "~/trpc/react";

const AuthContext = createContext<{ user: string | null; isLoading: boolean }>({
  user: null,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data, isLoading: userLoading } = api.user.getUser.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const name = data?.data.name;

  useEffect(() => {
    if (!userLoading) {
      setUser(name ?? null);
      setIsLoading(false);
    }
  }, [name, userLoading]);

  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>;
}
