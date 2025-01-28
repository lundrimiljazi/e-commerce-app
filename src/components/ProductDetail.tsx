import React from "react";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

interface ProductDetailProps {
  onClose: () => void;
}

const ProductDetail = ({ onClose }: ProductDetailProps) => {
  const { selectedProduct } = useProducts();
  const { addToCart } = useCart();

  if (!selectedProduct) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-auto object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col h-full">
            <div className="space-y-6 flex-grow">
              <h2 className="text-3xl font-bold mb-2 text-gray-800 leading-tight">
                {selectedProduct.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {selectedProduct.description}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-blue-600">
                  ${selectedProduct.price}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                addToCart(selectedProduct);
                toast.success("Item added to cart!");
                onClose();
              }}
              className="w-full mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 
                         transition-all duration-300 transform hover:scale-105 hover:shadow-lg 
                         flex items-center justify-center gap-2 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 group-hover:animate-bounce"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
