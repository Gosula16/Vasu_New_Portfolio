"use client";

import * as React from "react";

export function ScrollProgress() {
  const [p, setP] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const next = height > 0 ? scrollTop / height : 0;
      setP(Math.min(1, Math.max(0, next)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
      aria-hidden
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--neon)] transition-[transform] duration-150 ease-out will-change-transform"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}
