"use client";

import { useMemo, useState } from "react";
import { SectionShell } from "@/components/section-shell";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BuildNote, SourceItem, buildNotes, sourceItems } from "@/src/data/archyr/sources";

export default function SourcesNotes() {
  const [editableSources, setEditableSources] = useState<SourceItem[]>(sourceItems);
  const [selectedCategory, setSelectedCategory] = useState<"all" | SourceItem["category"]>("all");

  const filteredSources =
    selectedCategory === "all"
      ? editableSources
      : editableSources.filter((item) => item.category === selectedCategory);

  const categoryCounts = useMemo(() => {
    const counts = { primary: 0, reference: 0, pattern: 0 };
    for (const item of editableSources) {
      counts[item.category]++;
    }
    return counts;
  }, [editableSources]);

  const updateSource = <K extends keyof SourceItem>(index: number, key: K, value: SourceItem[K]) => {
    setEditableSources((prev) =>
      prev.map((source, sourceIndex) => (sourceIndex === index ? { ...source, [key]: value } : source)),
    );
  };

  return (
    <SectionShell
      id="sources"
      title="Sources / Build Notes"
      subtitle="Assumptions, constraints, and references used to shape this design."
    >
      <div className="grid gap-4">
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
          <p className="text-xs uppercase tracking-widest text-[var(--accent)]">Sources</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Editable source cards. Edits are local to this session view.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["all", "primary", "reference", "pattern"] as const).map((entry) => (
              <button
                key={entry}
                type="button"
                className={`rounded-full border px-3 py-1 text-xs ${
                  selectedCategory === entry
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "border-[var(--line)]"
                }`}
                onClick={() => setSelectedCategory(entry as "all" | SourceItem["category"])}
              >
                {entry === "all"
                  ? `All (${editableSources.length})`
                  : `${entry} (${categoryCounts[entry]})`}
              </button>
            ))}
          </div>

          <div className="mt-3 grid gap-3">
            {filteredSources.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">No source cards match this filter.</p>
            ) : null}
            {filteredSources.map((item) => {
              const sourceIndex = editableSources.indexOf(item);
              return (
                <Card key={`${item.title}-${sourceIndex}`}>
                  <CardContent>
                    <CardTitle>Editable source card</CardTitle>
                    <div className="mt-3 space-y-2 text-sm">
                      <label className="grid gap-1">
                        <span className="text-xs text-[var(--muted)]">Title</span>
                        <input
                          className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2 text-sm text-[var(--text)]"
                          value={item.title}
                          onChange={(event) => updateSource(sourceIndex, "title", event.target.value)}
                        />
                      </label>
                      <label className="grid gap-1">
                        <span className="text-xs text-[var(--muted)]">Link</span>
                        <input
                          className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2 text-sm text-[var(--text)]"
                          value={item.link ?? ""}
                          onChange={(event) => updateSource(sourceIndex, "link", event.target.value)}
                          placeholder="https://..."
                        />
                      </label>
                      <label className="grid gap-1">
                        <span className="text-xs text-[var(--muted)]">Note</span>
                        <textarea
                          className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2 text-sm text-[var(--text)]"
                          value={item.note}
                          onChange={(event) => updateSource(sourceIndex, "note", event.target.value)}
                          rows={3}
                        />
                      </label>
                    </div>
                    <div className="mt-2 text-[11px] uppercase tracking-wide text-[var(--muted)]">
                      category: {item.category}
                    </div>
                    {item.tags && item.tags.length > 0 ? (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={`${item.title}-${tag}`}
                            className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[var(--muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-xs text-[var(--accent)] underline"
                      >
                        Open source
                      </a>
                    ) : null}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid gap-2">
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
