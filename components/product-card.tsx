"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { formatPrice, getCollection } from "@/lib/data";

/** Card structure per design.md #5 -- no border/shadow, crossfade-only hover. */
export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const collection = getCollection(product.collection);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-elevated">
        {product.tag && (
          <span className="absolute left-3 top-3 z-10 bg-ivory px-2.5 py-1 text-[11px] uppercase tracking-[0.05em] text-bg">
            {product.tag === "new" ? "New" : "Trending"}
          </span>
        )}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-opacity duration-300"
          style={{ opacity: hovered ? 0 : 1 }}
        />
        <Image
          src={product.images[1]}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        />
      </div>
      <div className="pt-4 text-left">
        <div className="mb-1.5 text-xs uppercase tracking-[0.05em] text-ivory-muted">
          {collection?.name ?? product.category}
        </div>
        <h3 className="font-display mb-2 inline-block border-b border-transparent text-[1.05rem] transition-colors group-hover:border-ivory">
          {product.name}
        </h3>
        <div className="text-sm">{formatPrice(product.price)}</div>
      </div>
    </Link>
  );
}
