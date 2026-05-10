"use client";

import * as React from "react";

export function CursorGlow() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX;
        const y = e.clientY;
        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] hidden md:block"
      style={
        {
          ["--x" as never]: "50vw",
          ["--y" as never]: "40vh",
        } as React.CSSProperties
      }
    >
      <div
        className="absolute h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-3xl dark:opacity-35"
        style={{
          left: "var(--x)",
          top: "var(--y)",
          background:
            "radial-gradient(circle at center, color-mix(in oklab, var(--accent) 55%, transparent), transparent 62%)",
        }}
      />
    </div>
  );
}
