"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";

/**
 * Heart toggle. `overlay` sits on top of a product image (round white chip);
 * `inline` is a bordered square that lines up next to the add-to-cart button.
 */
export function WishlistButton({
  productId,
  productName,
  variant = "overlay",
  className = "",
}: {
  productId: string;
  productName: string;
  variant?: "overlay" | "inline";
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const saved = has(productId);

  const base =
    variant === "overlay"
      ? "h-9 w-9 rounded-full bg-white/90 shadow-sm backdrop-blur-sm hover:bg-white"
      : "h-[58px] w-[58px] rounded border border-hairline-strong hover:border-ink";

  return (
    <button
      type="button"
      aria-label={saved ? `Remove ${productName} from favourites` : `Add ${productName} to favourites`}
      aria-pressed={saved}
      onClick={(e) => {
        // Cards are links -- keep the heart from navigating.
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      className={`inline-flex flex-none items-center justify-center text-ink transition-colors ${base} ${className}`}
    >
      <Heart
        size={variant === "overlay" ? 16 : 20}
        strokeWidth={1.6}
        className={`transition-transform duration-300 ${saved ? "scale-110 fill-maroon text-maroon" : ""}`}
      />
    </button>
  );
}
