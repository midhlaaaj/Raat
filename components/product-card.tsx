"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";
import { formatPrice, getCollection } from "@/lib/data";
import { WishlistButton } from "@/components/wishlist-button";

/**
 * Clean catalogue card: borderless image, second shot on hover, heart in the corner,
 * then collection / name / price. Sized for 5-up grids.
 */
export function ProductCard({ product }: { product: Product }) {
  const collection = getCollection(product.collection);

  return (
    <Link href={`/product/${product.slug}`} className="group flex h-full flex-col">
      <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-md bg-bg-elevated">
        {product.tag && (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink">
            {product.tag === "new" ? "New" : "Trending"}
          </span>
        )}
        <WishlistButton
          productId={product.id}
          productName={product.name}
          className="absolute right-2.5 top-2.5 z-10"
        />
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
        />
        <Image
          src={product.images[1]}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        />
      </div>
      <span className="mb-1 text-[11px] uppercase tracking-[0.14em] text-ivory-muted">
        {collection?.name ?? product.category}
      </span>
      <h3 className="mb-1 line-clamp-1 text-[0.95rem] font-medium">{product.name}</h3>
      <span className="text-sm text-ink">{formatPrice(product.price)}</span>
    </Link>
  );
}
