"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Plus, Star } from "lucide-react";
import { COLOR_HEX, formatPrice, getCollection, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { WishlistButton } from "@/components/wishlist-button";

/* Design-lab product card options. Each takes one product; all are sized for a 5-up grid. */

function Swatches({ product, size = 12 }: { product: Product; size?: number }) {
  return (
    <div className="flex gap-1.5">
      {product.colors.map((c) => (
        <span
          key={c}
          title={c}
          className="rounded-full ring-1 ring-black/10"
          style={{ width: size, height: size, background: COLOR_HEX[c] ?? "#ccc" }}
        />
      ))}
    </div>
  );
}

/** Deterministic fake rating so the demo is stable between renders. */
function rating(product: Product) {
  const n = product.name.length;
  return { stars: 4 + (n % 10) / 10, count: 12 + ((n * 7) % 90) };
}

/** A — Minimal: borderless image, heart, three lines of text. (Now the site default.) */
export function CardMinimal({ product }: { product: Product }) {
  const collection = getCollection(product.collection);
  return (
    <Link href={`/product/${product.slug}`} className="group flex flex-col">
      <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-md bg-bg-elevated">
        <WishlistButton productId={product.id} productName={product.name} className="absolute right-2.5 top-2.5 z-10" />
        <Image src={product.images[0]} alt={product.name} fill sizes="20vw" className="object-cover transition-opacity duration-500 group-hover:opacity-0" />
        <Image src={product.images[1]} alt="" fill sizes="20vw" className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <span className="mb-1 text-[11px] uppercase tracking-[0.14em] text-ivory-muted">{collection?.name}</span>
      <h3 className="mb-1 line-clamp-1 text-[0.95rem] font-medium">{product.name}</h3>
      <span className="text-sm">{formatPrice(product.price)}</span>
    </Link>
  );
}

/** B — Quick add: sizes slide up over the image on hover; one tap adds to cart. */
export function CardQuickAdd({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState<string | null>(null);
  return (
    <div className="group flex flex-col">
      <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-md bg-bg-elevated">
        <Link href={`/product/${product.slug}`} aria-label={product.name} className="absolute inset-0">
          <Image src={product.images[0]} alt={product.name} fill sizes="20vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        </Link>
        <WishlistButton productId={product.id} productName={product.name} className="absolute right-2.5 top-2.5 z-10" />
        <div className="absolute inset-x-2 bottom-2 z-10 translate-y-[calc(100%+8px)] rounded-md bg-white/95 p-2.5 backdrop-blur transition-transform duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0">
          <div className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wider text-ivory-muted">
            {added ? `Added size ${added}` : "Quick add"}
          </div>
          <div className="grid grid-cols-5 gap-1">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => {
                  addItem(product.id, s, product.colors[0]);
                  setAdded(s);
                  setTimeout(() => setAdded(null), 1500);
                }}
                className="rounded border border-hairline-strong py-1.5 text-xs transition-colors hover:border-ink hover:bg-ink hover:text-bg"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
      <h3 className="mb-1 line-clamp-1 text-[0.95rem] font-medium">{product.name}</h3>
      <span className="text-sm text-ivory-muted">{formatPrice(product.price)}</span>
    </div>
  );
}

/** C — Soft panel: product on a tinted card, centred text with colour dots. */
export function CardPanel({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group flex flex-col rounded-xl bg-bg-elevated p-3 transition-colors hover:bg-surface">
      <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-lg bg-bg">
        {product.tag && (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            {product.tag}
          </span>
        )}
        <WishlistButton productId={product.id} productName={product.name} className="absolute right-2.5 top-2.5 z-10" />
        <Image src={product.images[0]} alt={product.name} fill sizes="20vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-col items-center gap-1.5 pb-2 text-center">
        <h3 className="font-display line-clamp-1 text-lg">{product.name}</h3>
        <span className="text-sm text-gold-deep">{formatPrice(product.price)}</span>
        <Swatches product={product} />
      </div>
    </Link>
  );
}

/** D — Floating label: a white info tab overlaps the bottom of the photo. */
export function CardFloating({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group relative block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-bg-elevated">
        <Image src={product.images[0]} alt={product.name} fill sizes="20vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <WishlistButton productId={product.id} productName={product.name} className="absolute right-2.5 top-2.5 z-10" />
      </div>
      <div className="relative -mt-12 mx-3 rounded-lg bg-bg p-3.5 shadow-[0_8px_24px_rgba(40,36,33,0.08)] transition-transform duration-300 group-hover:-translate-y-1">
        <h3 className="mb-1 line-clamp-1 text-[0.95rem] font-medium">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm">{formatPrice(product.price)}</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-bg">
            <Plus size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** E — Detailed: rating, swatches and price on one row, for shoppers who compare. */
export function CardDetailed({ product }: { product: Product }) {
  const r = rating(product);
  return (
    <Link href={`/product/${product.slug}`} className="group flex flex-col rounded-lg border border-hairline p-2.5 transition-colors hover:border-ink">
      <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded bg-bg-elevated">
        {product.tag === "new" && (
          <span className="absolute left-2 top-2 z-10 rounded bg-ink px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-bg">New</span>
        )}
        <WishlistButton productId={product.id} productName={product.name} className="absolute right-2 top-2 z-10 !h-8 !w-8" />
        <Image src={product.images[0]} alt={product.name} fill sizes="20vw" className="object-cover" />
      </div>
      <div className="flex items-center gap-1 text-xs text-ivory-muted">
        <Star size={12} className="fill-gold text-gold" />
        <span className="font-medium text-ink">{r.stars.toFixed(1)}</span>({r.count})
      </div>
      <h3 className="my-1 line-clamp-1 text-[0.95rem] font-medium">{product.name}</h3>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
        <Swatches product={product} size={11} />
      </div>
      <div className="mt-2 text-xs text-[#36633a]">Free delivery · Ships in 3 days</div>
    </Link>
  );
}

/** F — Editorial: tall crop, serif name, arrow link; no badges or chrome. */
export function CardEditorial({ product }: { product: Product }) {
  const collection = getCollection(product.collection);
  return (
    <Link href={`/product/${product.slug}`} className="group flex flex-col">
      <div className="relative mb-4 aspect-[2/3] overflow-hidden bg-bg-elevated">
        <Image src={product.images[1]} alt={product.name} fill sizes="20vw" className="object-cover grayscale-[15%] transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0" />
        <WishlistButton productId={product.id} productName={product.name} className="absolute bottom-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100" />
      </div>
      <span className="eyebrow mb-1.5 !text-[0.65rem]">{collection?.name}</span>
      <h3 className="font-display mb-2 text-xl leading-tight">{product.name}</h3>
      <div className="flex items-center justify-between border-t border-hairline pt-2 text-sm">
        <span>{formatPrice(product.price)}</span>
        <ArrowUpRight size={16} className="text-ivory-muted transition-colors group-hover:text-ink" />
      </div>
    </Link>
  );
}

export const CARD_VARIANTS = [
  { id: "A", name: "Minimal", note: "Borderless, image-led. Second photo on hover. Currently live on the site.", Card: CardMinimal },
  { id: "B", name: "Quick add", note: "Sizes slide up on hover so shoppers add to cart without opening the product.", Card: CardQuickAdd },
  { id: "C", name: "Soft panel", note: "Tinted card with centred serif name and colour dots. Feels boutique.", Card: CardPanel },
  { id: "D", name: "Floating label", note: "Info tab overlaps the photo; strong visual rhythm in a grid.", Card: CardFloating },
  { id: "E", name: "Detailed", note: "Rating, swatches and delivery promise. Best for conversion on a big catalogue.", Card: CardDetailed },
  { id: "F", name: "Editorial", note: "Tall crop and serif type, no badges. Most premium, least information.", Card: CardEditorial },
] as const;
