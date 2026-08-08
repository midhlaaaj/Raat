"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      className="relative mx-auto h-[150px] max-w-[760px]"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <p className="font-display mb-4 text-center text-2xl italic leading-snug text-ivory">
            &ldquo;{t.quote}&rdquo;
          </p>
          <cite className="block text-center text-xs not-italic uppercase tracking-[0.05em] text-ivory-muted">
            {t.author}
          </cite>
        </motion.blockquote>
      </AnimatePresence>
    </div>
  );
}
