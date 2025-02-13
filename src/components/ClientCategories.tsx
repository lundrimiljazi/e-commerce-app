"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import useProductStore from "@/store/useProductStore";
import { X } from "lucide-react";
import SortProducts from "@/components/SortProducts";
import { getCategoryIcon } from "@/lib/categoryIcons";

const ClientCategories: React.FC<{ categories: string[] }> = ({
  categories,
}) => {
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

  return (
    <>
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
    </>
  );
};

export default ClientCategories;
