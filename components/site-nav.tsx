"use client";

import { useEffect, useMemo, useState } from "react";
import { siteSections } from "@/src/data/archyr/thesis";
import { Button } from "@/components/ui/button";

export function SiteNav() {
  const [activeId, setActiveId] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const sections = useMemo(() => siteSections, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.2 },
    );

    sections.forEach((section) => {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[rgba(248,250,252,0.88)] backdrop-blur-xl dark:bg-[rgba(17,25,54,0.9)]">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#home" className="text-sm font-bold tracking-wide">
          ARCHYR · Architecture Playbook
        </a>

        <div className="hidden text-xs text-[var(--muted)] md:block">
          Interview artifact · deterministic architecture brief
        </div>

        <nav className="hidden flex-1 overflow-hidden md:flex md:items-center md:justify-end">
          <div className="inline-flex max-w-full overflow-x-auto pb-1 pt-1 md:space-x-2">
          {sections.map((section) => (
            <a
              href={`#${section.id}`}
              key={section.id}
              aria-current={activeId === section.id ? "true" : "false"}
              className={`inline-flex shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition ${
                activeId === section.id
                  ? "bg-[var(--accent)] border border-[var(--accent)]/70 text-white"
                  : "border border-[var(--line)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)]"
              }`}
            >
              {section.label}
            </a>
          ))} </div>
        </nav>

        <Button
          variant="outline"
          className="md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "Close" : "Menu"}
        </Button>
      </div>

      {mobileOpen ? (
        <nav className="border-t border-[var(--line)] bg-[var(--surface)] px-4 py-3 md:hidden">
          <div className="grid gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                  activeId === section.id
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-muted)]"
                }`}
              >
                {section.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
