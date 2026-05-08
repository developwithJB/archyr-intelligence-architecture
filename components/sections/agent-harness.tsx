import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SectionShell } from "@/components/section-shell";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  orchestrationRecommendation,
  orchestrationHighlights,
  orchestrationComparisons,
  coordinationPatterns,
  decisionRules,
  skillStance,
  stackCompatibilityNote,
  subagentFailureContract,
  shellSandboxStance,
  guardrailOwnership,
  workerBudgets,
} from "@/src/data/archyr/orchestration";

export default function AgentHarness() {
  return (
    <SectionShell
      id="agent-harness"
      title="Agent Harness & Orchestration"
      subtitle={orchestrationRecommendation.recommendation}
    >
      <div className="grid gap-3">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] p-3 text-sm text-[var(--muted)]">
          <p className="text-[var(--text)]">
            <span className="font-semibold">Reason:</span> {orchestrationRecommendation.reason}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {orchestrationHighlights.map((card) => (
            <Card key={card.title}>
              <CardContent>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{card.title}</CardTitle>
                  <Badge variant={card.badgeVariant}>{card.badgeLabel}</Badge>
                </div>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{card.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-4 border-[var(--accent)]/30 bg-[var(--surface-muted)]">
        <CardContent>
          <CardTitle>{stackCompatibilityNote.title}</CardTitle>
          <p className="mt-2 text-sm text-[var(--text)]">{stackCompatibilityNote.position}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
            {stackCompatibilityNote.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent>
            <CardTitle>Coordination patterns</CardTitle>
            <ul className="mt-3 space-y-3">
              {coordinationPatterns.length === 0 ? (
                <li className="text-sm text-[var(--muted)]">No coordination patterns configured.</li>
              ) : null}
              {coordinationPatterns.map((pattern) => (
                <li key={pattern.id} className="rounded-xl border border-[var(--line)] p-3">
                  <p className="font-semibold text-[var(--text)]">{pattern.title}</p>
                  <p>{pattern.summary}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{pattern.detail}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <CardTitle>Decision rules</CardTitle>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              {decisionRules.length === 0 ? (
                <li className="text-[var(--muted)]">No decision rules configured.</li>
              ) : null}
              {decisionRules.map((rule) => (
                <li key={rule.type} className="rounded-xl border border-[var(--line)] p-3">
                  <p className="font-semibold text-[var(--text)]">{rule.type}</p>
                  <p>{rule.meaning}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{rule.detail}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 text-sm">
        <p className="text-[var(--text)]">
          <span className="font-semibold">{skillStance.title}:</span> {skillStance.guidance}
        </p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          {skillStance.constraint}
        </p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardContent>
            <CardTitle>Code vs prompt guardrails</CardTitle>
            <div className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              {guardrailOwnership.map((item) => (
                <div key={item.boundary} className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3">
                  <p className="font-semibold text-[var(--text)]">{item.boundary}</p>
                  <p className="mt-1 text-xs">
                    <span className="font-semibold text-[var(--text)]">Code owns:</span> {item.codeOwns}
                  </p>
                  <p className="mt-1 text-xs">
                    <span className="font-semibold text-[var(--text)]">Prompt owns:</span> {item.promptOwns}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <CardTitle>Worker budget table</CardTitle>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left text-xs">
                <thead className="text-[var(--muted)]">
                  <tr>
                    <th className="border-b border-[var(--line)] px-2 py-2 font-semibold">Worker</th>
                    <th className="border-b border-[var(--line)] px-2 py-2 font-semibold">Tool calls</th>
                    <th className="border-b border-[var(--line)] px-2 py-2 font-semibold">Timeout</th>
                    <th className="border-b border-[var(--line)] px-2 py-2 font-semibold">Retries</th>
                    <th className="border-b border-[var(--line)] px-2 py-2 font-semibold">Fallback</th>
                    <th className="border-b border-[var(--line)] px-2 py-2 font-semibold">Failure handling</th>
                  </tr>
                </thead>
                <tbody>
                  {workerBudgets.map((item) => (
                    <tr key={item.workerClass}>
                      <td className="border-b border-[var(--line)] px-2 py-2 font-semibold text-[var(--text)]">{item.workerClass}</td>
                      <td className="border-b border-[var(--line)] px-2 py-2 text-[var(--muted)]">{item.maxToolCalls}</td>
                      <td className="border-b border-[var(--line)] px-2 py-2 text-[var(--muted)]">{item.timeout}</td>
                      <td className="border-b border-[var(--line)] px-2 py-2 text-[var(--muted)]">{item.retryBudget}</td>
                      <td className="border-b border-[var(--line)] px-2 py-2 text-[var(--text)]">{item.fallbackBehavior}</td>
                      <td className="border-b border-[var(--line)] px-2 py-2 text-[var(--muted)]">{item.subagentFailureHandling}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent>
            <CardTitle>{subagentFailureContract.title}</CardTitle>
            <p className="mt-2 text-sm text-[var(--muted)]">{subagentFailureContract.position}</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              {subagentFailureContract.envelope.map((item) => (
                <li key={item.field} className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-2">
                  <span className="font-semibold text-[var(--text)]">{item.field}:</span> {item.purpose}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <CardTitle>Shell sandbox stance</CardTitle>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              {shellSandboxStance.map((item) => (
                <li key={item.control} className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-2">
                  <span className="font-semibold text-[var(--text)]">{item.control}:</span> {item.stance}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-sm font-semibold text-[var(--text)]">Framework comparison</p>
        <Accordion
          items={orchestrationComparisons.map((item) => ({
            id: item.id,
            title: `${item.name} — ${item.verdict}`,
            content: (
              <div className="space-y-3">
                <p>{item.fit}</p>
                <div>
                  <p className="font-semibold text-[var(--text)]">Why it works</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    {item.whyWorks.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-[var(--text)]">Why not as core</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    {item.whyNotAsCore.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ),
            defaultOpen: item.recommended,
          }))}
        />
      </div>
    </SectionShell>
  );
}
