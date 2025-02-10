import ProductDetails from "@/components/ProductDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/actions";
import { use } from "react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${(await params).slug} | StyleHub`,
    description: (await params).slug,
  };
}

export default async function ProductPage({ searchParams }: Props) {
  const { id } = await searchParams;
  if (!id) notFound();

  const product = await getProduct(id);

  if (!product) notFound();

  return <ProductDetails product={product} />;
}
