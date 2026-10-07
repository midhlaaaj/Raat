"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, MapPin, Package } from "lucide-react";
import { CUSTOMER_NAME, MOCK_ADDRESSES, MOCK_ORDERS, formatPrice } from "@/lib/data";
import { useWishlist } from "@/lib/wishlist";
import { OrderProgress, StatusBadge } from "@/components/account/order-bits";

export default function AccountOverviewPage() {
  const { count } = useWishlist();
  const latest = MOCK_ORDERS[0];
  const defaultAddress = MOCK_ADDRESSES.find((a) => a.isDefault) ?? MOCK_ADDRESSES[0];

  const stats = [
    { label: "Orders", value: MOCK_ORDERS.length, href: "/account/orders", icon: Package },
    { label: "Favourites", value: count, href: "/favourites", icon: Heart },
    { label: "Addresses", value: MOCK_ADDRESSES.length, href: "/account/addresses", icon: MapPin },
  ];

  return (
    <div>
      <h1 className="font-display mb-1 text-[clamp(2rem,4vw,2.75rem)] leading-tight">
        Hello, {CUSTOMER_NAME}
      </h1>
      <p className="mb-10 text-ivory-muted">Track orders, manage addresses and update your details.</p>

      <div className="mb-10 grid grid-cols-3 gap-3 md:gap-5">
        {stats.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-xl border border-hairline p-4 transition-colors hover:border-ink md:p-6"
          >
            <Icon size={20} strokeWidth={1.5} className="mb-4 text-gold-deep" />
            <div className="font-display text-3xl">{value}</div>
            <div className="text-sm text-ivory-muted">{label}</div>
          </Link>
        ))}
      </div>

      {/* Latest order with tracker */}
      <section className="mb-10 rounded-xl border border-hairline">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-5 py-4 md:px-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-ivory-muted">Latest order</div>
            <div className="font-medium">
              #{latest.id} · {latest.date}
            </div>
          </div>
          <StatusBadge status={latest.status} />
        </div>
        <div className="px-5 py-6 md:px-6">
          <div className="mb-8">
            <OrderProgress status={latest.status} />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex -space-x-3">
              {latest.items.map(({ product }) => (
                <div key={product.id} className="relative h-16 w-14 overflow-hidden rounded-md border-2 border-bg bg-bg-elevated">
                  <Image src={product.images[0]} alt={product.name} fill sizes="56px" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="flex-1 text-sm">
              {latest.items.map((i) => i.product.name).join(", ")}
            </div>
            <div className="font-medium">{formatPrice(latest.total)}</div>
          </div>
        </div>
        <Link
          href="/account/orders"
          className="flex items-center justify-between border-t border-hairline px-5 py-4 text-sm font-medium transition-colors hover:bg-bg-low md:px-6"
        >
          View all orders <ArrowRight size={16} />
        </Link>
      </section>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <section className="rounded-xl bg-bg-elevated p-6">
          <div className="mb-3 text-xs uppercase tracking-wider text-ivory-muted">Default address</div>
          <p className="mb-1 font-medium">{defaultAddress.name}</p>
          {defaultAddress.lines.map((l) => (
            <p key={l} className="text-sm text-ivory-muted">
              {l}
            </p>
          ))}
          <Link href="/account/addresses" className="text-link mt-5">
            Manage
          </Link>
        </section>
        <section className="rounded-xl bg-bg-elevated p-6">
          <div className="mb-3 text-xs uppercase tracking-wider text-ivory-muted">Need help?</div>
          <p className="mb-1 font-medium">Returns &amp; exchanges</p>
          <p className="text-sm text-ivory-muted">
            Start a return within 7 days of delivery, or reach our team any day 10am–7pm IST.
          </p>
          <Link href="/contact" className="text-link mt-5">
            Contact us
          </Link>
        </section>
      </div>
    </div>
  );
}
