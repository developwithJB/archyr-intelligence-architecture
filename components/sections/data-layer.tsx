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
  mvpVsFutureState,
  sourceVisibilityStates,
  permissionAwareCitationRule,
  restrictedEvidenceReviewerCopy,
  evidenceContractFields,
  evidenceExampleClaim,
  evidenceVisibilityExamples,
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

      <Card className="mb-4">
        <CardContent>
          <CardTitle>MVP vs future state</CardTitle>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
            {mvpVsFutureState.map((item) => (
              <li key={item.phase}>
                <span className="font-semibold text-[var(--text)]">{item.phase}:</span>{" "}
                {item.instruction}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="mb-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 text-sm text-[var(--muted)]">
        <p className="text-[var(--text)] font-semibold">Biggest failure mode to prevent</p>
        <p className="mt-1">{biggestFailureMode}</p>
      </div>

      <Card className="mb-4">
        <CardContent>
          <CardTitle>Evidence Contract</CardTitle>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Every recommendation is backed by a claim-level evidence record before it reaches a memo, ranking, or partner-facing answer.
          </p>
          <div className="mt-3 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            {evidenceContractFields.map((item) => (
              <div key={item.field} className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3 text-sm">
                <p className="font-semibold text-[var(--text)]">{item.field}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{item.purpose}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <CardTitle>Permission-aware evidence</CardTitle>
          <p className="mt-2 text-sm text-[var(--muted)]">{permissionAwareCitationRule}</p>
          <p className="mt-2 rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3 text-sm text-[var(--text)]">
            Reviewer copy: {restrictedEvidenceReviewerCopy}
          </p>
          <div className="mt-3 rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">Visibility example</p>
            <p className="mt-1 text-sm font-semibold text-[var(--text)]">{evidenceExampleClaim}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              The same recommendation renders differently depending on whether the viewer can inspect the supporting source.
            </p>
          </div>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {evidenceVisibilityExamples.map((item) => (
              <div key={item.visibility} className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3 text-sm">
                <p className="font-semibold text-[var(--text)]">{item.visibility}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{item.recommendationSurface}</p>
                <p className="mt-1 text-xs text-[var(--text)]">{item.backendRule}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {sourceVisibilityStates.map((item) => (
              <div key={item.state} className="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-3 text-sm">
                <p className="font-semibold text-[var(--text)]">{item.state}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{item.meaning}</p>
                <p className="mt-1 text-xs text-[var(--text)]">{item.rule}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
            <CardTitle>Lumenflow worked example (deterministic first, human final)</CardTitle>
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
