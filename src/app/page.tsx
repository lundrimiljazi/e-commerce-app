"use client";

import { useProducts } from "@/context/ProductContext";
import Pagination from "@/components/Pagination";
import Categories from "@/components/Categories";
import ProductList from "@/components/ProductList";

export default function Home() {
  const {
    products,
    categories,
    selectedCategory,
    setCategory,
    isLoading,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useProducts();

  return (
    <>
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setCategory}
          />
          <ProductList />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </>
  );
}
