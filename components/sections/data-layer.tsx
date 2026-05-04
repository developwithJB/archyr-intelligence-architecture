import { SectionShell } from "@/components/section-shell";
import {
  knowledgeGatewayMethodList,
  storageDecisionGrid,
  entityResolutionSample,
  biggestFailureMode,
  whyPostgresFirst,
  graphWhereItWins,
  graphWhereOverkill,
  dataLayerRecommendation,
} from "@/src/data/archyr/dataLayer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DataLayer() {
  return (
    <SectionShell
      id="data-layer"
      title="Multi-Database Backend & Data Layer"
      subtitle="Postgres-first operations with derived semantic search and optional graph indexes."
    >
      <div className="mb-4 rounded-xl border border-dashed border-[var(--line)] bg-[var(--surface-muted)] p-3 text-sm text-[var(--muted)]">
        <p>
          <strong className="text-[var(--text)]">Recommendation:</strong> {dataLayerRecommendation}
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {whyPostgresFirst.length === 0 ? <li>No rationale entries are configured.</li> : null}
          {whyPostgresFirst.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 text-sm text-[var(--muted)]">
        <p className="text-[var(--text)] font-semibold">Biggest failure mode to prevent</p>
        <p className="mt-1">{biggestFailureMode}</p>
      </div>

      <h3 className="mb-2 text-sm font-semibold tracking-wide text-[var(--text)]">Storage decision grid</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {storageDecisionGrid.length === 0 ? (
          <Card className="border-dashed">
            <CardContent>
              <p className="text-sm text-[var(--muted)]">Storage grid is empty.</p>
            </CardContent>
          </Card>
        ) : null}
        {storageDecisionGrid.map((layer) => (
          <Card key={layer.store}>
            <CardContent>
              <div className="mb-2 flex items-center justify-between gap-2">
                <CardTitle>{layer.store}</CardTitle>
                <Badge variant={layer.category === "canonical" ? "success" : "outline"}>
                  {layer.category}
                </Badge>
              </div>
              <p className="text-sm text-[var(--muted)]">{layer.purpose}</p>
              <p className="mt-2 text-xs text-[var(--text)]">What it stores: {layer.whatItStores}</p>
              <p className="mt-2 text-xs text-[var(--text)]">When to use: {layer.whenToUse}</p>
              <ul className="mt-2 list-disc pl-5 text-xs text-[var(--muted)]">
                {layer.whenNotToUse.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent>
            <CardTitle>KnowledgeGateway API</CardTitle>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Agents must not see direct storage shape. This API is the only data boundary.
            </p>
            <ul className="mt-2 space-y-2 text-sm">
              {knowledgeGatewayMethodList.length === 0 ? <li className="text-[var(--text)]">No API methods yet.</li> : null}
              {knowledgeGatewayMethodList.map((method) => (
                <li key={method.name} className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-2">
                  <p className="font-semibold text-[var(--text)]">{method.request}</p>
                  <p className="text-xs text-[var(--muted)]">{method.behavior}</p>
                  <p className="mt-1 text-[11px] text-[var(--text)]">Endpoint: {method.name}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <CardTitle>Entity resolution flow</CardTitle>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Example inputs: {entityResolutionSample.target.join(", ")}
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-[var(--muted)]">
              {entityResolutionSample.steps.length === 0 ? <li>No resolution steps are configured.</li> : null}
              {entityResolutionSample.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-2">
        <Card>
          <CardContent>
            <CardTitle>Where graph helps</CardTitle>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              {graphWhereItWins.length === 0 ? <li>No graph-use scenarios configured.</li> : null}
              {graphWhereItWins.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <CardTitle>Where graph is overkill</CardTitle>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              {graphWhereOverkill.length === 0 ? <li>No anti-pattern scenarios configured.</li> : null}
              {graphWhereOverkill.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <p className="mt-3 text-xs text-[var(--muted)]">
        Optional graph indexes: used as derived systems only when relationship traversal demand is proven.
      </p>
    </SectionShell>
  );
}
