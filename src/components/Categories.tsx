"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Button } from "@/ui/button";
import useProductStore from "@/store/useProductStore";
import { X } from "lucide-react";
import CategorySkeleton from "./skeleton/CategorySkeleton";
import { fetcher } from "@/lib/fetcher";
import SortProducts from "@/components/SortProducts";
import dynamic from "next/dynamic";
import { getCategoryIcon } from "@/lib/categoryIcons";

const CategoryList: React.FC = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR("https://fakestoreapi.com/products/categories", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { setCategory, selectedCategory } = useProductStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategorySelect = (category: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete("page");

    if (
      category === selectedCategory ||
      category === "All" ||
      category === null
    ) {
      newSearchParams.delete("category");
      setCategory("All");
    } else {
      newSearchParams.delete("category");
      newSearchParams.set("category", category);
      setCategory(category);
    }

    const query = newSearchParams.toString();
    router.push(query ? `/?${query}` : "/", { scroll: false });
  };

  React.useEffect(() => {
    const categoryParam = searchParams.get("category");
    setCategory(categoryParam || "All");
  }, [searchParams, setCategory]);

  if (isLoading) {
    return <CategorySkeleton />;
  }

  if (error)
    return <div className="p-6 text-red-500">Failed to load categories</div>;

  return (
    <div className="h-full bg-white">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
        <p className="text-sm text-gray-500 mt-1">Browse by category</p>
      </div>
      <div className="p-4 space-y-2">
        {categories.map((category: string) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "secondary" : "ghost"}
            className={`w-full justify-start text-left font-medium ${
              selectedCategory === category
                ? "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => handleCategorySelect(category)}
          >
            <span className="flex items-center gap-3 flex-1">
              {getCategoryIcon(category)}
              {category}
            </span>
            {selectedCategory === category && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleCategorySelect("All");
                }}
                className="hover:bg-blue-200 rounded-full p-1"
              >
                <X className="h-4 w-4 " />
              </span>
            )}
          </Button>
        ))}
      </div>
      <div className="border-t mt-4 pt-4 pl-5">
        <h2 className="text-lg font-semibold text-gray-900">Sort Options</h2>
        <SortProducts />
      </div>
    </div>
  );
};

const Categories = dynamic(() => Promise.resolve(CategoryList), {
  loading: () => <p>Loading categories...</p>,
});

export default Categories;
