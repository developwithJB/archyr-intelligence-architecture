import * as React from "react";

type AccordionItemConfig = {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
};

export function Accordion({
  items,
  className = "",
}: {
  items: AccordionItemConfig[];
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <details
          key={item.id}
          className="group rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4"
          open={item.defaultOpen}
        >
          <summary className="cursor-pointer select-none list-none text-sm font-semibold leading-6 text-[var(--text)] md:text-base">
            <span className="inline-flex w-full items-center justify-between gap-2">
              {item.title}
              <span
                className="inline-grid size-6 min-w-6 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-all group-open:rotate-45 group-open:border-[var(--accent)] group-open:text-[var(--accent)]"
                aria-hidden="true"
              >
                <span className="text-xs font-mono leading-none">+</span>
              </span>
            </span>
          </summary>
          <div className="mt-3 border-t border-[var(--line)] pt-3 text-sm leading-7 text-[var(--muted)]">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
}
