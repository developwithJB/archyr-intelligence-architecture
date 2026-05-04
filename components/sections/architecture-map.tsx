"use client";

import { useMemo, useState } from "react";
import { SectionShell } from "@/components/section-shell";
import { architectureMapEdges, architectureMapNodes } from "@/src/data/archyr/architectureMap";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mobileArrow = "↓";
const desktopArrow = "→";

export default function ArchitectureMap() {
  const [activeNodeId, setActiveNodeId] = useState(architectureMapNodes[0]?.id ?? "inputs");

  const activeNode = useMemo(
    () => architectureMapNodes.find((node) => node.id === activeNodeId) ?? architectureMapNodes[0],
    [activeNodeId],
  );

  const pathLines = useMemo(
    () =>
      architectureMapEdges.length === 0
        ? ["No edges configured for this architecture map."]
        : architectureMapEdges.map((edge) => {
            const fromLabel =
              architectureMapNodes.find((node) => node.id === edge.from)?.title ?? edge.from;
            const toLabel = architectureMapNodes.find((node) => node.id === edge.to)?.title ?? edge.to;
            return `${fromLabel} → ${toLabel}`;
          }),
    [],
  );

  return (
    <SectionShell
      id="architecture-map"
      title="Architecture Map"
      subtitle="Interactive flow from input to governance, tuned for bounded, auditable diligence workflows."
    >
      <Card className="mb-4 border-[var(--accent)]/30 bg-[var(--surface-muted)]">
        <CardContent>
          <CardTitle>Decoupling note</CardTitle>
          <p className="mt-2 text-sm text-[var(--muted)]">
            The KnowledgeGateway is the key decoupling layer. Agents ask business-level questions. The gateway owns storage
            shape, permissions, retrieval strategy, freshness, and provenance.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <Card>
          <CardContent>
            <CardTitle>Flow</CardTitle>
            <p className="mt-2 text-xs text-[var(--muted)]">Click a node to open its detail panel.</p>

            {architectureMapNodes.length === 0 ? (
              <p className="mt-3 text-sm text-[var(--muted)]">No flow nodes are defined for this map yet.</p>
            ) : null}

            {architectureMapNodes.length > 0 ? (
              <>
                <div className="mt-3 hidden md:block">
                  <div className="overflow-x-auto py-2">
                    <div className="flex min-w-[820px] items-center gap-2">
                      {architectureMapNodes.map((node, index) => (
                        <div key={node.id} className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveNodeId(node.id)}
                            className={`min-w-40 rounded-xl border p-3 text-left transition ${
                              activeNodeId === node.id
                                ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                                : "border-[var(--line)] bg-[var(--surface-muted)]"
                            }`}
                          >
                            <p className="text-xs font-semibold text-[var(--text)]">{node.title}</p>
                          </button>
                          {index < architectureMapNodes.length - 1 ? (
                            <span className="text-2xl text-[var(--accent)]" aria-hidden="true">
                              {desktopArrow}
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid gap-2 md:hidden">
                  {architectureMapNodes.map((node, index) => (
                    <div key={node.id}>
                      <button
                        type="button"
                        onClick={() => setActiveNodeId(node.id)}
                        className={`w-full rounded-xl border p-3 text-left transition ${
                          activeNodeId === node.id
                            ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                            : "border-[var(--line)] bg-[var(--surface-muted)]"
                        }`}
                      >
                        <p className="text-xs font-semibold text-[var(--text)]">{node.title}</p>
                      </button>
                      {index < architectureMapNodes.length - 1 ? (
                        <p className="mx-auto my-1 text-center text-xl text-[var(--accent)]">{mobileArrow}</p>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3 text-xs text-[var(--muted)]">
                  <p className="font-semibold text-[var(--text)]">Current path</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {pathLines.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>Node detail</CardTitle>
              <Badge variant="outline">{activeNode ? "active" : "empty"}</Badge>
            </div>
            {!activeNode ? (
              <p className="mt-2 text-sm text-[var(--muted)]">Select a node to inspect its decision context.</p>
            ) : (
              <div className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-2">
                  <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Purpose</p>
                  <p className="mt-1 text-[var(--text)]">{activeNode.purpose}</p>
                </div>
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-2">
                  <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Why it exists</p>
                  <p className="mt-1 text-[var(--text)]">{activeNode.whyExists}</p>
                </div>
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-2">
                  <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Failure mode</p>
                  <p className="mt-1 text-[var(--text)]">{activeNode.failureMode}</p>
                </div>
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-2">
                  <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Alternative rejected</p>
                  <p className="mt-1 text-[var(--text)]">{activeNode.alternativeRejected}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SectionShell>
  );
}
