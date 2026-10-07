"use client";

import Link from "next/link";
import { useState } from "react";
import { COLLECTIONS } from "@/lib/data";
import { Reveal } from "@/components/reveal";

function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <section className="border-t border-hairline bg-bg-low px-6 py-20 md:py-24">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <p className="eyebrow mb-4">Newsletter</p>
        <h2 className="font-display mb-4 text-[clamp(1.75rem,3vw,2rem)]">Join the Inner Circle</h2>
        <p className="mb-8 text-ivory-muted">
          Updates on new arrivals, exclusive collections, and stories from the studio.
        </p>
        <form
          className="flex w-full max-w-md flex-col gap-4 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            (e.target as HTMLFormElement).reset();
            setTimeout(() => setSent(false), 4000);
          }}
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Enter your email address"
            className="min-w-0 flex-1 border-b border-hairline-strong bg-transparent px-2 py-3 text-ivory placeholder:text-[#77736c] transition-colors focus:border-ivory focus:outline-none"
          />
          <button type="submit" className="btn-primary">
            Subscribe
          </button>
        </form>
        <p className="mt-3 h-4 text-xs text-gold-deep" role="status">
          {sent ? "You're on the list." : ""}
        </p>
      </Reveal>
    </section>
  );
}

const linkClass = "text-sm transition-colors hover:text-gold-deep";

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <Newsletter />

      <div className="border-t border-hairline bg-bg-elevated pb-10 pt-20 text-ivory md:pt-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-b border-hairline-strong pb-14 lg:grid-cols-12">
            <div className="col-span-2 lg:col-span-4">
              <div className="font-accent mb-6 text-3xl uppercase tracking-[0.3em]">RAAT</div>
              <p className="max-w-xs text-sm leading-relaxed text-ivory-muted">
                Contemporary Indian craft for every day — handloom, hand-block and zari work, made
                with artisan partners across India.
              </p>
            </div>

            <div className="lg:col-span-2">
              <h3 className="label-ui mb-5 text-gold-deep">Shop</h3>
              <nav className="flex flex-col gap-3.5 text-ivory">
                <Link href="/shop" className={linkClass}>All Products</Link>
                {COLLECTIONS.map((c) => (
                  <Link key={c.slug} href={`/collections/${c.slug}`} className={linkClass}>
                    {c.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="lg:col-span-2">
              <h3 className="label-ui mb-5 text-gold-deep">Company</h3>
              <nav className="flex flex-col gap-3.5 text-ivory">
                <Link href="/about" className={linkClass}>Our Story</Link>
                <Link href="/journal" className={linkClass}>Journal</Link>
                <Link href="/contact" className={linkClass}>Contact</Link>
                <Link href="/account" className={linkClass}>Account</Link>
                <Link href="/favourites" className={linkClass}>Favourites</Link>
              </nav>
            </div>

            <div className="col-span-2 lg:col-span-4">
              <h3 className="label-ui mb-5 text-gold-deep">Studio</h3>
              <p className="mb-4 text-sm leading-relaxed text-ivory-muted">
                B-42 Bapu Bazaar Road
                <br />
                Jaipur, Rajasthan 302001
              </p>
              <a
                href="mailto:hello@raat.com"
                className="font-accent border-b border-gold-deep text-gold-deep transition-colors hover:text-ink"
              >
                hello@raat.com
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 pt-8 text-[10px] uppercase tracking-widest text-ivory-muted md:flex-row">
            <span>&copy; 2026 RAAT Indian Fashion House</span>
            <div className="flex gap-8">
              <a href="#" className="transition-colors hover:text-ink">Instagram</a>
              <a href="#" className="transition-colors hover:text-ink">Pinterest</a>
              <a href="#" className="transition-colors hover:text-ink">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
