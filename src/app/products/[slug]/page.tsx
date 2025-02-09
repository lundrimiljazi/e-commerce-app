import ProductDetails from "@/components/ProductDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/actions";
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { id: string };
}): Promise<Metadata> {
  const product = await getProduct(searchParams.id);

  return {
    title: `${product.title} | StyleHub`,
    description: product.description,
  };
}

export default async function ProductPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  if (!searchParams.id) notFound();

  const product = await getProduct(searchParams.id);

  if (!product) notFound();

  return <ProductDetails product={product} />;
}
