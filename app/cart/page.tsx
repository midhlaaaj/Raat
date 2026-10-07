"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { getProduct, formatPrice } from "@/lib/data";
import { ShoppingBag } from "lucide-react";
import { PageHeader } from "@/components/section-heading";
import { EmptyState } from "@/components/empty-state";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotalFormatted, hydrated } = useCart();

  if (!hydrated) {
    return (
      <main>
        <PageHeader eyebrow="Your Bag" title="Your Cart" />
        <div className="min-h-[50vh]" />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main>
        <PageHeader eyebrow="Your Bag" title="Your Cart" />
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          body="Nothing in here yet. Start with our new arrivals, or pick up where you left off in your favourites."
        />
      </main>
    );
  }

  return (
    <main>
      <PageHeader eyebrow="Your Bag" title="Your Cart" />
      <div className="mx-auto max-w-[1100px] px-6 pb-28 pt-12 md:px-10">
      <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-[1.6fr_1fr]">
        <div>
          <AnimatePresence initial={false}>
            {items.map((item, index) => {
              const product = getProduct(item.productId);
              if (!product) return null;
              return (
                <motion.div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  initial={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.35, ease: [0, 0, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="flex items-stretch justify-between gap-5 border-b border-hairline py-6">
                    <div className="flex gap-5">
                      <div className="relative aspect-square w-24 flex-shrink-0 overflow-hidden rounded-lg bg-bg-elevated">
                        <Image src={product.images[0]} alt={product.name} fill sizes="96px" className="object-cover" />
                      </div>
                      <div>
                        <div className="font-display mb-1 text-[1.1rem]">{product.name}</div>
                        <div className="mb-5 text-sm text-ivory-muted">{item.color} / {item.size}</div>
                        <div className="flex w-max items-center rounded border border-hairline-strong">
                          <button aria-label="Decrease quantity" className="h-8 w-8" onClick={() => updateQty(index, item.qty - 1)}>−</button>
                          <span className="w-7 text-center text-sm">{item.qty}</span>
                          <button aria-label="Increase quantity" className="h-8 w-8" onClick={() => updateQty(index, item.qty + 1)}>+</button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(index)}
                        className="text-sm text-ivory-muted hover:text-ivory"
                      >
                        Remove
                      </button>
                      <span className="text-sm font-semibold text-gold-deep">{formatPrice(product.price * item.qty)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="rounded-xl bg-bg-elevated p-8 md:sticky md:top-28">
          <h3 className="font-display mb-6 text-xl">Order Summary</h3>
          <div className="mb-3 flex justify-between text-sm text-ivory-muted">
            <span>Subtotal</span>
            <span>{subtotalFormatted}</span>
          </div>
          <div className="mb-5 flex justify-between text-sm text-ivory-muted">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="mb-7 flex justify-between border-t border-hairline pt-5 text-lg">
            <span>Total</span>
            <span>{subtotalFormatted}</span>
          </div>
          <Link
            href="/checkout"
            className="btn-primary w-full"
          >
            Checkout
          </Link>
        </div>
      </div>
      </div>
    </main>
  );
}
