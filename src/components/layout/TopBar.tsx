"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function TopBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        const input = document.getElementById("searchInput") as HTMLInputElement;
        input?.focus();
        setOpen(true);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="fixed top-0 left-0 lg:left-56 right-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-white/8 dark:bg-[#141414]/8 backdrop-blur-xl border-b border-neutral-200/30 dark:border-white/5 px-4">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1 flex-col" ref={ref}>
          <div className="lg:-ml-2 flex items-center w-fit mt-3.5 px-4 py-2 h-10 rounded-xl border border-neutral-300 dark:border-white/5 hover:border-neutral-400 dark:hover:border-neutral-300/10 bg-transparent text-neutral-800 dark:text-white">
            <Search className="h-5 w-5 text-neutral-400 shrink-0" />
            <Input
              id="searchInput"
              className="bg-transparent border-none shadow-none ring-0 focus-visible:ring-0 ml-1 h-auto py-0 text-sm placeholder:text-zinc-500 text-neutral-700 dark:text-neutral-300"
              placeholder="Search"
              type="search"
              name="search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setOpen(true)}
            />
            <div className="ml-2 px-1 py-0.5 text-[10px] w-[55px] font-medium text-neutral-700 dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-800 rounded-md border border-neutral-300 dark:border-neutral-700 shrink-0">
              CTRL + K
            </div>
          </div>

          {open && query && (
            <div className="absolute bg-neutral-50 dark:bg-neutral-900 w-[19.5rem] rounded-xl shadow-2xl shadow-neutral-200/80 dark:shadow-black/40 mt-20 px-2 pb-2 border border-neutral-200 dark:border-neutral-700/60">
              <p className="text-xs text-neutral-400 px-2 py-2">
                No results for &quot;{query}&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
