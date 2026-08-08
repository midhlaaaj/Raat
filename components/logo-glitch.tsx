"use client";

import { useEffect, useRef, useState } from "react";

/** `logo-glitch` motion token: RAAT <-> रात RGB-split flicker, loops on idle. */
export function LogoGlitch({ className }: { className?: string }) {
  const [script, setScript] = useState<"latin" | "devanagari">("latin");
  const [glitching, setGlitching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    function loop() {
      setGlitching(true);
      const flip = setTimeout(() => {
        setGlitching(false);
        setScript((s) => (s === "latin" ? "devanagari" : "latin"));
      }, 150);
      timerRef.current = setTimeout(loop, 900 + Math.random() * 700);
      return flip;
    }
    const initial = setTimeout(loop, 700);
    return () => {
      clearTimeout(initial);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const latinVisible = glitching ? script !== "latin" : script === "latin";
  const devVisible = glitching ? script === "latin" : script !== "latin";

  return (
    <span
      className={`relative inline-block h-[50px] w-[210px] overflow-hidden ${className ?? ""}`}
      aria-label="RAAT"
    >
      <span
        className="font-accent absolute inset-0 text-[2.3rem] tracking-[0.12em] text-ivory transition-opacity duration-100"
        style={{
          opacity: latinVisible ? 1 : 0,
          transform: glitching ? "translate(-3px, 1px)" : "none",
          filter: glitching
            ? "drop-shadow(2px 0 #A85E7E) drop-shadow(-2px 0 #D28F60)"
            : "none",
        }}
      >
        RAAT
      </span>
      <span
        className="font-accent absolute inset-0 text-[2.3rem] tracking-[0.08em] text-ivory transition-opacity duration-100"
        style={{
          opacity: devVisible ? 1 : 0,
          transform: glitching ? "translate(2px, -1px)" : "none",
        }}
      >
        रात
      </span>
    </span>
  );
}
