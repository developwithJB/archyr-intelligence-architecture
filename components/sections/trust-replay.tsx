"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/section-shell";
import {
  TrustReplayCheck,
  TrustReplayDecision,
  TrustReplayScenarioId,
  TrustReplayViewerId,
  trustReplayPosition,
  trustReplayScenarios,
  trustReplayViewers,
} from "@/src/data/archyr/trustReplay";

const decisionStyles: Record<TrustReplayDecision, { label: string; className: string }> = {
  publish: {
    label: "Publish",
    className: "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/25 dark:text-emerald-200",
  },
  caveat: {
    label: "Caveat",
    className: "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-900/25 dark:text-amber-200",
  },
  route_to_review: {
    label: "Route to review",
    className: "border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-700 dark:bg-blue-900/25 dark:text-blue-200",
  },
  block: {
    label: "Block",
    className: "border-red-300 bg-red-50 text-red-900 dark:border-red-700 dark:bg-red-900/25 dark:text-red-200",
  },
};

const checkStyles: Record<TrustReplayCheck["status"], { label: string; className: string }> = {
  pass: {
    label: "Pass",
    className: "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/25 dark:text-emerald-200",
  },
  warn: {
    label: "Warn",
    className: "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-900/25 dark:text-amber-200",
  },
  fail: {
    label: "Fail",
    className: "border-red-300 bg-red-50 text-red-900 dark:border-red-700 dark:bg-red-900/25 dark:text-red-200",
  },
};

function getViewerSurface(viewerId: TrustReplayViewerId, scenarioId: TrustReplayScenarioId) {
  if (scenarioId === "visible") {
    return "Direct citation is visible with source span, freshness, and confidence.";
  }

  if (scenarioId === "restricted") {
    if (viewerId === "deal-team") {
      return "Deal team can inspect the private artifact and approve sanitized wording.";
    }
    if (viewerId === "investment-partner") {
      return "Partner sees source class, confidence, and review status, but not private email text.";
    }
    return "External surface hides raw evidence and shows only approved derived signal.";
  }

  if (scenarioId === "stale") {
    return "Viewer sees the conflict and a downgraded claim instead of a clean citation.";
  }

  return "Viewer never sees the claim as fact; the system asks for source-backed financial evidence.";
}

export default function TrustReplay() {
  const [scenarioId, setScenarioId] = useState<TrustReplayScenarioId>("unsupported");
  const [viewerId, setViewerId] = useState<TrustReplayViewerId>("investment-partner");

  const scenario = useMemo(
    () => trustReplayScenarios.find((item) => item.id === scenarioId) ?? trustReplayScenarios[0],
    [scenarioId],
  );
  const viewer = useMemo(
    () => trustReplayViewers.find((item) => item.id === viewerId) ?? trustReplayViewers[0],
    [viewerId],
  );
  const decision = decisionStyles[scenario.decision];
  const viewerSurface = getViewerSurface(viewer.id, scenario.id);

  return (
    <SectionShell
      id="trust-replay"
      title="Trust Replay"
      subtitle="A product-shaped simulation of how one AI claim moves through evidence, permissions, evals, and render gates."
    >
      <div className="grid gap-4">
        <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface-muted)] p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--text)]">Signature interaction</p>
              <p className="mt-1 max-w-3xl text-sm leading-7 text-[var(--muted)]">{trustReplayPosition}</p>
            </div>
            <Badge variant="success">Evidence Contract in motion</Badge>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="grid gap-4">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
              <p className="text-sm font-semibold text-[var(--text)]">Replay case</p>
              <div className="mt-3 grid gap-2">
                {trustReplayScenarios.map((item) => (
                  <Button
                    key={item.id}
                    type="button"
                    variant={item.id === scenario.id ? "default" : "outline"}
                    className="justify-start text-left"
                    onClick={() => setScenarioId(item.id)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
              <p className="text-sm font-semibold text-[var(--text)]">Viewer</p>
              <div className="mt-3 grid gap-2">
                {trustReplayViewers.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setViewerId(item.id)}
                    className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                      item.id === viewer.id
                        ? "border-[var(--accent)] bg-[var(--accent-soft)] text-slate-950"
                        : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--accent)]"
                    }`}
                  >
                    <span className={`block font-semibold ${item.id === viewer.id ? "text-slate-950" : "text-[var(--text)]"}`}>
                      {item.label}
                    </span>
                    <span className={`block text-xs ${item.id === viewer.id ? "text-slate-800" : ""}`}>
                      {item.permissionSummary}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">Generated claim</p>
                  <p className="mt-2 text-xl font-semibold leading-8 text-[var(--text)]">{scenario.claim}</p>
                </div>
                <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${decision.className}`}>
                  {decision.label}
                </span>
              </div>

              <div className="mt-4 grid gap-2 md:grid-cols-2">
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Source artifact</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--text)]">{scenario.sourceArtifact}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{scenario.sourceSpan}</p>
                </div>
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Evidence state</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--text)]">{scenario.visibilityState}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{scenario.freshness}</p>
                </div>
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Permission scope</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--text)]">{scenario.permissionScope}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">Viewer: {viewer.label}</p>
                </div>
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Confidence / review</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--text)]">{scenario.confidence}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{scenario.reviewerState}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
                <p className="text-sm font-semibold text-[var(--text)]">Gateway checks</p>
                <div className="mt-3 grid gap-2">
                  {scenario.checks.map((check) => {
                    const style = checkStyles[check.status];
                    return (
                      <div key={check.label} className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-[var(--text)]">{check.label}</p>
                          <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${style.className}`}>
                            {style.label}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{check.detail}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
                <p className="text-sm font-semibold text-[var(--text)]">Render decision</p>
                <div className="mt-3 grid gap-2 text-sm">
                  <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3">
                    <p className="font-semibold text-[var(--text)]">Decision</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{scenario.decisionSummary}</p>
                  </div>
                  <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3">
                    <p className="font-semibold text-[var(--text)]">Viewer surface</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{viewerSurface}</p>
                  </div>
                  <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3">
                    <p className="font-semibold text-[var(--text)]">Memo surface</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{scenario.memoSurface}</p>
                  </div>
                  <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3">
                    <p className="font-semibold text-[var(--text)]">Internal scoring</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{scenario.scoringSurface}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
              <div className="grid gap-3 md:grid-cols-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Trace</p>
                  <p className="mt-1 break-words font-[family-name:var(--font-ibm-mono)] text-xs text-[var(--text)]">{scenario.traceId}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Eval result</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--text)]">{scenario.evalResult}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Failure class</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--text)]">{scenario.failureClass}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Patch lever</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--text)]">{scenario.patchLever}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
