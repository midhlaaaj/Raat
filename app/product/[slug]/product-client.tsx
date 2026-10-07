"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/data";
import { formatPrice, getCollection, getRelatedProducts } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/product-card";
import { WishlistButton } from "@/components/wishlist-button";
import { PRODUCT_GRID } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { recordView } from "@/lib/recently-viewed";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/reveal";
import { Truck, RotateCcw, Sparkles } from "lucide-react";

export function ProductClient({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[2] ?? product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const addBtnRef = useRef<HTMLButtonElement>(null);
  const { addItem } = useCart();
  const collection = getCollection(product.collection);
  const related = getRelatedProducts(product, 10);

  useEffect(() => {
    recordView(product.id);
  }, [product.id]);

  useEffect(() => {
    function onScroll() {
      const el = addBtnRef.current;
      if (!el) return;
      setStickyVisible(el.getBoundingClientRect().bottom < 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleAdd() {
    addItem(product.id, size, color, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <main className="pb-28">
      <div className="mx-auto max-w-[1440px] px-6 pb-2 pt-8 text-sm text-ivory-muted md:px-10 md:pt-10">
        <Link href="/" className="hover:text-ivory">Home</Link> /{" "}
        <Link href={`/collections/${product.collection}`} className="hover:text-ivory">
          {collection?.name}
        </Link>{" "}
        / <span className="text-ivory">{product.name}</span>
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 pb-24 md:grid-cols-[1.3fr_1fr] md:gap-20 md:px-10">
        {/* Gallery -- lead image full width, the rest in a two-up grid */}
        <div className="grid grid-cols-2 gap-3">
          {product.images.map((src, i) => (
            <Reveal
              key={i}
              className={
                // lead image, plus an unpaired last image, span both columns
                i === 0 || (i === product.images.length - 1 && i % 2 === 1) ? "col-span-2" : ""
              }
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-bg-elevated">
                <Image
                  src={src}
                  alt={`${product.name} — view ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Info panel */}
        <div className="md:sticky md:top-28 md:self-start">
          <div className="eyebrow mb-3">{collection?.name}</div>
          <h1 className="font-display mb-3 text-3xl">{product.name}</h1>
          <div className="mb-8 border-b border-hairline pb-8 text-xl font-semibold text-gold-deep">{formatPrice(product.price)}</div>

          <div className="mb-6">
            <div className="label-ui mb-3 text-ivory-muted">Color — {color}</div>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  aria-pressed={color === c}
                  className={`rounded border px-4 py-2.5 text-sm transition-colors ${
                    color === c ? "border-ink bg-ink text-bg" : "border-hairline-strong hover:border-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="label-ui mb-3 text-ivory-muted">Size — {size}</div>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`min-w-12 rounded border px-4 py-2.5 text-sm transition-colors ${
                    size === s ? "border-ink bg-ink text-bg" : "border-hairline-strong hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center rounded border border-hairline-strong">
              <button aria-label="Decrease quantity" className="h-11 w-10 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span className="w-9 text-center text-sm">{qty}</span>
              <button aria-label="Increase quantity" className="h-11 w-10 text-lg" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="mb-8 flex gap-3">
            <button
              ref={addBtnRef}
              onClick={handleAdd}
              className="btn-primary flex-1 !py-[18px]"
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>
            <WishlistButton productId={product.id} productName={product.name} variant="inline" />
          </div>

          <ul className="flex flex-col gap-3 border-t border-hairline pt-6 text-sm text-ivory-muted">
            <li className="flex items-start gap-2.5">
              <Sparkles size={16} className="mt-0.5 flex-shrink-0" /> Handwoven by artisan partners in Varanasi
            </li>
            <li className="flex items-start gap-2.5">
              <Truck size={16} className="mt-0.5 flex-shrink-0" /> Free shipping worldwide
            </li>
            <li className="flex items-start gap-2.5">
              <RotateCcw size={16} className="mt-0.5 flex-shrink-0" /> 7-day easy returns
            </li>
          </ul>
        </div>
      </div>

      {/* Sticky add-to-cart bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-hairline bg-bg/90 px-6 py-4 backdrop-blur-md transition-transform duration-450 md:px-10"
        style={{
          transform: stickyVisible ? "translateY(0)" : "translateY(100%)",
          transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-[55px] w-[44px] flex-shrink-0 overflow-hidden rounded bg-bg-elevated">
            <Image src={product.images[0]} alt="" fill sizes="44px" className="object-cover" />
          </div>
          <div>
            <div className="font-display text-[1.05rem]">{product.name}</div>
            <div className="text-sm font-semibold text-gold-deep">{formatPrice(product.price)}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <WishlistButton
            productId={product.id}
            productName={product.name}
            variant="inline"
            className="!h-12 !w-12"
          />
          <button onClick={handleAdd} className="btn-primary !px-8 !py-3.5">
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pt-4 md:px-10">
        <SectionHeading title="Complete the Look" />
        <StaggerGrid className={PRODUCT_GRID}>
          {related.map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </main>
  );
}
