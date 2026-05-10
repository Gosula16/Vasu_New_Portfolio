import * as React from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  className,
  strong,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { strong?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-3xl",
        strong ? "glass-strong" : "glass",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
