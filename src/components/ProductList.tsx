"use client";

import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { filteredProducts, products } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "none" | "price-asc" | "price-desc" | "rating"
  >("none");

  let displayedProducts = [...filteredProducts]
    .filter(
      (product) =>
        searchQuery === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating.rate - a.rating.rate;
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-2/3 text-gray-700"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="p-2 border rounded-md text-gray-500"
        >
          <option value="none" disabled>
            Sort by...
          </option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <p className="mb-4 text-gray-600">
        Showing {displayedProducts.length} of {filteredProducts.length} products
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            rating={product.rating}
            category={product.category}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
