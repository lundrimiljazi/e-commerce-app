"use client";

import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
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
import { cn } from "@/lib/utils";
import { ShoppingCart, Star } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { Product } from "@/types/productType";

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
  const [imageLoaded, setImageLoaded] = useState(false);

  const isVisible =
    searchQuery === "" ||
    title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.toLowerCase().includes(searchQuery.toLowerCase());

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
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
    toast.success("Added to cart");
    setTimeout(() => setIsAdding(false), 500);
  };

  if (!isVisible) return null;

  const slug = encodeURIComponent(
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  );

  return (
    <Link href={`/products/${slug}?id=${id}`}>
      <Card className="group h-full overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 relative border-0 rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden bg-white">
            <div
              className={cn(
                "absolute inset-0 bg-gray-100 animate-pulse",
                imageLoaded ? "hidden" : "block"
              )}
            />
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              className={cn(
                "w-full h-full object-contain p-6 transition-all duration-500 group-hover:scale-110",
                !imageLoaded && "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
              priority
              fill
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge
                variant="secondary"
                className="bg-black/80 text-white hover:bg-black/70"
              >
                {category}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-base line-clamp-2 text-gray-800 group-hover:text-gray-900 transition-colors">
                {title}
              </h3>
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-gray-900">
                  ${price.toFixed(2)}
                </span>
                {rating.rate > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{rating.rate}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            variant="outline"
            className="w-full bg-white hover:bg-gray-50 border-gray-200 text-gray-900 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
