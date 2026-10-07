import { Check } from "lucide-react";
import type { OrderStatus } from "@/lib/data";

const STATUS_STYLES: Record<OrderStatus, string> = {
  Processing: "bg-[#fbeedd] text-[#8a5a1c]",
  Shipped: "bg-[#e1eef4] text-[#2c5566]",
  Delivered: "bg-[#e3efe2] text-[#36633a]",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

const STEPS = ["Placed", "Processing", "Shipped", "Delivered"] as const;

/** Four-step horizontal tracker. */
export function OrderProgress({ status }: { status: OrderStatus }) {
  const reached = STEPS.indexOf(status);
  return (
    <ol className="grid grid-cols-4">
      {STEPS.map((step, i) => {
        const done = i <= reached;
        return (
          <li key={step} className="relative flex flex-col items-center text-center">
            {i > 0 && (
              <span
                aria-hidden
                className={`absolute right-1/2 top-3 h-0.5 w-full -translate-y-1/2 ${i <= reached ? "bg-gold" : "bg-hairline-strong"}`}
              />
            )}
            <span
              className={`relative z-10 mb-2 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                done ? "border-gold bg-gold text-white" : "border-hairline-strong bg-bg"
              }`}
            >
              {done && <Check size={13} strokeWidth={3} />}
            </span>
            <span className={`text-xs ${done ? "text-ink" : "text-ivory-muted"}`}>{step}</span>
          </li>
        );
      })}
    </ol>
  );
}
