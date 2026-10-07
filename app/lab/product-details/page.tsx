"use client";

import { useState } from "react";
import { PRODUCTS } from "@/lib/data";
import { PDP_VARIANTS } from "@/components/lab/pdp-variants";

export default function ProductDetailsLab() {
  const [active, setActive] = useState<string>(PDP_VARIANTS[0].id);
  const [productIndex, setProductIndex] = useState(16);
  const product = PRODUCTS[productIndex];
  const variant = PDP_VARIANTS.find((v) => v.id === active) ?? PDP_VARIANTS[0];
  const Layout = variant.Layout;

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-28 pt-10 md:px-10">
      <div className="mb-10 flex flex-col gap-5 rounded-xl border border-hairline p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {PDP_VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              aria-pressed={active === v.id}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                active === v.id ? "bg-ink text-bg" : "bg-bg-elevated hover:bg-surface"
              }`}
            >
              {v.id}. {v.name}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-sm">
          Preview with
          <select
            value={productIndex}
            onChange={(e) => setProductIndex(Number(e.target.value))}
            className="rounded border border-hairline-strong bg-bg px-3 py-2"
          >
            {PRODUCTS.map((p, i) => (
              <option key={p.id} value={i}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mb-10 text-sm text-ivory-muted">
        <span className="font-medium text-ink">Option {variant.id} — {variant.name}.</span> {variant.note}
      </p>

      {/* key resets size/colour selection when switching layout or product */}
      <Layout key={`${active}-${product.id}`} product={product} />
    </div>
  );
}
