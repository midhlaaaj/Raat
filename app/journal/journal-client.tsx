"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { JournalEntry } from "@/lib/data";
import { readingTime } from "@/lib/journal";

function Meta({ entry }: { entry: JournalEntry }) {
  return (
    <div className="flex items-center gap-2 text-xs text-ivory-muted">
      <span className="font-semibold uppercase tracking-[0.14em] text-gold-deep">{entry.category}</span>
      <span aria-hidden>·</span>
      <span>{entry.date}</span>
      <span aria-hidden>·</span>
      <span>{readingTime(entry)} min read</span>
    </div>
  );
}

export function JournalClient({ entries }: { entries: JournalEntry[] }) {
  const categories = ["All", ...Array.from(new Set(entries.map((e) => e.category)))];
  const [active, setActive] = useState("All");

  const [lead, ...rest] = entries;
  const filtered = active === "All" ? rest : entries.filter((e) => e.category === active);

  return (
    <main>
      {/* Masthead */}
      <div className="border-b border-hairline">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 pb-8 pt-14 md:flex-row md:items-end md:justify-between md:px-10 md:pt-20">
          <div>
            <p className="eyebrow mb-3">The RAAT Journal</p>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tight">
              Stories &amp; Styling
            </h1>
          </div>
          <p className="max-w-sm text-ivory-muted">
            Styling guides, artisan features and notes from the studio, published every fortnight.
          </p>
        </div>
      </div>

      {/* Lead story -- only on the unfiltered view */}
      {active === "All" && (
        <section className="mx-auto max-w-[1440px] px-6 pt-12 md:px-10 md:pt-16">
          <Link
            href={`/journal/${lead.slug}`}
            className="group grid grid-cols-1 items-center gap-8 md:grid-cols-[1.4fr_1fr] md:gap-14"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-bg-elevated">
              <Image
                src={lead.image}
                alt={lead.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div>
              <span className="mb-4 inline-block rounded-full bg-bg-elevated px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
                Latest
              </span>
              <h2 className="font-display mb-4 text-[clamp(1.9rem,3.2vw,2.75rem)] leading-tight">
                {lead.title}
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-ivory-muted">{lead.excerpt}</p>
              <Meta entry={lead} />
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                Read the story
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Category filter */}
      <div className="mx-auto max-w-[1440px] px-6 pt-14 md:px-10 md:pt-20">
        <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto border-b border-hairline px-6 pb-5 md:mx-0 md:px-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`flex-none rounded-full px-5 py-2 text-sm transition-colors ${
                active === c ? "bg-ink text-bg" : "bg-bg-elevated hover:bg-surface"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Story grid */}
      <div className="mx-auto max-w-[1440px] px-6 pb-28 pt-10 md:px-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <Link key={e.slug} href={`/journal/${e.slug}`} className="group flex flex-col">
              <div className="relative mb-5 aspect-[3/2] overflow-hidden rounded-lg bg-bg-elevated">
                <Image
                  src={e.image}
                  alt={e.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <Meta entry={e} />
              <h3 className="font-display mb-2 mt-3 text-[1.45rem] leading-snug transition-colors group-hover:text-gold-deep">
                {e.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-ivory-muted">{e.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
