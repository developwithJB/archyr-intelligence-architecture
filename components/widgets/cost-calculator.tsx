"use client";

import { useMemo, useState } from "react";
import {
  WorkflowType,
  WorkflowDepth,
  ModelTier,
  costCalculatorDefault,
  costFlowProfiles,
  depthFactors,
  estimateRunCost,
} from "@/src/data/archyr/cost";

const sliderClass = "w-full appearance-none rounded bg-[var(--line)] h-1";

const modelTierLabel: Record<ModelTier, string> = {
  cheap: "Cheap",
  standard: "Standard",
  premium: "Premium",
};

export function CostCalculator() {
  const [workflowType, setWorkflowType] = useState<WorkflowType>(costCalculatorDefault.workflowType);
  const [artifacts, setArtifacts] = useState<number>(costCalculatorDefault.artifacts);
  const [depth, setDepth] = useState<WorkflowDepth>(costCalculatorDefault.depth);
  const [modelTier, setModelTier] = useState<ModelTier>(costCalculatorDefault.modelTier);

  const metrics = useMemo(
    () =>
      estimateRunCost({
        workflowType,
        artifacts,
        depth,
        modelTier,
      }),
    [artifacts, depth, modelTier, workflowType],
  );

  const activeWorkflow = costFlowProfiles.find((item) => item.workflowType === workflowType);

  const currency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value * 42);

  return (
    <div className="grid gap-4">
      <p className="text-xs text-[var(--muted)]">
        Estimate outputs are budget envelopes only (directional, non-final planning bands), not exact billing.
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-xs text-[var(--muted)]">
          Workflow type
          <span className="ml-2 text-[11px] text-[var(--accent)]">(required)</span>
          <select
            value={workflowType}
            onChange={(event) => setWorkflowType(event.target.value as WorkflowType)}
            className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2 text-sm text-[var(--text)]"
          >
            {costFlowProfiles.map((item) => (
              <option key={item.workflowType} value={item.workflowType}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs text-[var(--muted)]">
          Number of pages / artifacts
          <input
            type="range"
            value={artifacts}
            min={1}
            max={300}
            onChange={(event) => setArtifacts(Number(event.target.value))}
            className={sliderClass}
          />
          <div className="mt-1 flex items-center justify-between">
            <span className="font-mono text-sm text-[var(--text)]">{artifacts}</span>
            <span className="text-[11px] text-[var(--muted)]">range: 1–300</span>
          </div>
        </label>
        <label className="text-xs text-[var(--muted)]">
          Depth
          <div className="mt-2 flex flex-wrap gap-2">
            {Object.entries(depthFactors).map(([depthKey, depthInfo]) => {
              const key = depthKey as WorkflowDepth;
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => setDepth(key)}
                  className={`rounded-full px-3 py-1 text-xs ${
                    depth === key
                      ? "border border-[var(--accent)] bg-[var(--accent-soft)]"
                      : "border border-[var(--line)]"
                  }`}
                >
                  {depthInfo.label}
                </button>
              );
            })}
          </div>
        </label>
        <label className="text-xs text-[var(--muted)]">
          Model tier
          <div className="mt-2 flex flex-wrap gap-2">
            {(Object.keys(modelTierLabel) as ModelTier[]).map((tier) => (
              <button
                type="button"
                key={tier}
                onClick={() => setModelTier(tier)}
                className={`rounded-full px-3 py-1 text-xs ${
                  modelTier === tier
                    ? "border border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border border-[var(--line)]"
                }`}
              >
                {modelTierLabel[tier]}
              </button>
            ))}
          </div>
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
          <p className="text-xs uppercase tracking-widest text-[var(--accent)]">Outputs</p>
          <p className="mt-2 text-sm text-[var(--muted)]">Estimated latency</p>
          <p className="text-lg font-semibold text-[var(--text)]">{metrics.latencyBand}</p>
          <p className="text-xs text-[var(--muted)]">Range band for typical variance.</p>
          <p className="mt-3 text-sm text-[var(--muted)]">Estimated budget envelope</p>
          <p className="text-lg font-semibold text-[var(--text)]">
            {currency(metrics.budgetLow)} - {currency(metrics.budgetHigh)}
          </p>
        </div>

        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
          <p className="text-xs uppercase tracking-widest text-[var(--accent)]">Modeling controls</p>
          <p className="mt-2 text-sm text-[var(--muted)]">Recommended model class</p>
          <p className="text-lg font-semibold text-[var(--text)]">{metrics.recommendedModelClass}</p>
          <p className="mt-3 text-sm text-[var(--muted)]">Accuracy posture</p>
          <p className="text-sm text-[var(--text)]">{metrics.accuracyPosture}</p>
        </div>
      </div>

      <div className="grid gap-3">
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
          <p className="text-xs uppercase tracking-widest text-[var(--accent)]">Blast-radius controls</p>
          <p className="mt-2 text-sm text-[var(--text)]">
            {activeWorkflow?.label} with {modelTierLabel[modelTier]} {depth} mode
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-[var(--muted)]">
            {metrics.blastRadiusControls.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-[var(--text)]">{metrics.note}</p>
          <p className="mt-2 text-xs text-[var(--muted)]">
            {activeWorkflow?.baseDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
