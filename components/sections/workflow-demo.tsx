"use client";

import { useState } from "react";
import { SectionShell } from "@/components/section-shell";
import { Badge } from "@/components/ui/badge";
import { workflowDemoSteps } from "@/src/data/archyr/workflow";

export default function WorkflowDemo() {
  const [active, setActive] = useState(0);
  const current = workflowDemoSteps[active];

  return (
    <SectionShell
      id="workflow-demo"
      title="Workflow Demo"
      subtitle="Interactive simulation of the nine-step diligence run."
    >
      <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-3">
          {workflowDemoSteps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              onClick={() => setActive(index)}
              className={`rounded-xl border px-3 py-2 text-left text-sm ${
                index === active ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--line)]"
              }`}
            >
              <p className="font-semibold text-[var(--text)]">
                Step {step.id}: {step.title}
              </p>
              <p className="text-xs text-[var(--muted)]">{step.summary}</p>
            </button>
          ))}
        </div>

        <div className="grid gap-3">
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <p className="text-xs uppercase tracking-widest text-[var(--accent)]">Step detail</p>
            <p className="mt-2 text-base font-semibold text-[var(--text)]">
              Step {current.id}: {current.title}
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{current.summary}</p>
            <p className="mt-3 text-sm text-[var(--text)]">
              <strong className="text-[var(--text)]">Component:</strong> {current.componentResponsible}
            </p>
            <p className="mt-2 text-sm text-[var(--text)]">
              <strong className="text-[var(--text)]">Model tier:</strong> {current.modelTier}
            </p>
            <p className="mt-2 text-sm text-[var(--text)]">
              <strong className="text-[var(--text)]">Data written:</strong> {current.dataWritten}
            </p>
            <p className="mt-2 text-sm text-[var(--text)]">
              <strong className="text-[var(--text)]">Failure mode:</strong> {current.failureMode}
            </p>
            <p className="mt-2 text-sm text-[var(--text)]">
              <strong className="text-[var(--text)]">Gate type:</strong> {current.gateType}
            </p>
            <p className="mt-3 text-xs text-[var(--text)]">{current.detail}</p>
            <Badge className="mt-4" variant="outline">
              Click steps to inspect the full flow
            </Badge>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
