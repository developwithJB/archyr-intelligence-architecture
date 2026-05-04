import Link from "next/link";
import { coreThesis, finalRecommendation, operatingPrinciples, subtitle, title } from "@/src/data/archyr/thesis";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionShell } from "@/components/section-shell";

export default function HomeThesis() {
  return (
    <SectionShell
      id="home"
      title="Home · Thesis"
      subtitle={"A clickable, evidence-led architecture for VC diligence systems."}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--warning)]">Interview Deliverable</p>
          <h1 className="text-4xl font-semibold leading-tight text-[var(--text)] md:text-5xl">{title}</h1>
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">{subtitle}</p>
          <p className="max-w-2xl text-sm leading-7 text-[var(--text)]">Core thesis: {coreThesis}</p>
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
            <span className="font-semibold text-[var(--text)]">Final recommendation:</span>{" "}
            {finalRecommendation}
          </p>
          <p className="text-sm text-[var(--muted)]">
            This artifact is built for decision confidence, not UI gloss. Every section is interactive and evidence-traceable.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="#architecture-routes"
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm text-white transition hover:brightness-95"
            >
              Open architecture routes
            </Link>
            <Link
              href="#speed-accuracy-cost"
              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm transition hover:bg-[var(--surface-muted)]"
            >
              Open cost model
            </Link>
            <Link
              href="#workflow-demo"
              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm transition hover:bg-[var(--surface-muted)]"
            >
              Run workflow demo
            </Link>
          </div>
        </div>

        <div className="grid gap-3">
          <Card className="border-[var(--accent)]/30">
            <CardContent>
              <CardTitle className="text-base">Engineering posture</CardTitle>
              <ul className="mt-2 space-y-1 text-sm text-[var(--muted)]">
                <li>Deterministic workflow control over model autonomy.</li>
                <li>Evidence contracts at every factual boundary.</li>
                <li>Explicit human gates on critical path writes.</li>
              </ul>
            </CardContent>
          </Card>
          {operatingPrinciples.map((principle) => (
            <Card key={principle}>
              <CardContent>
                <CardTitle className="text-sm">Operating principle</CardTitle>
                <p className="mt-2 text-sm font-semibold text-[var(--text)]">{principle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {finalRecommendation ? (
          <Badge variant="success">Final recommendation defined</Badge>
        ) : null}
      </div>
    </SectionShell>
  );
}
