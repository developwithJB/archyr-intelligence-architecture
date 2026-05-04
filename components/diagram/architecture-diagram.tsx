"use client";

import { useMemo, useState } from "react";
import { architectureEdges, architectureNodes } from "@/src/data/archyr/orchestration";

type Filter = "all" | "workflow" | "memory" | "evaluation";

export function ArchitectureDiagram({
  onNodeSelect,
  selectedNodeId,
}: {
  onNodeSelect: (nodeId: string) => void;
  selectedNodeId?: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredNodes = useMemo(() => {
    if (filter === "all") return architectureNodes;
    return architectureNodes.filter((node) => node.category === filter);
  }, [filter]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, (typeof architectureNodes)[number]>();
    architectureNodes.forEach((node) => map.set(node.id, node));
    return map;
  }, []);

  const selectedNode = selectedNodeId ? nodeMap.get(selectedNodeId) : filteredNodes[0];

  return (
    <div className="grid gap-4">
      <div className="grid gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            filter === "all" ? "bg-[var(--accent)] text-white" : "bg-[var(--surface-muted)]"
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setFilter("workflow")}
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            filter === "workflow"
              ? "bg-[var(--accent)] text-white"
              : "bg-[var(--surface-muted)]"
          }`}
        >
          Workflow
        </button>
        <button
          type="button"
          onClick={() => setFilter("memory")}
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            filter === "memory"
              ? "bg-[var(--accent)] text-white"
              : "bg-[var(--surface-muted)]"
          }`}
        >
          Memory
        </button>
      </div>

      <div className="relative h-[520px] rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
        <svg viewBox="0 0 1000 520" className="absolute inset-0 h-full w-full">
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="var(--muted)" />
            </marker>
          </defs>
          {architectureEdges
            .filter((edge) => nodeMap.has(edge.from) && nodeMap.has(edge.to))
            .map((edge) => {
              const fromNode = nodeMap.get(edge.from)!;
              const toNode = nodeMap.get(edge.to)!;
              return (
                <g key={`${edge.from}-${edge.to}`}>
                  <line
                    x1={`${fromNode.x * 10}`}
                    y1={`${fromNode.y * 5.2}`}
                    x2={`${toNode.x * 10}`}
                    y2={`${toNode.y * 5.2}`}
                    stroke="var(--line)"
                    strokeWidth="1.5"
                    markerEnd="url(#arrowhead)"
                  />
                  <text
                    x={`${(fromNode.x + toNode.x) / 2 * 10}`}
                    y={`${(fromNode.y + toNode.y) / 2 * 5.2 - 4}`}
                    fill="var(--muted)"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}
        </svg>

        {filteredNodes.map((node) => {
          const isActive = selectedNodeId === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => onNodeSelect(node.id)}
              onFocus={() => onNodeSelect(node.id)}
              className={`card-focus-ring absolute min-h-16 min-w-24 rounded-xl border px-3 py-2 text-left text-xs transition-all duration-150 md:min-h-20 md:min-w-44 md:text-sm ${
                isActive
                  ? "z-10 border-[var(--accent)] bg-[var(--accent-soft)]"
                  : "border-[var(--line)] bg-[rgba(255,255,255,0.82)]"
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
              aria-label={`Select ${node.title}`}
            >
              <p className="font-semibold text-[var(--text)]">{node.title}</p>
              <p className="mt-1 text-[11px] leading-4 text-[var(--muted)]">{node.summary}</p>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 text-sm text-[var(--muted)]">
        <p className="text-[var(--text)]">
          Focus: <strong>{selectedNode?.title}</strong>
        </p>
        <p className="mt-1">{selectedNode?.summary}</p>
        <p className="mt-1 text-xs">{selectedNode?.contract}</p>
      </div>
    </div>
  );
}
