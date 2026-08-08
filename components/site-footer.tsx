"use client";

import Link from "next/link";
import { useState } from "react";
import { AtSign } from "lucide-react";
import { COLLECTIONS } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function SiteFooter() {
  const [sent, setSent] = useState(false);

  return (
    <footer className="mt-auto border-t border-hairline bg-bg">
      <Reveal>
        <div className="mx-auto max-w-[1440px] border-b border-hairline px-6 py-16 md:px-10 md:py-24">
          <h2 className="font-display max-w-[16ch] text-[clamp(1.7rem,4.5vw,3.1rem)] leading-[1.15]">
            Clothing built around the people who make it, and the ones who wear it.
          </h2>
        </div>
      </Reveal>

      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-10 border-b border-hairline px-6 py-14 md:grid-cols-5 md:px-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-accent mb-4 text-lg tracking-[0.15em]">RAAT</div>
          <p className="max-w-[280px] text-sm leading-relaxed text-ivory-muted">
            Contemporary Indian fashion, cut for the hours after sundown. Handloom, hand-block,
            and zari craft — reimagined.
          </p>
        </div>
        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.05em] text-ivory">Shop</div>
          <div className="flex flex-col gap-2.5 text-sm text-ivory-muted">
            <Link href="/shop" className="hover:text-ivory transition-colors">All Products</Link>
            {COLLECTIONS.map((c) => (
              <Link key={c.slug} href={`/collections/${c.slug}`} className="hover:text-ivory transition-colors">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.05em] text-ivory">Company</div>
          <div className="flex flex-col gap-2.5 text-sm text-ivory-muted">
            <Link href="/about" className="hover:text-ivory transition-colors">Our Story</Link>
            <Link href="/journal" className="hover:text-ivory transition-colors">Journal</Link>
            <Link href="/contact" className="hover:text-ivory transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.05em] text-ivory">Connect</div>
          <div className="flex flex-col gap-2.5 text-sm text-ivory-muted">
            <a href="#" className="inline-flex items-center gap-2 hover:text-ivory transition-colors">
              <AtSign size={14} strokeWidth={1.5} /> Instagram
            </a>
            <a href="#" className="hover:text-ivory transition-colors">Pinterest</a>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="mb-4 text-xs uppercase tracking-[0.05em] text-ivory">Join the Night List</div>
          <p className="mb-4 text-sm leading-relaxed text-ivory-muted">
            First access to drops and studio notes.
          </p>
          <form
            className="flex border border-hairline"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 4000);
            }}
          >
            <input
              type="email"
              required
              placeholder="Email"
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-ivory placeholder:text-ivory-muted focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.05em] text-ink"
            >
              Join
            </button>
          </form>
          {sent && <p className="mt-2 text-xs text-gold">You&apos;re on the list.</p>}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-8 text-xs text-ivory-muted md:px-10">
        &copy; 2026 RAAT. All rights reserved.
      </div>
    </footer>
  );
}
