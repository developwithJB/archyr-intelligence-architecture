export type TrustReplayScenarioId = "visible" | "restricted" | "stale" | "unsupported";
export type TrustReplayViewerId = "deal-team" | "investment-partner" | "external-share";
export type TrustReplayDecision = "publish" | "caveat" | "route_to_review" | "block";

export interface TrustReplayViewer {
  id: TrustReplayViewerId;
  label: string;
  permissionSummary: string;
}

export interface TrustReplayCheck {
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
}

export interface TrustReplayScenario {
  id: TrustReplayScenarioId;
  label: string;
  shortLabel: string;
  claim: string;
  sourceArtifact: string;
  sourceSpan: string;
  freshness: string;
  confidence: string;
  visibilityState: "visible" | "restricted_internal" | "stale" | "unavailable";
  permissionScope: string;
  reviewerState: string;
  decision: TrustReplayDecision;
  decisionSummary: string;
  memoSurface: string;
  scoringSurface: string;
  evalResult: string;
  failureClass: string;
  patchLever: string;
  traceId: string;
  checks: TrustReplayCheck[];
}

export const trustReplayPosition =
  "A trust layer earns its keep when the same generated recommendation changes shape based on evidence, permissions, freshness, confidence, and review state.";

export const trustReplayViewers: TrustReplayViewer[] = [
  {
    id: "deal-team",
    label: "Deal team",
    permissionSummary: "Can inspect internal artifacts and reviewer notes.",
  },
  {
    id: "investment-partner",
    label: "Investment partner",
    permissionSummary: "Can see memo-grade evidence and confidence, but not every private raw source.",
  },
  {
    id: "external-share",
    label: "External share",
    permissionSummary: "Can see approved conclusions only; private sources stay hidden.",
  },
];

export const trustReplayScenarios: TrustReplayScenario[] = [
  {
    id: "visible",
    label: "Visible source",
    shortLabel: "Visible",
    claim: "Lumenflow shows enterprise pull because three named customers expanded seats in Q1.",
    sourceArtifact: "Q1 customer expansion export",
    sourceSpan: "Rows 14-18, expansion cohort",
    freshness: "Observed 2026-04-22; current",
    confidence: "0.86 high",
    visibilityState: "visible",
    permissionScope: "deal_team, investment_partner",
    reviewerState: "approved",
    decision: "publish",
    decisionSummary: "Publish with direct citation, source span, freshness, and confidence.",
    memoSurface:
      "Show the claim with direct source links and the expansion rows that support it.",
    scoringSurface:
      "Use the claim as positive enterprise traction signal in thesis-fit scoring.",
    evalResult: "Passes citation, permission, freshness, and reviewer gates.",
    failureClass: "none",
    patchLever: "No patch required; keep as golden path replay.",
    traceId: "trust-replay-visible-001",
    checks: [
      {
        label: "Source artifact",
        status: "pass",
        detail: "Immutable export is present with checksum and source span.",
      },
      {
        label: "Permission scope",
        status: "pass",
        detail: "Current viewer can inspect the source class.",
      },
      {
        label: "Freshness",
        status: "pass",
        detail: "No newer conflicting source is known.",
      },
      {
        label: "Reviewer state",
        status: "pass",
        detail: "Approved claim can enter partner-facing memo.",
      },
    ],
  },
  {
    id: "restricted",
    label: "Restricted internal evidence",
    shortLabel: "Restricted",
    claim: "Lumenflow should move to deeper diligence because a strategic buyer intro is active.",
    sourceArtifact: "Private LP email thread",
    sourceSpan: "Message 4, intro confirmation",
    freshness: "Observed 2026-04-28; current",
    confidence: "0.72 medium",
    visibilityState: "restricted_internal",
    permissionScope: "deal_team only",
    reviewerState: "needs authorized reviewer",
    decision: "route_to_review",
    decisionSummary:
      "Use as internal signal, hide raw evidence, and route to an authorized reviewer before external rendering.",
    memoSurface:
      "Show source class and confidence only. Do not expose sender identity or private text.",
    scoringSurface:
      "Can influence internal relationship score, but cannot be shown as partner-facing proof.",
    evalResult: "Passes only if private text is not leaked and review routing is opened.",
    failureClass: "private-source leakage",
    patchLever: "Tighten KnowledgeGateway visibility checks before memo rendering.",
    traceId: "trust-replay-restricted-014",
    checks: [
      {
        label: "Source artifact",
        status: "pass",
        detail: "Private evidence exists and is linked to the claim.",
      },
      {
        label: "Permission scope",
        status: "warn",
        detail: "Viewer may not be allowed to inspect the raw source.",
      },
      {
        label: "Freshness",
        status: "pass",
        detail: "Source is current, but visibility limits the surface.",
      },
      {
        label: "Reviewer state",
        status: "warn",
        detail: "Authorized reviewer must approve any external wording.",
      },
    ],
  },
  {
    id: "stale",
    label: "Stale source conflict",
    shortLabel: "Stale",
    claim: "Lumenflow pricing increased 30% this quarter with no churn impact.",
    sourceArtifact: "Founder update note",
    sourceSpan: "Pricing paragraph",
    freshness: "Observed 2025-11-06; superseded by 2026 sales notes",
    confidence: "0.48 low",
    visibilityState: "stale",
    permissionScope: "deal_team, investment_partner",
    reviewerState: "escalated",
    decision: "caveat",
    decisionSummary:
      "Do not publish as current fact; show conflict, downgrade confidence, and request fresher evidence.",
    memoSurface:
      "Render as an uncertainty note with the newer conflicting source called out.",
    scoringSurface:
      "Reduce pricing-power contribution until sales notes and churn data reconcile.",
    evalResult: "Passes only if stale evidence is preserved as history, not current truth.",
    failureClass: "stale citation",
    patchLever: "Increase temporal retrieval weighting and require supersession checks.",
    traceId: "trust-replay-stale-009",
    checks: [
      {
        label: "Source artifact",
        status: "pass",
        detail: "Source exists, but it is not the current authority.",
      },
      {
        label: "Permission scope",
        status: "pass",
        detail: "Viewer can inspect both old and newer source classes.",
      },
      {
        label: "Freshness",
        status: "fail",
        detail: "Newer sales notes conflict with the cited update.",
      },
      {
        label: "Reviewer state",
        status: "warn",
        detail: "Needs analyst reconciliation before memo-grade use.",
      },
    ],
  },
  {
    id: "unsupported",
    label: "Unsupported financial claim",
    shortLabel: "Unsupported",
    claim: "Lumenflow revenue grew 4x year over year.",
    sourceArtifact: "Founder note",
    sourceSpan: "General momentum sentence",
    freshness: "Observed 2026-04-17; insufficient numeric support",
    confidence: "0.21 blocked",
    visibilityState: "unavailable",
    permissionScope: "no publishable evidence",
    reviewerState: "rejected",
    decision: "block",
    decisionSummary:
      "Block publish, name the missing evidence, and convert the output into a replayable eval case.",
    memoSurface:
      "Do not show as fact. Ask for revenue export, board deck, or finance-system evidence.",
    scoringSurface:
      "Exclude from numeric growth scoring until source-backed metric exists.",
    evalResult: "Fails hard gate: financial claim has no source-backed metric.",
    failureClass: "unsupported financial claim",
    patchLever: "Add claim-level numeric citation assertion and stricter finance extraction rubric.",
    traceId: "trust-replay-unsupported-027",
    checks: [
      {
        label: "Source artifact",
        status: "fail",
        detail: "Source does not contain the numeric claim.",
      },
      {
        label: "Permission scope",
        status: "pass",
        detail: "Access is not the blocker; evidence quality is.",
      },
      {
        label: "Freshness",
        status: "warn",
        detail: "Current enough, but too vague for a financial assertion.",
      },
      {
        label: "Reviewer state",
        status: "fail",
        detail: "Reviewer rejection blocks partner-facing output.",
      },
    ],
  },
];
