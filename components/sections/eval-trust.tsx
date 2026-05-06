import { SectionShell } from "@/components/section-shell";
import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  evalTooling,
  trustDimensions,
  evalRoadmap,
  hardAndSoftGates,
  evaluationRecommendation,
  evalIntegrityWarning,
  evalTraps,
  evalDatasets,
  evalEscalationLadder,
  evalOperationalMetrics,
} from "@/src/data/archyr/evaluation";

export default function EvalTrust() {
  return (
    <SectionShell
      id="evaluation-trust"
      title="Evaluation & Trust"
      subtitle="Quality and safety as explicit infrastructure."
    >
      <Card className="mb-4 border-[var(--accent)]/30 bg-[var(--surface-muted)]">
        <CardContent>
          <CardTitle>Trust posture</CardTitle>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Evals are not a sidecar. They are product trust infrastructure.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <CardTitle>Quality contract</CardTitle>
          <p className="mt-1 text-sm text-[var(--muted)]">{evaluationRecommendation.text}</p>
          <Accordion
            items={trustDimensions.map((dimension) => ({
              id: dimension.title,
              title: dimension.title,
              content: (
                <div className="space-y-2 text-sm text-[var(--muted)]">
                  <p>{dimension.question}</p>
                  <p>
                    <strong className="text-[var(--text)]">Target:</strong> {dimension.target}
                  </p>
                  <p>
                    <strong className="text-[var(--text)]">Control:</strong> {dimension.control}
                  </p>
                  <p>
                    <strong className="text-[var(--text)]">Metric:</strong> {dimension.metric}
                  </p>
                </div>
              ),
            }))}
          />
        </CardContent>
      </Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardContent>
            <CardTitle>Eval datasets</CardTitle>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {evalDatasets.map((dataset) => (
                <div key={dataset.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3 text-sm">
                  <p className="font-semibold text-[var(--text)]">{dataset.title}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">Source: {dataset.source}</p>
                  <p className="mt-1 text-xs text-[var(--text)]">{dataset.whyItMatters}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <CardTitle>Escalation ladder</CardTitle>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--muted)]">
              {evalEscalationLadder.map((step) => (
                <li key={step.tactic}>
                  <span className="font-semibold text-[var(--text)]">{step.tactic}:</span>{" "}
                  {step.position}
                  <span className="block text-xs">Use when: {step.useWhen}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardContent>
          <CardTitle>Operational eval metrics</CardTitle>
          <div className="mt-3 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {evalOperationalMetrics.map((metric) => (
              <div key={metric.metric} className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3 text-sm">
                <p className="font-semibold text-[var(--text)]">{metric.metric}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">Target: {metric.target}</p>
                <p className="mt-1 text-xs text-[var(--text)]">{metric.reason}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent>
            <CardTitle>Evaluation roadmap</CardTitle>
            <div className="space-y-3 mt-2">
              {evalRoadmap.length === 0 ? (
                <p className="text-sm text-[var(--muted)]">No roadmap items are configured.</p>
              ) : null}
              {evalRoadmap.map((horizon) => (
                <details
                  key={horizon.horizon}
                  className="rounded-xl border border-[var(--line)] p-3 text-sm text-[var(--muted)]"
                >
                  <summary className="cursor-pointer font-semibold text-[var(--text)]">{horizon.horizon}</summary>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {horizon.scope.map((scope) => (
                      <li key={scope}>{scope}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <CardTitle>Hard and soft gates</CardTitle>
            <div className="mt-2 space-y-2 text-sm">
              {hardAndSoftGates.length === 0 ? (
                <p className="text-sm text-[var(--muted)]">No gate definitions are configured.</p>
              ) : null}
              {hardAndSoftGates.map((gate) => (
                <div
                  key={gate.name}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">{gate.level}</p>
                  <p className="font-semibold text-[var(--text)]">{gate.name}</p>
                  <p className="text-xs text-[var(--muted)]">If: {gate.condition}</p>
                  <p className="text-xs text-[var(--text)]">Impact: {gate.impact}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardContent>
          <CardTitle>Eval integrity</CardTitle>
          <p className="mt-2 text-sm text-[var(--muted)]">{evalIntegrityWarning.body}</p>
          <p className="mt-3 text-xs text-[var(--muted)]">
            Observability stack: <strong className="text-[var(--text)]">{evalTooling.join(" + ")}</strong>
          </p>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent>
          <CardTitle>Evaluation traps to watch</CardTitle>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
            {evalTraps.length === 0 ? (
              <li className="text-[var(--muted)]">No guardrail traps are currently configured.</li>
            ) : null}
            {evalTraps.map((trap) => (
              <li key={trap.title}>
                <span className="font-semibold text-[var(--text)]">{trap.title}:</span> {trap.body}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </SectionShell>
  );
}
