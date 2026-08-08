import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/data";
import { ProductClient } from "./product-client";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return <ProductClient product={product} />;
}
