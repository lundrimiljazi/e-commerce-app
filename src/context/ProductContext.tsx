"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

interface ProductContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  categories: string[];
  selectedCategory: string;
  setCategory: (category: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: () => void;
  itemsPerPage: number;
  filteredProducts: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loading: boolean;
  error: string | null;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => {},
  categories: [],
  selectedCategory: "All",
  setCategory: () => {},
  selectedProduct: null,
  setSelectedProduct: () => {},
  isLoading: false,
  currentPage: 1,
  setCurrentPage: () => {},
  totalPages: 1,
  setTotalPages: () => {},
  itemsPerPage: 9,
  filteredProducts: [],
  searchQuery: "",
  setSearchQuery: () => {},
  loading: false,
  error: null,
});

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const itemsPerPage = 9;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [searchQuery, setSearchQuery] = useState<string[]>(["All"]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);
        const products = await productsRes.json();
        const categories = await categoriesRes.json();
        setProducts(products);
        setCategories(["All", ...categories]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? [...products]
        : products.filter(
            (product) =>
              product.category.toLowerCase() === selectedCategory.toLowerCase()
          );

    setTotalPages(Math.ceil(filtered.length / itemsPerPage));

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedResults = filtered.slice(start, end);

    setFilteredProducts(paginatedResults);
  }, [products, selectedCategory, currentPage, itemsPerPage]);

  const handleSearch = (query: string) => {};

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        selectedProduct,
        setSelectedProduct,
        isLoading,
        selectedCategory,
        setCategory: (category: string) => {
          setSelectedCategory(category);
          setCurrentPage(1);
        },
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages: () => {},
        itemsPerPage,
        filteredProducts,
        searchQuery: "",
        setSearchQuery: () => {},
        loading,
        error,
        categories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProducts must be used within ProductProvider");
  return context;
};
