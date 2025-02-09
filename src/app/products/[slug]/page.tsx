import ProductDetails from "@/components/ProductDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/actions";

type Props = {
  params: { slug: string };
  searchParams: { id: string };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const product = await getProduct(searchParams.id);

  return {
    title: `${product.title} | StyleHub`,
    description: product.description,
  };
}

export default async function ProductPage({ params, searchParams }: Props) {
  if (!searchParams.id) notFound();

  const product = await getProduct(searchParams.id);

  if (!product) notFound();

  return <ProductDetails product={product} />;
}
