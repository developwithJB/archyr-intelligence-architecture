import { ReactNode } from "react";

export function SectionShell({
  id,
  title,
  subtitle,
  cta,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  cta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 md:py-12">
        <div className="grid gap-2 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
              {id.replace(/-/g, " ")}
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-[var(--text)] md:text-4xl">{title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--muted)] md:text-base">{subtitle}</p>
          </div>
          {cta ? <div className="justify-self-start md:justify-self-end">{cta}</div> : null}
        </div>
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)]/85 p-4 shadow-sm backdrop-blur-sm md:p-6">
          {children}
        </div>
      </div>
    </section>
  );
}
