import Image from "next/image";
import {
  Bodoni_Moda,
  Cormorant_Garamond,
  DM_Sans,
  Figtree,
  Fraunces,
  Gilda_Display,
  Gloock,
  Hanken_Grotesk,
  Inter,
  Instrument_Sans,
  Instrument_Serif,
  Jost,
  Manrope,
  Marcellus,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Tiro_Devanagari_Hindi,
} from "next/font/google";
import { PRODUCTS, formatPrice } from "@/lib/data";

// Every font is loaded only on this lab page; the storefront keeps its current fonts until one is chosen.
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });
const manrope = Manrope({ subsets: ["latin"] });
const fraunces = Fraunces({ subsets: ["latin"], axes: ["SOFT", "opsz"] });
const instrumentSans = Instrument_Sans({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const hanken = Hanken_Grotesk({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });
const marcellus = Marcellus({ subsets: ["latin"], weight: "400" });
const jost = Jost({ subsets: ["latin"] });
const gloock = Gloock({ subsets: ["latin"], weight: "400" });
const figtree = Figtree({ subsets: ["latin"] });
const gilda = Gilda_Display({ subsets: ["latin"], weight: "400" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const bodoni = Bodoni_Moda({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const tiro = Tiro_Devanagari_Hindi({ subsets: ["devanagari", "latin"], weight: "400" });

type Pairing = {
  id: string;
  name: string;
  display: { label: string; family: string; weight?: number };
  body: { label: string; family: string };
  why: string;
  current?: boolean;
};

const PAIRINGS: Pairing[] = [
  {
    id: "1",
    name: "Couture",
    display: { label: "Cormorant Garamond", family: cormorant.style.fontFamily, weight: 500 },
    body: { label: "Manrope", family: manrope.style.fontFamily },
    why: "High-contrast, delicate serif with a crisp geometric sans. Reads luxurious without feeling heavy — closest to bridal/occasion labels.",
  },
  {
    id: "2",
    name: "Warm Modern",
    display: { label: "Fraunces (soft)", family: fraunces.style.fontFamily, weight: 400 },
    body: { label: "Instrument Sans", family: instrumentSans.style.fontFamily },
    why: "Fraunces' soft, slightly wonky curves feel handmade — a good match for handloom. Friendly and distinctive, still premium.",
  },
  {
    id: "3",
    name: "Contemporary Editorial",
    display: { label: "Instrument Serif", family: instrumentSerif.style.fontFamily },
    body: { label: "Hanken Grotesk", family: hanken.style.fontFamily },
    why: "Condensed, elegant serif that looks great very large, with a clean grotesk. The look of many current fashion and lifestyle brands.",
  },
  {
    id: "4",
    name: "Classic Fashion",
    display: { label: "Playfair Display", family: playfair.style.fontFamily, weight: 500 },
    body: { label: "DM Sans", family: dmSans.style.fontFamily },
    why: "Familiar magazine-style pairing. Very safe and legible; less unique than the others.",
  },
  {
    id: "5",
    name: "Heritage Deco",
    display: { label: "Marcellus", family: marcellus.style.fontFamily },
    body: { label: "Jost", family: jost.style.fontFamily },
    why: "Carved, inscription-like capitals with a Futura-style sans. Nods to heritage and architecture; best set in uppercase.",
  },
  {
    id: "6",
    name: "Bold Boutique",
    display: { label: "Gloock", family: gloock.style.fontFamily },
    body: { label: "Figtree", family: figtree.style.fontFamily },
    why: "Chunky, high-contrast serif with lots of personality and a rounded, friendly sans. Confident, young, memorable.",
  },
  {
    id: "7",
    name: "Soft Luxury",
    display: { label: "Gilda Display", family: gilda.style.fontFamily },
    body: { label: "Plus Jakarta Sans", family: jakarta.style.fontFamily },
    why: "Gentle, airy serif and a modern sans with open shapes. Calm and light — fits the new ivory palette well.",
  },
  {
    id: "0",
    name: "Current site",
    display: { label: "Bodoni Moda", family: bodoni.style.fontFamily, weight: 500 },
    body: { label: "Inter", family: inter.style.fontFamily },
    why: "What's live now, for comparison. Inter is the 'basic' part — it's the default UI font on a huge share of the web.",
    current: true,
  },
];

const SAMPLE = [PRODUCTS[8], PRODUCTS[16]];

function Specimen({ p }: { p: Pairing }) {
  const display = { fontFamily: p.display.family, fontWeight: p.display.weight ?? 400 };
  const body = { fontFamily: p.body.family };
  return (
    <section className={`overflow-hidden rounded-2xl border ${p.current ? "border-dashed border-hairline-strong" : "border-hairline"}`}>
      {/* Label row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-hairline bg-bg-low px-6 py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm text-bg">{p.id}</span>
        <h2 className="text-lg font-semibold">{p.name}</h2>
        <span className="text-sm text-ivory-muted">
          {p.display.label} + {p.body.label}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-10 p-6 md:grid-cols-[1.3fr_1fr] md:p-10">
        {/* Hero mock */}
        <div style={body}>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">New Season · 2026</p>
          <h3 style={display} className="mb-5 text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.02] tracking-tight">
            Indian craft, made for every day.
          </h3>
          <p className="mb-7 max-w-md leading-relaxed text-ivory-muted">
            Handloom sarees, kurtas and lehengas in breathable cottons and silks, finished by artisan
            partners across India.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="btn-primary" style={body}>Shop New In</span>
            <span className="btn-outline" style={body}>Collections</span>
          </div>
          <p className="mt-8 border-l-2 border-gold pl-4 text-sm leading-relaxed text-ivory-muted">{p.why}</p>
        </div>

        {/* Product + specimen */}
        <div style={body} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            {SAMPLE.map((prod) => (
              <div key={prod.id}>
                <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-md bg-bg-elevated">
                  <Image src={prod.images[0]} alt="" fill sizes="200px" className="object-cover" />
                </div>
                <div className="mb-0.5 text-[11px] uppercase tracking-[0.14em] text-ivory-muted">{prod.category}</div>
                <div style={display} className="text-lg leading-tight">{prod.name}</div>
                <div className="text-sm">{formatPrice(prod.price)}</div>
              </div>
            ))}
          </div>
          <div className="flex items-end justify-between gap-4 rounded-xl bg-bg-elevated px-5 py-4">
            <span style={display} className="text-6xl leading-none">Aa</span>
            <span style={body} className="text-right text-sm leading-relaxed text-ivory-muted">
              ABCDEFGHIJKLM
              <br />
              abcdefghijklm 0123456789 ₹
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FontsLab() {
  return (
    <div className="mx-auto max-w-[1240px] px-6 pb-28 pt-12 md:px-10">
      <p className="mb-12 max-w-2xl text-ivory-muted">
        Seven heading + body pairings, each shown on a homepage hero and two product cards, with the
        current fonts at the bottom for comparison. All are free Google Fonts. Pick a number and
        I&apos;ll swap it in site-wide.
      </p>

      <div className="flex flex-col gap-10">
        {PAIRINGS.map((p) => (
          <Specimen key={p.id} p={p} />
        ))}

        {/* Logo script */}
        <section className="rounded-2xl border border-hairline p-6 md:p-10">
          <h2 className="mb-2 text-lg font-semibold">Bonus: the Devanagari logo</h2>
          <p className="mb-8 max-w-xl text-sm text-ivory-muted">
            The header flips between RAAT and रात. Right now the Hindi falls back to a system font. Tiro
            Devanagari Hindi would make both scripts look designed together.
          </p>
          <div className="flex flex-wrap items-center gap-10">
            <span style={{ fontFamily: tiro.style.fontFamily }} className="text-7xl">रात</span>
            <span style={{ fontFamily: tiro.style.fontFamily }} className="text-5xl tracking-[0.25em]">RAAT</span>
            <span style={{ fontFamily: cormorant.style.fontFamily, fontWeight: 500 }} className="text-5xl tracking-[0.25em]">RAAT</span>
          </div>
        </section>
      </div>
    </div>
  );
}
