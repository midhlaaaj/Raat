"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export function TestimonialsRotator() {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <div
      className="mx-auto flex max-w-3xl flex-col items-center text-center"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <Quote size={36} strokeWidth={1.25} className="mb-6 text-gold" aria-hidden />
      <div className="relative h-[200px] w-full md:h-[170px]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <p className="font-display text-[1.5rem] italic leading-snug md:text-[2rem]">
              &ldquo;{t.quote}&rdquo;
            </p>
            <cite className="label-ui mt-5 block not-italic text-ivory-muted">{t.author}</cite>
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <div className="mb-2 mt-4 flex gap-1 text-gold" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <span className="label-ui text-ivory-muted">Based on 200+ Reviews</span>
    </div>
  );
}
