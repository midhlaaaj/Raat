import { LabNav } from "./lab-nav";

export const metadata = { title: "Design Lab — RAAT", robots: { index: false } };

/** Internal comparison pages; not linked from the storefront. */
export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="border-b border-hairline bg-bg-elevated">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">Design lab · internal</p>
            <h1 className="font-display text-3xl">Pick a direction</h1>
          </div>
          <LabNav />
        </div>
      </div>
      {children}
    </main>
  );
}
