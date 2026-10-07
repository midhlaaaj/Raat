"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { getProduct, type Product } from "@/lib/data";
import { PRODUCT_GRID } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/product-card";
import { PageHeader } from "@/components/section-heading";
import { EmptyState } from "@/components/empty-state";

/** Size picker + "move to cart" under each saved product. */
function MoveToCart({ product }: { product: Product }) {
  const [size, setSize] = useState("");
  const { addItem } = useCart();
  const { toggle } = useWishlist();

  return (
    <div className="mt-3 flex gap-2">
      <label className="sr-only" htmlFor={`size-${product.id}`}>
        Size for {product.name}
      </label>
      <select
        id={`size-${product.id}`}
        value={size}
        onChange={(e) => setSize(e.target.value)}
        className="h-10 w-[4.5rem] flex-none rounded border border-hairline-strong bg-bg px-2 text-sm"
      >
        <option value="">Size</option>
        {product.sizes.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <button
        disabled={!size}
        onClick={() => {
          addItem(product.id, size, product.colors[0]);
          toggle(product.id);
        }}
        className="h-10 flex-1 rounded bg-ink text-xs font-semibold uppercase tracking-wider text-bg transition-colors hover:bg-gold-deep disabled:opacity-40"
      >
        Move to Cart
      </button>
    </div>
  );
}

export default function FavouritesPage() {
  const { ids } = useWishlist();
  const products = ids.map((id) => getProduct(id)).filter((p) => p !== undefined);

  return (
    <main>
      <PageHeader
        eyebrow="Saved"
        title="Favourites"
        subtitle={
          products.length > 0
            ? `${products.length} saved piece${products.length > 1 ? "s" : ""}. Tap the heart on any product to add or remove it.`
            : undefined
        }
      />

      {products.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Nothing saved yet"
          body="Tap the heart on any piece you love and it will wait for you here, ready to move to your cart whenever you are."
          suggestionsTitle="Popular right now"
        />
      ) : (
        <div className="mx-auto max-w-[1440px] px-6 pb-28 pt-12 md:px-10">
          <div className={PRODUCT_GRID}>
            {products.map((p) => (
              <div key={p.id} className="flex flex-col">
                <ProductCard product={p} />
                <MoveToCart product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
