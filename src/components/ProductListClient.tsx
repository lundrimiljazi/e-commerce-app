"use client";

import React, { useMemo, useCallback, useEffect } from "react";
import useProductStore from "@/store/useProductStore";
import ProductCard from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/productType";

export const ProductListClient = ({
  initialProducts,
}: {
  initialProducts: Product[];
}) => {
  const {
    selectedCategory,
    currentPage,
    itemsPerPage,
    selectedSort,
    setCurrentPage,
    setCategory,
  } = useProductStore();
  const searchParams = useSearchParams();

  const sortProducts = useCallback(
    (products: any[]) => {
      if (!selectedSort || selectedSort === "default") return products;

      return [...products].sort((a, b) => {
        switch (selectedSort) {
          case "price_asc":
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          case "rating_asc":
            return a.rating.rate - b.rating.rate;
          case "rating_desc":
            return b.rating.rate - a.rating.rate;
          default:
            return 0;
        }
      });
    },
    [selectedSort]
  );

  useEffect(() => {
    const page = searchParams.get("page");
    const category = searchParams.get("category");

    if (category) {
      if (category !== useProductStore.getState().selectedCategory) {
        setCategory(category);
      }
    }

    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [searchParams, setCurrentPage, setCategory]);

  const filteredProducts = useMemo(() => {
    let filtered = initialProducts;

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(
        (product: any) => product.category === selectedCategory
      );
    }

    return sortProducts(filtered);
  }, [initialProducts, selectedCategory, sortProducts]);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(start, end);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
          onPageChange={(page) => {
            useProductStore.getState().setCurrentPage(page);
          }}
          className="pt-4"
        />
      </div>
    </div>
  );
};

export default ProductListClient;
