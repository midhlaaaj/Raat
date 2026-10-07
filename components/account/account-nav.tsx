"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, LayoutGrid, LogOut, MapPin, Package, UserRound } from "lucide-react";
import { MOCK_ACCOUNT } from "@/lib/data";
import { useWishlist } from "@/lib/wishlist";

const LINKS = [
  { href: "/account", label: "Overview", icon: LayoutGrid },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/favourites", label: "Favourites", icon: Heart },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/details", label: "Profile", icon: UserRound },
];

export function AccountNav() {
  const pathname = usePathname();
  const { count } = useWishlist();
  const initials = MOCK_ACCOUNT.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <aside className="md:sticky md:top-28 md:self-start">
      <div className="mb-6 flex items-center gap-4 rounded-xl bg-bg-elevated p-5">
        <div className="font-display flex h-14 w-14 flex-none items-center justify-center rounded-full bg-gold text-xl text-white">
          {initials}
        </div>
        <div className="min-w-0">
          <div className="font-medium">{MOCK_ACCOUNT.name}</div>
          <div className="truncate text-sm text-ivory-muted">{MOCK_ACCOUNT.email}</div>
        </div>
      </div>

      <nav
        aria-label="Account"
        className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 md:mx-0 md:flex-col md:gap-1 md:px-0"
      >
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = href === "/account" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-none items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                active ? "bg-ink text-bg" : "hover:bg-bg-elevated"
              }`}
            >
              <Icon size={17} strokeWidth={1.6} />
              {label}
              {label === "Favourites" && count > 0 && (
                <span className={`ml-auto text-xs ${active ? "text-bg/70" : "text-ivory-muted"}`}>{count}</span>
              )}
            </Link>
          );
        })}
        <button className="flex flex-none items-center gap-3 rounded-lg px-4 py-3 text-sm text-ivory-muted transition-colors hover:bg-bg-elevated hover:text-ink md:mt-4 md:border-t md:border-hairline md:pt-5">
          <LogOut size={17} strokeWidth={1.6} />
          Sign out
        </button>
      </nav>
    </aside>
  );
}
