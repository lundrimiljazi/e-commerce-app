import ProductListClient from "./ProductListClient";
import { fetchAllProducts } from "@/lib/actions";

export default async function ProductList() {
  const { products, error } = await fetchAllProducts();

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return <ProductListClient initialProducts={products} />;
}
