import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SectionShell } from "@/components/section-shell";
import { Badge } from "@/components/ui/badge";
import {
  memoryLayers,
  memorySignals,
  memoryLoop,
  memoryRecommendation,
  temporalExample,
  whatArchyrRemembers,
  memoryPolicies,
  memoryLandscape,
  dealEvolutionPosition,
  dealEvolutionTimeline,
} from "@/src/data/archyr/memory";

export default function MemoryLearning() {
  return (
    <SectionShell
      id="memory"
      title="Memory & Self-Learning"
      subtitle="Use temporal, source-backed memory with explicit review gates and eval governance."
    >
      <div className="mb-4 rounded-xl border border-dashed border-[var(--line)] bg-[var(--surface-muted)] p-3 text-sm text-[var(--muted)]">
        <p className="font-semibold text-[var(--text)]">{memoryRecommendation}</p>
        <p className="mt-1">
          What Archyr remembers:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {whatArchyrRemembers.length === 0 ? <li className="text-[var(--muted)]">No memory entries yet.</li> : null}
          {whatArchyrRemembers.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {memoryLayers.length === 0 ? (
          <Card className="border-dashed">
            <CardContent>
              <p className="text-sm text-[var(--muted)]">No memory layers configured.</p>
            </CardContent>
          </Card>
        ) : null}
        {memoryLayers.map((memory) => (
          <Card key={memory.title}>
            <CardContent>
              <CardTitle>{memory.title}</CardTitle>
              <p className="mt-2 text-sm text-[var(--muted)]">{memory.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <CardContent>
          <CardTitle>Temporal claim card</CardTitle>
          <p className="mt-2 text-sm text-[var(--text)]">{temporalExample.note}</p>
          <ul className="mt-2 grid gap-2 text-sm text-[var(--muted)] md:grid-cols-2">
            {temporalExample.fields.length === 0 ? (
              <li className="rounded-md border border-[var(--line)] p-2 text-[var(--muted)]">No temporal fields configured.</li>
            ) : null}
            {temporalExample.fields.map((field) => (
              <li key={field.name} className="rounded-md border border-[var(--line)] bg-[var(--surface-muted)] p-2">
                <p className="font-semibold text-[var(--text)]">{field.name}</p>
                <p className="text-xs">{field.reason}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent>
          <CardTitle>Deal evolution timeline</CardTitle>
          <p className="mt-2 text-sm leading-7 text-[var(--text)]">{dealEvolutionPosition}</p>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {dealEvolutionTimeline.map((item) => (
              <div key={item.moment} className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3 text-sm">
                <p className="font-semibold text-[var(--text)]">{item.moment}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{item.event}</p>
                <p className="mt-1 text-xs text-[var(--text)]">System read: {item.systemRead}</p>
                <p className="mt-1 text-xs text-[var(--text)]">Decision impact: {item.decisionImpact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent>
          <CardTitle>Memory loop</CardTitle>
          <div className="mt-2 grid gap-2 text-sm text-[var(--muted)] md:grid-cols-2">
            {memoryLoop.length === 0 ? (
              <p className="col-span-full rounded-xl border border-[var(--line)] p-3 text-[var(--muted)]">
                No memory loop steps are configured.
              </p>
            ) : null}
            {memoryLoop.map((step, index) => (
              <div key={step.id} className="rounded-xl border border-[var(--line)] p-2">
                <p className="text-xs font-semibold text-[var(--text)]">Step {index + 1}: {step.title}</p>
                <p className="mt-1 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent>
          <CardTitle>Memory landscape</CardTitle>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {memoryLandscape.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">No memory landscape entries are configured.</p>
            ) : null}
            {memoryLandscape.map((entry) => (
              <div key={entry.technology} className="rounded-xl border border-[var(--line)] p-2 text-sm text-[var(--muted)]">
                <p className="font-semibold text-[var(--text)]">{entry.technology}</p>
                <p>{entry.contribution}</p>
                <p className="mt-1">
                  <span className="font-semibold text-[var(--text)]">{entry.stance}:</span> {entry.why}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent>
          <CardTitle>Signals and cadence</CardTitle>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            {memorySignals.length === 0 ? <li className="rounded-xl border border-[var(--line)] p-2">No signals configured.</li> : null}
            {memorySignals.map((signal) => (
              <li key={signal.id} className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-2">
                <p className="font-semibold text-[var(--text)]">{signal.item}</p>
                <p>{signal.action}</p>
                <p className="mt-1 text-xs">Cadence: {signal.cadence}</p>
                <p className="text-xs">Updates: {signal.updates}</p>
                <p className="text-xs">Approver: {signal.approver}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-[var(--text)]">Adoption vs rejection</p>
            <Badge variant="outline">Policy guardrails</Badge>
          </div>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {memoryPolicies.length === 0 ? (
              <p className="col-span-full text-sm text-[var(--muted)]">No adoption policy lines are configured.</p>
            ) : null}
            {memoryPolicies.map((policy) => (
              <div
                key={policy.title}
                className={`rounded-lg border border-[var(--line)] p-2 ${
                  policy.policy === "Adopt" ? "bg-emerald-50" : "bg-amber-50"
                }`}
              >
                <p className={`text-sm font-semibold ${policy.policy === "Adopt" ? "text-emerald-900" : "text-amber-900"}`}>
                  {policy.policy}
                </p>
                <p className={`text-sm ${policy.policy === "Adopt" ? "text-emerald-900" : "text-amber-900"}`}>
                  {policy.title}
                </p>
                <p className="text-xs text-[var(--muted)]">{policy.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </SectionShell>
  );
}
