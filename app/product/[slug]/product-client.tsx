"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/data";
import { formatPrice, getCollection, getRelatedProducts } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/product-card";
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
  const related = getRelatedProducts(product, 4);

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
      <div className="mx-auto max-w-[1440px] px-6 pb-2 pt-16 text-sm text-ivory-muted md:px-10 md:pt-20">
        <Link href="/" className="hover:text-ivory">Home</Link> /{" "}
        <Link href={`/collections/${product.collection}`} className="hover:text-ivory">
          {collection?.name}
        </Link>{" "}
        / <span className="text-ivory">{product.name}</span>
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 pb-24 md:grid-cols-[1.3fr_1fr] md:gap-20 md:px-10">
        {/* Gallery -- vertical stack scroll */}
        <div className="flex flex-col gap-4">
          {product.images.map((src, i) => (
            <Reveal key={i}>
              <div className="relative aspect-[4/5] bg-bg-elevated">
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
          <div className="mb-2 text-xs uppercase tracking-[0.05em] text-ivory-muted">{collection?.name}</div>
          <h1 className="font-display mb-3 text-3xl">{product.name}</h1>
          <div className="mb-7 text-xl text-gold">{formatPrice(product.price)}</div>

          <div className="mb-6">
            <div className="mb-3 text-xs uppercase tracking-[0.05em] text-ivory-muted">Color — {color}</div>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`border px-4.5 py-2.5 text-sm ${
                    color === c ? "border-ivory" : "border-hairline"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-3 text-xs uppercase tracking-[0.05em] text-ivory-muted">Size — {size}</div>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`border px-4.5 py-2.5 text-sm ${
                    size === s ? "border-ivory" : "border-hairline"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center border border-hairline">
              <button className="h-11 w-10 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span className="w-9 text-center text-sm">{qty}</span>
              <button className="h-11 w-10 text-lg" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
          </div>

          <button
            ref={addBtnRef}
            onClick={handleAdd}
            className="mb-8 w-full bg-gold py-[18px] text-sm font-semibold uppercase tracking-[0.06em] text-ink"
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>

          <ul className="flex flex-col gap-3 border-t border-hairline pt-6 text-sm text-ivory-muted">
            <li className="flex items-start gap-2.5">
              <Sparkles size={16} className="mt-0.5 flex-shrink-0" /> Handwoven by artisan partners in Varanasi
            </li>
            <li className="flex items-start gap-2.5">
              <Truck size={16} className="mt-0.5 flex-shrink-0" /> Free shipping on orders above ₹5,000
            </li>
            <li className="flex items-start gap-2.5">
              <RotateCcw size={16} className="mt-0.5 flex-shrink-0" /> 7-day easy returns
            </li>
          </ul>
        </div>
      </div>

      {/* Sticky add-to-cart bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-hairline bg-bg-elevated/95 px-6 py-4 backdrop-blur-md transition-transform duration-450 md:px-10"
        style={{
          transform: stickyVisible ? "translateY(0)" : "translateY(100%)",
          transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-[55px] w-[44px] flex-shrink-0 bg-bg">
            <Image src={product.images[0]} alt="" fill sizes="44px" className="object-cover" />
          </div>
          <div>
            <div className="font-display text-[1.05rem]">{product.name}</div>
            <div className="text-sm text-gold">{formatPrice(product.price)}</div>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.05em] text-ink"
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pt-4 md:px-10">
        <h2 className="font-display mb-10 text-[clamp(1.75rem,3vw,2.25rem)]">Complete the Look</h2>
        <StaggerGrid className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
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
