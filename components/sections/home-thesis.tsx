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
              href="#evaluation-trust"
              className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-sm text-white transition hover:bg-[var(--accent)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              Open eval strategy
            </Link>
            <Link
              href="#data-layer"
              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm transition hover:bg-[var(--surface-muted)]"
            >
              Open evidence contract
            </Link>
            <Link
              href="#workflow-demo"
              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm transition hover:bg-[var(--surface-muted)]"
            >
              Open backend runtime
            </Link>
          </div>
        </div>

        <div className="grid gap-3">
          <Card className="border-[var(--accent)]/20 bg-[var(--surface-muted)]">
            <CardContent>
              <CardTitle className="text-sm">Demo path</CardTitle>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-[var(--muted)]">
                <li>Evaluation strategy</li>
                <li>Trust Replay</li>
                <li>Trust and provenance</li>
                <li>Backend runtime</li>
                <li>Agent guardrails</li>
                <li>Memory loop</li>
                <li>Sources and rubric proof</li>
              </ol>
              <p className="mt-3 text-xs text-[var(--muted)]">
                Built to be challenged in conversation, not read as a static memo.
              </p>
            </CardContent>
          </Card>
          <Card className="border-[var(--accent)]/30 bg-[var(--surface-muted)]">
            <CardContent>
              <CardTitle className="text-sm">Submission focus</CardTitle>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                This final pass emphasizes labeled evals, permission-aware evidence, reliable backend execution, and code-side agent guardrails.
              </p>
            </CardContent>
          </Card>
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
        <Badge
          variant="warning"
          className="border-[var(--line)] bg-[var(--surface-muted)]"
        >
          Final engineering feedback pass: evals, provenance, runtime, guardrails.
        </Badge>
      </div>
    </SectionShell>
  );
}
