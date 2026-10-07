"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { MOCK_ORDERS, formatPrice } from "@/lib/data";
import { OrderProgress, StatusBadge } from "@/components/account/order-bits";

export default function OrdersPage() {
  const [open, setOpen] = useState<string | null>(MOCK_ORDERS[0]?.id ?? null);

  return (
    <div>
      <h1 className="font-display mb-1 text-[clamp(2rem,4vw,2.75rem)] leading-tight">Orders</h1>
      <p className="mb-10 text-ivory-muted">{MOCK_ORDERS.length} orders placed</p>

      <div className="flex flex-col gap-4">
        {MOCK_ORDERS.map((order) => {
          const isOpen = open === order.id;
          const qty = order.items.reduce((s, i) => s + i.qty, 0);
          return (
            <section key={order.id} className="overflow-hidden rounded-xl border border-hairline">
              <button
                onClick={() => setOpen(isOpen ? null : order.id)}
                aria-expanded={isOpen}
                className="flex w-full flex-wrap items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-bg-low md:flex-nowrap md:px-6"
              >
                <div className="flex -space-x-3">
                  {order.items.slice(0, 3).map(({ product }) => (
                    <div key={product.id} className="relative h-14 w-12 overflow-hidden rounded-md border-2 border-bg bg-bg-elevated">
                      <Image src={product.images[0]} alt="" fill sizes="48px" className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium">#{order.id}</div>
                  <div className="text-sm text-ivory-muted">
                    {order.date} · {qty} item{qty > 1 ? "s" : ""}
                  </div>
                </div>
                <StatusBadge status={order.status} />
                <div className="w-24 text-right font-medium">{formatPrice(order.total)}</div>
                <ChevronDown size={18} className={`text-ivory-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <div className="border-t border-hairline bg-bg-low px-5 py-6 md:px-6">
                  <div className="mb-8 max-w-xl">
                    <OrderProgress status={order.status} />
                  </div>
                  <ul className="mb-6 flex flex-col gap-4">
                    {order.items.map(({ product, qty }) => (
                      <li key={product.id} className="flex items-center gap-4">
                        <div className="relative h-20 w-16 flex-none overflow-hidden rounded-md bg-bg-elevated">
                          <Image src={product.images[0]} alt={product.name} fill sizes="64px" className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <Link href={`/product/${product.slug}`} className="font-medium hover:text-gold-deep">
                            {product.name}
                          </Link>
                          <div className="text-sm text-ivory-muted">Qty {qty}</div>
                        </div>
                        <div className="text-sm">{formatPrice(product.price * qty)}</div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <button className="btn-outline !px-5 !py-2.5">
                      {order.status === "Delivered" ? "Start a Return" : "Track Shipment"}
                    </button>
                    <button className="btn-outline !border-hairline-strong !px-5 !py-2.5">Download Invoice</button>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
