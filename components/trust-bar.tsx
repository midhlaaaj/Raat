import { Lock, Scissors, Truck } from "lucide-react";

const ITEMS = [
  { icon: Truck, short: "Free Shipping", long: "Free Shipping Worldwide" },
  { icon: Scissors, short: "Made to Order", long: "Handloom & Made to Order" },
  { icon: Lock, short: "Secure Checkout", long: "Secure Checkout" },
];

/** Trust banner: slim USP strip above the header, on every page. */
export function TrustBar() {
  return (
    <div
      role="region"
      aria-label="Our promises"
      className="relative z-[51] flex h-10 w-full items-center justify-center overflow-hidden border-b border-hairline bg-bg-elevated px-4"
    >
      <ul className="font-accent flex items-center gap-3 whitespace-nowrap text-[9px] uppercase tracking-[0.1em] text-ivory md:gap-14 md:tracking-[0.25em]">
        {ITEMS.map(({ icon: Icon, short, long }) => (
          <li key={short} className="flex items-center gap-1 md:gap-2">
            <Icon size={13} strokeWidth={1.5} aria-hidden />
            <span className="md:hidden">{short}</span>
            <span className="hidden md:inline">{long}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
