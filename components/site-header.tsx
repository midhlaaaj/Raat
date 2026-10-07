"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingBag, Search, Menu, X, User, Heart } from "lucide-react";
import { LogoGlitch } from "@/components/logo-glitch";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist";

const NAV_LINKS = [
  { href: "/shop", label: "Shop", match: "/shop" },
  { href: "/collections", label: "Collections", match: "/collections" },
  { href: "/journal", label: "Journal", match: "/journal" },
  { href: "/about", label: "About", match: "/about" },
  { href: "/contact", label: "Contact", match: "/contact" },
];

/** Sticky frosted header, the same light bar on every page. */
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();
  const { count: savedCount } = useWishlist();
  const pathname = usePathname();

  return (
    <>
      <header
        className="sticky top-0 z-50 h-20 border-b border-hairline bg-bg/90 text-ivory backdrop-blur-xl"
      >
        <div className="mx-auto grid h-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-6 md:grid-cols-[auto_1fr_auto] md:gap-12 md:px-10">
          <button
            className="inline-flex md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <Link href="/" aria-label="RAAT home" className="inline-flex justify-self-center md:justify-self-start">
            <LogoGlitch />
          </Link>

          <nav className="hidden items-center justify-center gap-9 md:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => {
              const active = pathname.startsWith(l.match);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`label-ui underline-offset-8 transition-opacity hover:underline ${
                    active ? "underline" : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-5 md:gap-6">
            <button aria-label="Search" className="hidden transition-opacity hover:opacity-70 sm:inline-flex">
              <Search size={19} strokeWidth={1.5} />
            </button>
            <Link
              href="/account"
              aria-label="Your account"
              className="hidden transition-opacity hover:opacity-70 sm:inline-flex"
            >
              <User size={20} strokeWidth={1.5} />
            </Link>
            <Link
              href="/favourites"
              aria-label="Favourites"
              className="relative inline-flex transition-opacity hover:opacity-70"
            >
              <Heart size={20} strokeWidth={1.5} />
              {savedCount > 0 && (
                <span className="absolute -right-2.5 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-maroon text-[10px] font-semibold text-white">
                  {savedCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              aria-label="Open cart"
              className="relative inline-flex transition-opacity hover:opacity-70"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-2.5 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-white">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div
        inert={!mobileOpen}
        className={`fixed inset-0 z-[60] bg-bg text-ivory transition-transform duration-500 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div className="flex h-20 items-center justify-between border-b border-hairline px-6">
          <span className="eyebrow">Menu</span>
          <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-col px-6 pt-6" aria-label="Mobile">
          {[
            ...NAV_LINKS,
            { href: "/favourites", label: "Favourites", match: "/favourites" },
            { href: "/account", label: "Account", match: "/account" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="font-display border-b border-hairline py-4 text-3xl"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
