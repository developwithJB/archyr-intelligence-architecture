"use client";

import { useMemo, useState } from "react";
import { architectureRouteCards } from "@/src/data/archyr/routes";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SectionShell } from "@/components/section-shell";
import { Badge } from "@/components/ui/badge";

export default function ArchitectureRoutes() {
  const [activeRoute, setActiveRoute] = useState<string>(architectureRouteCards[0]?.id ?? "");

  const current = useMemo(
    () => architectureRouteCards.find((route) => route.id === activeRoute),
    [activeRoute],
  );

  return (
    <SectionShell
      id="architecture-routes"
      title="Architecture Routes"
      subtitle="Each route is deterministic, bounded, and traceable."
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-3">
          {architectureRouteCards.length === 0 ? (
            <Card className="border-dashed">
              <CardContent>
                <p className="text-sm text-[var(--muted)]">No routes are currently defined.</p>
              </CardContent>
            </Card>
          ) : (
            architectureRouteCards.map((route) => {
              const isActive = route.id === activeRoute;
              return (
                <button
                  type="button"
                  key={route.id}
                  onClick={() => setActiveRoute(route.id)}
                  className={`rounded-2xl border border-[var(--line)] text-left transition ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text)]"
                      : "bg-[var(--surface)]"
                  }`}
                >
                  <CardContent>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <CardTitle className="text-base">{route.title}</CardTitle>
                      <Badge variant={isActive ? "success" : "outline"}>{route.verdict}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-[var(--muted)]">{route.bestFor}</p>
                    {isActive ? (
                      <div className="mt-3 grid gap-2 text-sm">
                        <div>
                          <p className="font-semibold text-[var(--text)]">Core stack</p>
                          <p className="text-[var(--muted)]">{route.coreStack.join(" · ")}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--text)]">Why it works</p>
                          <p className="text-[var(--muted)]">{route.whyItWorks.join(" · ")}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--text)]">Verdict</p>
                          <p className="text-[var(--muted)]">{route.verdict}</p>
                        </div>
                      </div>
                    ) : null}
                  </CardContent>
                </button>
              );
            })
          )}
        </div>

        <Card>
          <CardContent>
            <p className="text-sm font-semibold text-[var(--text)]">Selected route detail</p>
            {current ? (
              <div className="mt-3 grid gap-3 text-sm text-[var(--muted)]">
                <p className="font-semibold text-[var(--text)]">{current.title}</p>
                <p>{current.verdict}</p>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-2">
                    <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Fit</p>
                    <p className="mt-1 text-sm font-semibold text-[var(--text)]">{current.bestFor}</p>
                  </div>
                  <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-2">
                    <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Core stack</p>
                    <p className="mt-1 text-sm font-semibold text-[var(--text)]">{current.coreStack.join(" · ")}</p>
                  </div>
                </div>
                {current.whyItWorks?.length ? (
                  <div>
                    <p className="font-semibold text-[var(--text)]">Why it works</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {current.whyItWorks.map((entry) => (
                        <li key={entry}>{entry}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {current.failureHandling?.length ? (
                  <div>
                    <p className="font-semibold text-[var(--text)]">Why not as core</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {current.failureHandling.map((entry) => (
                        <li key={entry}>{entry}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="mt-3 text-sm text-[var(--muted)]">Select a route to inspect details.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </SectionShell>
  );
}
