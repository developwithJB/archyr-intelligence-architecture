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
    title: "Autonomous agent swarms.",
    claim: "Most teams do not need 12 agents chatting with each other.",
    why:
      "They need durable workflows, narrow contracts, evidence discipline, budget controls, and human checkpoints.",
  },
];

export const underratedChecks: SkepticTheme[] = [
  {
    tone: "Underrated",
    title: "Evidence contracts.",
    claim:
      "The best AI diligence system is not the smartest sounding output.",
    why:
      "It is the system where every claim can show where it came from, when it was true, review status, whether it was superseded, confidence, and workflow provenance.",
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
