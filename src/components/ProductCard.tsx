"use client";

import React, { useState } from "react";
import { Product, useProducts } from "../context/ProductContext";
import { useCart } from "@/context/CartContext";
import ProductDetail from "./ProductDetail";
import toast from "react-hot-toast";

type ProductCardProps = Product & {
  searchQuery?: string;
  rating?: {
    rate: number;
    count: number;
  };
};

const ProductCard = ({
  id,
  title,
  price,
  image,
  category,
  description,
  searchQuery = "",
  rating = { rate: 0, count: 0 },
}: ProductCardProps) => {
  const { setSelectedProduct } = useProducts();
  const { addToCart } = useCart();
  const [showDetail, setShowDetail] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const isVisible =
    searchQuery === "" ||
    title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.toLowerCase().includes(searchQuery.toLowerCase());

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart({
      id,
      title,
      price,
      image,
      description,
      category,
      rating: {
        rate: 0,
        count: 0,
      },
    });
    toast.success("Item added to cart!");

    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => {
          setSelectedProduct({
            id,
            title,
            price,
            image,
            description,
            category,
            rating,
          });
          setShowDetail(true);
        }}
      >
        <div className="relative aspect-square mb-4">
          <img
            src={image}
            alt={title}
            className="object-contain w-full h-full"
          />
        </div>
        <h3 className="font-semibold mb-3 truncate text-gray-400">{title}</h3>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold text-gray-400">${price}</span>
            {rating && (
              <div className="text-sm text-gray-500">
                ⭐ {rating.rate} ({rating.count} reviews)
              </div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`relative overflow-hidden px-4 py-2 rounded transition-all duration-300 ${
              isAdding
                ? "bg-green-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <span
              className={`flex items-center justify-center gap-2 transition-all duration-300 ${
                isAdding ? "opacity-0" : "opacity-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              Add to Cart
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                isAdding ? "opacity-100" : "opacity-0"
              }`}
            >
              <svg
                className="w-5 h-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
      {showDetail && (
        <div className="fixed inset-0 z-50">
          <ProductDetail onClose={() => setShowDetail(false)} />
        </div>
      )}
    </>
  );
};

export default ProductCard;
