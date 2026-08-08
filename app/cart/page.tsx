"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { getProduct, formatPrice } from "@/lib/data";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotalFormatted } = useCart();

  return (
    <main className="mx-auto max-w-[1100px] px-6 pb-28 pt-16 md:px-10 md:pt-20">
      <h1 className="font-display mb-12 text-[clamp(2rem,4vw,2.5rem)]">Your Cart</h1>
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
                      <div className="relative aspect-square w-24 flex-shrink-0 bg-bg-elevated">
                        <Image src={product.images[0]} alt={product.name} fill sizes="96px" className="object-cover" />
                      </div>
                      <div>
                        <div className="font-display mb-1 text-[1.1rem]">{product.name}</div>
                        <div className="mb-5 text-sm text-ivory-muted">{item.color} / {item.size}</div>
                        <div className="flex items-center border border-hairline">
                          <button className="h-8 w-8" onClick={() => updateQty(index, item.qty - 1)}>−</button>
                          <span className="w-7 text-center text-sm">{item.qty}</span>
                          <button className="h-8 w-8" onClick={() => updateQty(index, item.qty + 1)}>+</button>
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
                      <span className="text-sm">{formatPrice(product.price * item.qty)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {items.length === 0 && (
            <p className="py-10 text-ivory-muted">
              Your cart is empty.{" "}
              <Link href="/shop" className="text-gold underline">
                Continue shopping
              </Link>
            </p>
          )}
        </div>

        <div className="bg-bg-elevated p-8">
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
            className="block bg-gold py-4 text-center text-sm font-semibold uppercase tracking-[0.05em] text-ink"
          >
            Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
