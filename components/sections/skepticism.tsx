import { SectionShell } from "@/components/section-shell";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  evidenceContractChecklist,
  killSwitches,
  underratedChecks,
  skepticalChecks,
} from "@/src/data/archyr/skepticism";

export default function Skepticism() {
  return (
    <SectionShell id="skepticism" title="Skepticism" subtitle="Hard objections, hard mitigations.">
      <div className="grid gap-3">
        {skepticalChecks.map((check) => (
          <Card key={check.title}>
            <CardContent>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle>{check.title}</CardTitle>
                <Badge variant="warning">Risk gate</Badge>
              </div>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{check.claim}</p>
              <p className="mt-1 text-sm text-[var(--text)]">Why: {check.why}</p>
            </CardContent>
          </Card>
        ))}
        {underratedChecks.map((check) => (
          <Card key={check.title}>
            <CardContent>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle>{check.title}</CardTitle>
                <Badge variant="success">Underrated</Badge>
              </div>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{check.claim}</p>
              <p className="mt-1 text-sm text-[var(--text)]">Why: {check.why}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <CardContent>
          <CardTitle>Evidence contract requirements</CardTitle>
          <ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)]">
            {evidenceContractChecklist.length === 0 ? (
              <li className="text-[var(--text)]">Evidence contract items are not yet defined.</li>
            ) : null}
            {evidenceContractChecklist.map((item) => (
              <li key={item.title}>
                <span className="font-semibold text-[var(--text)]">{item.title}:</span> {item.what}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {killSwitches.map((section) => (
        <Card key={section.title} className="mt-4">
          <CardContent>
            <CardTitle>{section.title}</CardTitle>
            <ul className="mt-2 list-disc pl-5 text-sm text-[var(--muted)]">
              {section.items.length === 0 ? <li>No guardrail items configured.</li> : null}
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </SectionShell>
  );
}
