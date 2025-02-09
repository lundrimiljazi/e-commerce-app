import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { searchProducts } from "../../lib/actions";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { query: string };
}): Promise<Metadata> {
  return {
    title: `Search: ${searchParams.query} | StyleHub`,
    description: `Search results for "${searchParams.query}" on StyleHub Fashion & Lifestyle`,
  };
}

async function SearchResults({ query }: { query: string }) {
  const { products, error } = await searchProducts(query);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No products found for "{query}"
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const query = searchParams.query || "";

  return (
    <div className="container p-4 flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Search Results for "{query}"
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
