"use client";

import { useMemo, useState } from "react";
import { architectureRouteCards } from "@/src/data/archyr/routes";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { SectionShell } from "@/components/section-shell";
import { Badge } from "@/components/ui/badge";

const recommendedRouteId =
  architectureRouteCards.find((route) => route.verdict === "Recommended route.")?.id ?? architectureRouteCards[0]?.id ?? "";

export default function ArchitectureRoutes() {
  const [activeRoute, setActiveRoute] = useState<string>(recommendedRouteId);

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
              const activeTextClass = isActive ? "text-white" : "text-[var(--text)]";
              const activeMutedClass = isActive ? "text-blue-100" : "text-[var(--muted)]";
              return (
                <button
                  type="button"
                  key={route.id}
                  onClick={() => setActiveRoute(route.id)}
                  className={`rounded-2xl border text-left transition ${
                    isActive
                      ? "border-blue-300/80 bg-[var(--accent)] text-white shadow-md shadow-blue-950/20"
                      : "border-[var(--line)] bg-[var(--surface)]"
                  }`}
                >
                  <CardContent>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <CardTitle className={`text-base ${activeTextClass}`}>{route.title}</CardTitle>
                      <Badge variant="outline" className={isActive ? "border-white/40 bg-white/10 text-white" : ""}>
                        {route.verdict}
                      </Badge>
                    </div>
                    <p className={`mt-2 text-sm ${activeMutedClass}`}>{route.bestFor}</p>
                    {isActive ? (
                      <div className="mt-3 grid gap-2 text-sm">
                        <div>
                          <p className="font-semibold text-white">Core stack</p>
                          <p className="text-blue-100">{route.coreStack.join(" · ")}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-white">Why it works</p>
                          <p className="text-blue-100">{route.whyItWorks.join(" · ")}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-white">Verdict</p>
                          <p className="text-blue-100">{route.verdict}</p>
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
