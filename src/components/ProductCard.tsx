"use client";
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import type { Product } from "@/types/productType";

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
  const { addToCart } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  const isVisible =
    searchQuery === "" ||
    title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.toLowerCase().includes(searchQuery.toLowerCase());

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart({
      id,
      price,
      title,
      image,
      category,
      description,
      rating,
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  if (!isVisible) return null;

  const slug = encodeURIComponent(
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  );

  return (
    <Link href={`/products/${slug}?id=${id}`}>
      <div
        data-testid="product-card"
        className="h-full overflow-hidden bg-white shadow-md transition-shadow duration-300 hover:shadow-lg rounded-lg border border-gray-200 flex flex-col"
      >
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden bg-white">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-contain p-6"
              priority
              fill
            />
            <Badge
              variant="secondary"
              className="absolute top-4 left-4 bg-black/80 text-white"
            >
              {category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 flex-grow">
          <div className="space-y-2 h-full flex flex-col">
            <h3 className="font-medium text-base line-clamp-2 text-gray-800 flex-grow">
              {title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                ${price.toFixed(2)}
              </span>
              {rating.rate > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{rating.rate}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            data-testid="add-to-cart"
            onClick={handleAddToCart}
            disabled={isAdding}
            variant="outline"
            className="w-full bg-white hover:bg-gray-50 border-gray-200 text-gray-900"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </CardFooter>
      </div>
    </Link>
  );
};

export default ProductCard;
