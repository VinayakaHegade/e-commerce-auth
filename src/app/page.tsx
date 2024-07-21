"use client";

import React, { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import Pagination from "./components/pagination";
import { AuthProvider } from "./components/auth-provider";
import { ProtectedRoute } from "./components/protected-route";
import { Checkbox } from "./components/ui/checkbox";
import { Label } from "./components/ui/lable";
import { useRouter } from "next/navigation";
import { Button } from "./components/ui/button";
import LoadingSpinner from "./components/loading-spinner";
import { toast } from "./components/ui/use-toast";
import { ToastAction } from "./components/ui/toast";

const CategoriesPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(new Set());

  const { data: categoriesData, isPending } = api.category.getCategories.useQuery({ page });
  const updateUserCategories = api.category.updateUserCategories.useMutation();

  const { mutate, isPending: isLoggingOut } = api.auth.logoutUser.useMutation({
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
        action: (
          <ToastAction altText="Try again" onClick={handleLogout}>
            Try again
          </ToastAction>
        ),
      });
    },
  });

  useEffect(() => {
    if (categoriesData?.data.userCategories) {
      setSelectedCategories(new Set(categoriesData.data.userCategories));
    }
  }, [categoriesData?.data.userCategories]);

  const handleCategoryToggle = (categoryId: number) => {
    const newSelectedCategories = new Set(selectedCategories);
    if (newSelectedCategories.has(categoryId)) {
      newSelectedCategories.delete(categoryId);
    } else {
      newSelectedCategories.add(categoryId);
    }
    setSelectedCategories(newSelectedCategories);
    updateUserCategories.mutate({ categoryIds: Array.from(newSelectedCategories) });
  };

  const handleLogout = () => {
    mutate();
  };

  if (isPending) return <LoadingSpinner />;

  return (
    <>
      <Button
        onClick={handleLogout}
        className="my-4 ml-auto flex justify-end"
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "LOGGING OUT" : "LOGOUT"}
      </Button>
      <section className="mx-auto my-10 max-w-xl rounded-[20px] border border-gray-350 px-6 pb-12 pt-8 md:px-[60px] md:pb-[72px] md:pt-10">
        <h2 className="mb-[23px] text-center text-2xl font-semibold md:text-[32px]/[39px]">
          Please mark your interests!
        </h2>
        <p className="mb-[37px] text-center leading-[26px]">We will keep you notified.</p>
        <h3 className="mb-[27px] text-xl/[26px] font-medium">My saved interests!</h3>
        <div className="mb-[66px] flex flex-col gap-[23px]">
          {categoriesData?.data.categories.map((category) => (
            <div className="flex items-center gap-3" key={category.id}>
              <Checkbox
                id={`${category.id}`}
                checked={selectedCategories.has(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
                className="h-6 w-6 border-none  bg-gray-370 data-[state=checked]:border-2 data-[state=checked]:border-white"
              />
              <Label htmlFor={`${category.id}`} className="text-base/[26px] font-normal">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPages={categoriesData?.data.totalPages ?? 1}
          onPageChange={setPage}
        />
      </section>
    </>
  );
};

export default function Home() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <CategoriesPage />
      </ProtectedRoute>
    </AuthProvider>
  );
}
