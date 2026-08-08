"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import { CATEGORIES, CATEGORY_IMAGES } from "@/lib/data";
import { Reveal } from "@/components/reveal";

/** Pinned horizontal-scroll category strip, driven by vertical scroll progress. */
export function CategoryScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    <section ref={containerRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <Reveal className="mx-auto mb-10 w-full max-w-[1440px] px-6 md:px-10">
          <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)]">Shop by Category</h2>
        </Reveal>
        <motion.div ref={trackRef} className="flex gap-5 px-6 md:px-10" style={{ x }}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/shop?category=${encodeURIComponent(cat)}`}
              className="relative flex aspect-[16/10] w-[320px] flex-shrink-0 items-end bg-bg-elevated p-5"
            >
              <Image
                src={CATEGORY_IMAGES[cat]}
                alt={cat}
                fill
                sizes="320px"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(0deg, rgba(54,42,36,0.75) 0%, rgba(54,42,36,0) 60%)",
                }}
              />
              <span className="font-display relative z-10 text-lg text-white">{cat}</span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
