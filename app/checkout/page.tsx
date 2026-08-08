"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { getProduct, formatPrice } from "@/lib/data";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  if (placed) {
    return (
      <main className="mx-auto max-w-[560px] px-6 py-40 text-center">
        <p className="font-accent mb-5 text-sm uppercase tracking-[0.18em] text-ivory/90">
          Order Confirmed
        </p>
        <h1 className="font-display mb-5 text-4xl">Thank you.</h1>
        <p className="mb-10 text-ivory-muted">
          Your order #RA-{orderNumber} is being prepared by our
          studio. A confirmation has been sent to your inbox.
        </p>
        <Link
          href="/"
          className="inline-block border border-ivory px-8 py-3.5 text-[13px] uppercase tracking-[0.08em] text-ivory"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1100px] px-6 pb-28 pt-16 md:px-10">
      <div className="mb-2 text-center text-xs uppercase tracking-[0.05em] text-ivory-muted">
        Secure Checkout
      </div>
      <div className="grid grid-cols-1 items-start gap-16 pt-10 md:grid-cols-[1.4fr_1fr]">
        <form
          className="flex flex-col gap-8"
          onSubmit={(e) => {
            e.preventDefault();
            setPlaced(true);
            setOrderNumber(String(Math.floor(10000 + Math.random() * 89999)));
            clear();
            window.scrollTo(0, 0);
          }}
        >
          <div>
            <h3 className="font-display mb-4 text-[1.15rem]">Shipping Address</h3>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <input required placeholder="First name" className="raat-input" />
              <input required placeholder="Last name" className="raat-input" />
              <input required placeholder="Address" className="raat-input sm:col-span-2" />
              <input required placeholder="City" className="raat-input" />
              <input required placeholder="PIN code" className="raat-input" />
            </div>
          </div>
          <div>
            <h3 className="font-display mb-4 text-[1.15rem]">Payment</h3>
            <div className="grid grid-cols-1 gap-3.5">
              <input required placeholder="Card number" className="raat-input" />
              <div className="grid grid-cols-2 gap-3.5">
                <input required placeholder="MM / YY" className="raat-input" />
                <input required placeholder="CVC" className="raat-input" />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={items.length === 0}
            className="bg-gold py-[18px] text-sm font-semibold uppercase tracking-[0.06em] text-ink disabled:opacity-40"
          >
            Place Order
          </button>
        </form>

        <div className="bg-bg-elevated p-8">
          <h3 className="font-display mb-6 text-xl">Order Summary</h3>
          {items.map((item, i) => {
            const product = getProduct(item.productId);
            if (!product) return null;
            return (
              <div key={i} className="mb-3 flex justify-between text-sm text-ivory-muted">
                <span>{product.name} × {item.qty}</span>
                <span>{formatPrice(product.price * item.qty)}</span>
              </div>
            );
          })}
          <div className="mb-5 flex justify-between text-sm text-ivory-muted">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between border-t border-hairline pt-5 text-lg">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
