"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/lab/product-cards", label: "Product cards" },
  { href: "/lab/product-details", label: "Product details" },
  { href: "/lab/fonts", label: "Fonts" },
];

export function LabNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Design lab" className="flex gap-2 overflow-x-auto">
      {TABS.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          aria-current={pathname === t.href ? "page" : undefined}
          className={`flex-none rounded-full px-5 py-2 text-sm transition-colors ${
            pathname === t.href ? "bg-ink text-bg" : "bg-bg hover:bg-surface"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
