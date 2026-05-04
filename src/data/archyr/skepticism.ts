export interface SkepticTheme {
  tone: "Overhyped" | "Underrated";
  title: string;
  claim: string;
  why: string;
}

export interface EvidenceContractPoint {
  title: string;
  what: string;
}

export interface SkepticSection {
  title: string;
  items: string[];
}

export const skepticalChecks: SkepticTheme[] = [
  {
    tone: "Overhyped",
    title: "Chain-of-agents without eval gates.",
    claim: "A chain of agents is not value in itself; without hard eval gates it creates faster failure propagation.",
    why:
      "VC diligence is low-tolerance for ambiguity: each extra handoff compounds wrong assumptions unless every handoff has an explicit gate.",
  },
];

export const underratedChecks: SkepticTheme[] = [
  {
    tone: "Underrated",
    title: "Evidence contracts and typed interfaces.",
    claim:
      "Load-bearing architecture is in typed contracts, not model cleverness.",
    why:
      "When every claim, merge, and retrieval result is typed with provenance, you can rollback safely, audit why a decision changed, and recover when teams scale.",
  },
];

export const evidenceContractChecklist: EvidenceContractPoint[] = [
  {
    title: "provenance",
    what: "where it came from",
  },
  {
    title: "validity window",
    what: "when it was true",
  },
  {
    title: "review state",
    what: "whether it was reviewed",
  },
  {
    title: "supersession",
    what: "whether it has been superseded",
  },
  {
    title: "confidence",
    what: "the claim confidence score",
  },
  {
    title: "lineage",
    what: "what workflow produced it",
  },
];

export const killSwitches: SkepticSection[] = [
  {
    title: "Operational kill switches",
    items: [
      "Confidence floor for publish",
      "Reviewer approval required for external/public output",
      "Bounded retries + global circuit breaker",
      "Budget and latency emergency stop",
    ],
  },
];
