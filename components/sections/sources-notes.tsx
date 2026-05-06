"use client";

import { useMemo, useState } from "react";
import { SectionShell } from "@/components/section-shell";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BuildNote,
  DecisionArea,
  SourceCategory,
  buildNotes,
  decisionAreas,
  rubricCoverage,
  sourceCategories,
  sourceItems,
} from "@/src/data/archyr/sources";

type SourceTypeFilter = "all" | SourceCategory;
type DecisionAreaFilter = "all" | DecisionArea;

export default function SourcesNotes() {
  const [selectedCategory, setSelectedCategory] = useState<SourceTypeFilter>("all");
  const [selectedDecisionArea, setSelectedDecisionArea] = useState<DecisionAreaFilter>("all");

  const filteredSources = useMemo(
    () =>
      sourceItems.filter((item) => {
        const categoryMatches = selectedCategory === "all" || item.category === selectedCategory;
        const areaMatches = selectedDecisionArea === "all" || item.decisionArea === selectedDecisionArea;
        return categoryMatches && areaMatches;
      }),
    [selectedCategory, selectedDecisionArea],
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<SourceCategory, number> = {
      primary: 0,
      reference: 0,
      pattern: 0,
      pricing: 0,
      paper: 0,
    };
    for (const item of sourceItems) counts[item.category]++;
    return counts;
  }, []);

  const decisionAreaCounts = useMemo(() => {
    const counts = Object.fromEntries(decisionAreas.map((area) => [area, 0])) as Record<DecisionArea, number>;
    for (const item of sourceItems) counts[item.decisionArea]++;
    return counts;
  }, []);

  return (
    <SectionShell
      id="sources"
      title="Sources / Build Notes"
      subtitle="Citation matrix, rubric coverage, and build transparency behind the architecture."
    >
      <div className="grid gap-5">
        <Card className="border-[var(--accent)]/30 bg-[var(--surface-muted)]">
          <CardContent>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle>Submission readiness</CardTitle>
              <Badge variant="success">Rubric mapped</Badge>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {rubricCoverage.map((item) => (
                <div key={item.dimension} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-[var(--text)]">{item.dimension}</p>
                    <Badge variant="outline">{item.weight}</Badge>
                  </div>
                  <p className="mt-2 text-xs text-[var(--muted)]">{item.evidence}</p>
                  <p className="mt-2 text-xs text-[var(--text)]">{item.whyItScores}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle>Citation matrix</CardTitle>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Each source is tied to a decision area, the claim it supports, and the stance taken in the artifact.
                </p>
              </div>
              <Badge variant="outline">{sourceItems.length} sources</Badge>
            </div>

            <div className="mt-4 grid gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">Decision area</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(["all", ...decisionAreas] as const).map((entry) => (
                    <button
                      key={entry}
                      type="button"
                      className={`rounded-full border px-3 py-1 text-xs ${
                        selectedDecisionArea === entry
                          ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] shadow-sm"
                          : "border-[var(--line)] text-[var(--muted)]"
                      }`}
                      onClick={() => setSelectedDecisionArea(entry)}
                    >
                      {entry === "all" ? `All (${sourceItems.length})` : `${entry} (${decisionAreaCounts[entry]})`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">Source type</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(["all", ...sourceCategories] as const).map((entry) => (
                    <button
                      key={entry}
                      type="button"
                      className={`rounded-full border px-3 py-1 text-xs ${
                        selectedCategory === entry
                          ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] shadow-sm"
                          : "border-[var(--line)] text-[var(--muted)]"
                      }`}
                      onClick={() => setSelectedCategory(entry)}
                    >
                      {entry === "all" ? `All (${sourceItems.length})` : `${entry} (${categoryCounts[entry]})`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              {filteredSources.length === 0 ? (
                <p className="rounded-xl border border-dashed border-[var(--line)] p-3 text-sm text-[var(--muted)]">
                  No source cards match these filters.
                </p>
              ) : null}
              {filteredSources.map((item) => (
                <div key={`${item.title}-${item.decisionArea}-${item.claim}`} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text)]">{item.title}</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">{item.claim}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="success">{item.decisionArea}</Badge>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2 md:grid-cols-3">
                    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2">
                      <p className="text-[11px] uppercase tracking-wide text-[var(--muted)]">Stance</p>
                      <p className="text-xs font-semibold text-[var(--text)]">{item.stance}</p>
                    </div>
                    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2">
                      <p className="text-[11px] uppercase tracking-wide text-[var(--muted)]">Source quality</p>
                      <p className="text-xs font-semibold text-[var(--text)]">{item.sourceQuality}</p>
                    </div>
                    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2">
                      <p className="text-[11px] uppercase tracking-wide text-[var(--muted)]">Why it matters</p>
                      <p className="text-xs text-[var(--text)]">{item.note}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {item.tags?.map((tag) => (
                      <span
                        key={`${item.title}-${tag}`}
                        className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[var(--muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.sourceDate ? <span className="text-xs text-[var(--muted)]">{item.sourceDate}</span> : null}
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-[var(--accent)] underline"
                      >
                        Open source
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-3 md:grid-cols-2">
          {buildNotes.map((note: BuildNote) => (
            <Card key={note.section}>
              <CardContent>
                <CardTitle>{note.section}</CardTitle>
                {note.note ? <p className="mt-2 text-sm text-[var(--muted)]">{note.note}</p> : null}
                {note.items ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                    {note.items.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
