"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "cmdk";
import { ArrowRight, Search } from "lucide-react";
import { navItems } from "@/lib/nav";

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-[55] hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--glass)] px-4 py-2 text-xs font-semibold text-[var(--muted)] backdrop-blur shadow-[0_18px_70px_rgba(0,0,0,0.25)] transition-colors hover:text-[var(--fg)] md:inline-flex"
      >
        <Search className="h-4 w-4 text-[var(--neon)]" />
        Command
        <kbd className="rounded-md border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] px-2 py-0.5 font-mono text-[10px] text-[var(--fg)]">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="glass-strong overflow-hidden rounded-3xl border border-[var(--border)] shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
          <CommandInput
            placeholder="Jump to a page…"
            className="border-b border-[var(--border)] bg-transparent px-4 py-4 text-[var(--fg)] outline-none"
          />
          <CommandList className="max-h-[320px]">
            <CommandEmpty className="px-4 py-6 text-sm text-[var(--muted)]">
              No matches.
            </CommandEmpty>
            <CommandGroup heading="Navigate" className="p-2">
              {navItems.map((item) => (
                <CommandItem
                  key={item.href}
                  value={`${item.label} ${item.href}`}
                  className="flex cursor-pointer items-center justify-between rounded-2xl px-3 py-3 text-sm text-[var(--fg)] aria-selected:bg-[color-mix(in_oklab,var(--accent)_14%,transparent)]"
                  onSelect={() => {
                    router.push(item.href);
                    setOpen(false);
                  }}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-[var(--muted)]" />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator className="bg-[var(--border)]" />
            <CommandGroup heading="Shortcuts" className="p-2">
              <CommandItem className="rounded-2xl px-3 py-3 text-xs text-[var(--muted)]">
                Toggle theme via the switch in the navbar.
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
}
