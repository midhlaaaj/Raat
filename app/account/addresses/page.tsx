import { Pencil, Plus, Trash2 } from "lucide-react";
import { MOCK_ADDRESSES, MOCK_ACCOUNT } from "@/lib/data";

export default function AddressesPage() {
  return (
    <div>
      <h1 className="font-display mb-1 text-[clamp(2rem,4vw,2.75rem)] leading-tight">Addresses</h1>
      <p className="mb-10 text-ivory-muted">Saved delivery addresses for faster checkout.</p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {MOCK_ADDRESSES.map((addr) => (
          <div
            key={addr.label}
            className={`flex flex-col rounded-xl border p-6 ${addr.isDefault ? "border-ink" : "border-hairline"}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-bg-elevated px-3 py-1 text-xs font-semibold">{addr.label}</span>
              {addr.isDefault && (
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-deep">Default</span>
              )}
            </div>
            <p className="mb-1 font-medium">{addr.name}</p>
            {addr.lines.map((line) => (
              <p key={line} className="text-sm leading-relaxed text-ivory-muted">
                {line}
              </p>
            ))}
            <p className="mt-2 text-sm text-ivory-muted">{MOCK_ACCOUNT.phone}</p>
            <div className="mt-6 flex gap-2 border-t border-hairline pt-4">
              <button className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-bg-elevated">
                <Pencil size={14} /> Edit
              </button>
              <button className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-ivory-muted transition-colors hover:bg-bg-elevated hover:text-ink">
                <Trash2 size={14} /> Remove
              </button>
              {!addr.isDefault && (
                <button className="ml-auto rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-bg-elevated">
                  Set default
                </button>
              )}
            </div>
          </div>
        ))}

        <button className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-hairline-strong text-ivory-muted transition-colors hover:border-ink hover:text-ink">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bg-elevated">
            <Plus size={20} />
          </span>
          <span className="text-sm font-medium">Add a new address</span>
        </button>
      </div>
    </div>
  );
}
