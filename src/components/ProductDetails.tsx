"use client";

import Image from "next/image";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Card, CardContent } from "@/ui/card";
import { Separator } from "@/ui/separator";
import {
  ShoppingCart,
  Truck,
  Shield,
  Star,
  Check,
  CreditCard,
} from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { Product } from "@/types/productType";
import { useState } from "react";

const COLORS = [
  {
    name: "White",
    value: "#FFFFFF",
    class: "bg-white border-2 border-gray-200",
  },
  { name: "Black", value: "#000000", class: "bg-black" },
  { name: "Navy", value: "#000080", class: "bg-blue-900" },
];

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCartStore();
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      price: product.price,
      title: product.title,
      category: product.category,
      description: product.description,
      image: product.image,
      rating: {
        rate: 0,
        count: 0,
      },
    });
  };

  return (
    <div className="flex-grow bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-8 bg-white">
                <div className="group relative aspect-square bg-white rounded-xl overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                    >
                      {product.category}
                    </Badge>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {product.title}
                  </h1>
                  <div className="h-1 w-20 bg-blue-600 my-4" />
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Color Selection */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <div className="flex items-center space-x-3">
                    {COLORS.map((color) => (
                      <button
                        key={color.name}
                        className={`
                          relative w-8 h-8 rounded-full flex items-center justify-center
                          ${color.class}
                          ${
                            selectedColor.name === color.name
                              ? "ring-2 ring-offset-2 ring-blue-600"
                              : "hover:ring-2 hover:ring-offset-2 hover:ring-gray-300"
                          }
                        `}
                        onClick={() => setSelectedColor(color)}
                        title={color.name}
                      >
                        {selectedColor.name === color.name && (
                          <Check
                            className={`w-4 h-4 ${
                              color.name === "White"
                                ? "text-black"
                                : "text-white"
                            }`}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span>2 Year Warranty</span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50 space-y-6">
                <div className="space-y-2">
                  <p className="text-gray-500">Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500">USD</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>

                  <Button variant="outline" size="lg" className="w-full">
                    Buy Now
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="h-4 w-4" />
                    Free shipping worldwide
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CreditCard className="h4- w-4 text-black" />
                    Secure payment
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
