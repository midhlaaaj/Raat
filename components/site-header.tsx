"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { LogoGlitch } from "@/components/logo-glitch";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/collections/amavas", label: "Collections" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Always-visible sticky header, solid pastel fill, dark ink text throughout. */
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 h-[76px] bg-bg-elevated/95 text-ivory backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 md:px-10">
          <button
            className="inline-flex md:hidden text-ivory"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <Link href="/" aria-label="RAAT home">
            <LogoGlitch />
          </Link>

          <nav className="hidden md:flex gap-9 text-[13px] tracking-[0.05em] uppercase">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-gold transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6 text-[13px]">
            <button aria-label="Search" className="hidden sm:inline-flex hover:text-gold transition-colors">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link
              href="/account"
              aria-label="Your account"
              className="hidden sm:inline-flex hover:text-gold transition-colors"
            >
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link
              href="/cart"
              aria-label="Open cart"
              className="relative inline-flex hover:text-gold transition-colors"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-ink">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-bg transition-transform duration-400 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
      >
        <button
          className="absolute right-6 top-6 text-ivory"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        >
          <X size={22} strokeWidth={1.5} />
        </button>
        <nav className="flex flex-col gap-2 px-8 pt-28">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="font-display border-b border-hairline py-3 text-2xl"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
