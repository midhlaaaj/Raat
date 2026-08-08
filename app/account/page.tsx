"use client";

import Image from "next/image";
import { useState } from "react";
import { formatPrice, CUSTOMER_NAME, MOCK_ORDERS, MOCK_ADDRESSES, MOCK_ACCOUNT, type OrderStatus } from "@/lib/data";
import { Reveal } from "@/components/reveal";

const TABS = ["Orders", "Addresses", "Account Details"] as const;
type Tab = (typeof TABS)[number];

function statusColor(status: OrderStatus) {
  if (status === "Delivered") return "text-gold";
  if (status === "Shipped") return "text-gold";
  return "text-ivory-muted";
}

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("Orders");

  return (
    <main className="mx-auto max-w-[1100px] px-6 pb-28 pt-16 md:px-10 md:pt-20">
      <div className="mb-14 flex items-start justify-between">
        <div>
          <p className="font-accent mb-3 text-sm uppercase tracking-[0.16em] text-ivory-muted">
            Account
          </p>
          <h1 className="font-display text-[clamp(2.25rem,4vw,3rem)]">Hi, {CUSTOMER_NAME}</h1>
        </div>
        <button className="border border-hairline px-6 py-2.5 text-xs uppercase tracking-[0.05em] text-ivory hover:border-ivory">
          Sign Out
        </button>
      </div>

      <div className="mb-10 flex gap-8 border-b border-hairline">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative pb-4 text-xs uppercase tracking-[0.08em] transition-colors ${
              tab === t ? "text-ivory" : "text-ivory-muted hover:text-ivory"
            }`}
          >
            {t}
            {tab === t && <span className="absolute inset-x-0 -bottom-px h-[2px] bg-gold" />}
          </button>
        ))}
      </div>

      {tab === "Orders" && (
        <Reveal>
          <div className="flex flex-col">
            {MOCK_ORDERS.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-6 border-b border-hairline py-8 first:pt-0"
              >
                <div className="relative aspect-square w-20 flex-shrink-0 overflow-hidden bg-bg-elevated">
                  <Image
                    src={order.items[0].product.images[0]}
                    alt={order.items[0].product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-display text-lg">{order.id}</div>
                  <div className="text-sm text-ivory-muted">
                    {order.date} · {order.items.reduce((s, i) => s + i.qty, 0)} item
                    {order.items.reduce((s, i) => s + i.qty, 0) > 1 ? "s" : ""}
                  </div>
                </div>
                <div className={`text-xs uppercase tracking-[0.05em] ${statusColor(order.status)}`}>
                  {order.status}
                </div>
                <div className="font-display w-24 text-right text-lg">
                  {formatPrice(order.total)}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {tab === "Addresses" && (
        <Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {MOCK_ADDRESSES.map((addr) => (
              <div key={addr.label} className="border border-hairline p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.05em] text-ivory-muted">
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.05em] text-ink">
                      Default
                    </span>
                  )}
                </div>
                <p className="font-display mb-1 text-lg">{addr.name}</p>
                {addr.lines.map((line) => (
                  <p key={line} className="text-sm text-ivory-muted">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {tab === "Account Details" && (
        <Reveal>
          <div className="max-w-md">
            <div className="field mb-5">
              <label className="mb-2 block text-xs uppercase tracking-[0.05em] text-ivory-muted">
                Full Name
              </label>
              <input readOnly value={MOCK_ACCOUNT.name} className="raat-input" />
            </div>
            <div className="field mb-5">
              <label className="mb-2 block text-xs uppercase tracking-[0.05em] text-ivory-muted">
                Email
              </label>
              <input readOnly value={MOCK_ACCOUNT.email} className="raat-input" />
            </div>
            <div className="field mb-8">
              <label className="mb-2 block text-xs uppercase tracking-[0.05em] text-ivory-muted">
                Phone
              </label>
              <input readOnly value={MOCK_ACCOUNT.phone} className="raat-input" />
            </div>
            <button className="border border-ivory px-8 py-3 text-xs uppercase tracking-[0.05em] text-ivory hover:bg-ivory hover:text-bg">
              Edit Details
            </button>
          </div>
        </Reveal>
      )}
    </main>
  );
}
