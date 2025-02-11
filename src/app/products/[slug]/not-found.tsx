import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Package, Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Product Not Found",
  description: "The product you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center  bg-gradient-to-b from-gray-50 to-white px-4 mt-20">
      <div className="text-center space-y-6 max-w-2xl mb-20">
        <div className="relative">
          <Package className="mx-auto h-24 w-24 text-gray-300" />
          <Search className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-indigo-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Oops! Product Not Found
        </h1>
        <p className="text-xl text-gray-600">
          We couldn't locate the product you're looking for. It might have been
          moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            variant="default"
            size="lg"
            className="group text-black"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Back to Products
            </Link>
          </Button>
        </div>
        <div className="pt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Why not try:
          </h2>
          <ul className="text-left text-gray-600 space-y-2 mx-auto max-w-md">
            <li className="flex items-center">
              <span className="mr-2 text-indigo-500">•</span> Double-checking
              the product URL
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-indigo-500">•</span> Using the search
              bar to find similar products
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-indigo-500">•</span> Browsing our
              featured categories
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
