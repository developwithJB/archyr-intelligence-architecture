import { SectionShell } from "@/components/section-shell";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CostCalculator } from "@/components/widgets/cost-calculator";
import {
  costRecommendation,
  modelRouting,
  workflowTargets,
  extendedThinkingPolicy,
  costControls,
  fineTunePolicy,
} from "@/src/data/archyr/cost";

export default function SpeedAccuracyCost() {
  return (
    <SectionShell
      id="speed-accuracy-cost"
      title="Speed, Accuracy & Cost"
      subtitle="Tune reliability versus runway and run-time without changing foundations."
    >
      <Card>
        <CardContent>
          <CardTitle>Cost calculator</CardTitle>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Use workflow type, page/artifact volume, depth, and model tier to estimate latency and budget envelopes for your pipeline.
          </p>
          <div className="mt-4">
            <CostCalculator />
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
        <CardContent>
          <CardTitle>Recommendation</CardTitle>
          <p className="mt-2 text-sm text-[var(--muted)]">{costRecommendation.recommendation}</p>
          <div className="mt-3 space-y-2">
            {modelRouting.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">No model routing recommendations configured.</p>
            ) : null}
              {modelRouting.map((route) => (
                <div
                  key={route.modelClass}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3"
                >
                <p className="font-semibold text-[var(--text)]">{route.modelClass}</p>
                <p className="text-xs text-[var(--muted)]">Use for: {route.useFor.join(", ")}</p>
                  <p className="text-xs text-[var(--muted)]">Strengths: {route.strengths.join(", ")}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3 text-sm text-[var(--muted)]">
              <p className="font-semibold text-[var(--text)]">Fine-tune policy</p>
              <p>{fineTunePolicy.whenToUse}</p>
              <p className="mt-1">{fineTunePolicy.whyNotDefault}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <CardTitle>Cost and budget controls</CardTitle>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
              {costControls.length === 0 ? (
                <li>No cost control settings are currently defined.</li>
              ) : null}
              {costControls.map((control) => (
                <li key={control.name}>
                  <span className="font-semibold text-[var(--text)]">{control.name}:</span> {control.description}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <CardContent>
            <CardTitle>Workflow targets and routing context</CardTitle>
            <div className="mt-2 space-y-3">
              {workflowTargets.length === 0 ? (
                <p className="text-sm text-[var(--muted)]">No workflow targets are configured yet.</p>
              ) : null}
              {workflowTargets.map((target) => (
                <div key={target.id} className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3">
                  <p className="font-semibold text-[var(--text)]">{target.title}</p>
                  <p className="text-xs text-[var(--muted)]">Latency target: {target.targetLatency}</p>
                  <p className="text-xs text-[var(--muted)]">Cost envelope: {target.costEnvelope}</p>
                  <p className="text-xs text-[var(--muted)]">Model route: {target.modelRoute}</p>
                  <p className="text-xs text-[var(--muted)]">Route detail: {target.routeDetail}</p>
                  <p className="text-xs text-[var(--muted)]">Extended thinking: {target.extendedThinking}</p>
                  <p className="text-xs text-[var(--muted)]">Prompt caching: {target.promptCaching}</p>
                  <p className="text-xs text-[var(--muted)]">Stack: {target.stack.join(" + ")}</p>
                  <p className="text-xs text-[var(--muted)]">Blast controls: {target.blastRadiusControls.join(", ")}</p>
                  {target.notes ? (
                    <p className="mt-1 text-[11px] text-[var(--text)]">{target.notes.join(" ")}</p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-3">
              <p className="font-semibold text-[var(--text)]">Extended thinking</p>
            <div className="mt-1 text-sm text-[var(--muted)]">
                <p>Worth it for: <span className="text-[var(--text)]">{extendedThinkingPolicy.useFor.join("; ")}</span></p>
                <p>Not worth it for: <span className="text-[var(--text)]">{extendedThinkingPolicy.avoidFor.join("; ")}</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionShell>
  );
}
