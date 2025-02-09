import React, { useMemo, useCallback } from "react";
import { useProducts } from "@/store/useProductStore";
import useProductStore from "@/store/useProductStore";
import ProductCard from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import ProductSkeleton from "./skeleton/ProductSkeleton";

export const ProductList = () => {
  const { selectedCategory, currentPage, itemsPerPage, selectedSort } =
    useProductStore();
  const { data: products, error, isLoading } = useProducts(selectedCategory);

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

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let filtered = products;

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(
        (product: any) => product.category === selectedCategory
      );
    }

    return sortProducts(filtered);
  }, [products, selectedCategory, sortProducts]);

  if (isLoading)
    return (
      <div>
        <ProductSkeleton />
      </div>
    );
  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>Error loading products. Please try again later.</p>
        <p>{error.message}</p>
      </div>
    );
  }
  if (!products) return null;

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(start, end);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl">
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
