export type EvalHorizonLabel = "Day 1" | "Day 90" | "Day 365";

export interface TrustDimension {
  id: string;
  title: string;
  question: string;
  target: string;
  control: string;
  metric: string;
}

export interface GatePolicy {
  level: "hard" | "soft";
  name: string;
  condition: string;
  impact: string;
}

export interface EvalProgram {
  horizon: EvalHorizonLabel;
  scope: string[];
}

export interface EvalRecommendation {
  text: string;
}

export interface EvaluationTrap {
  title: string;
  body: string;
}

export const evaluationRecommendation: EvalRecommendation = {
  text: "Treat evals as trust infrastructure.",
};

export const evalTraps: EvaluationTrap[] = [
  {
    title: "The 95% eval but subtly wrong trap",
    body:
      "A workflow can pass broad eval sets while still shipping wrong partner-facing outputs if citation discipline, unsupported claims, and merge safety are not in the test set.",
  },
];

export const trustDimensions: TrustDimension[] = [
  {
    id: "schema-validity",
    title: "Schema validity",
    question: "Are outputs always typed and complete at every worker boundary?",
    target: "No schema violations in production routes.",
    control: "Strong schema validation and typed contracts in all nodes.",
    metric: "Schema failure rate by route.",
  },
  {
    id: "citation-discipline",
    title: "Citation discipline",
    question: "Can any factual claim leave without a source?",
    target: "0 unsupported factual statements in publish path.",
    control: "Claim registry with per-section checks before approval.",
    metric: "Factual coverage and unsupported percentage.",
  },
  {
    id: "unsupported-claims",
    title: "Unsupported claim detection",
    question: "Are unsupported claims caught before partner-facing output?",
    target: "Zero high-severity unsupported factual statements.",
    control: "Mandatory source assertion at build and publish.",
    metric: "Unsupported claim count by route.",
  },
  {
    id: "retrieval-quality",
    title: "Retrieval quality",
    question: "Does retrieval return relevant evidence for seeded diligence questions?",
    target: "Recall and precision suitable for each route.",
    control: "Hybrid retrieval with scope and freshness constraints.",
    metric: "Recall, precision, and citation utility.",
  },
  {
    id: "entity-resolution",
    title: "Entity resolution safety",
    question: "Are risky merges blocked from auto-merge?",
    target: "All low-confidence merges require explicit review.",
    control: "Deterministic candidate scoring plus required human gate.",
    metric: "Merge false positives and correction latency.",
  },
];

export const evalRoadmap: EvalProgram[] = [
  {
    horizon: "Day 1",
    scope: [
      "schema validity",
      "citation required for factual claims",
      "basic extraction accuracy",
      "retrieval recall on seeded questions",
      "unsupported claim detection",
      "cost and latency checks",
    ],
  },
  {
    horizon: "Day 90",
    scope: [
      "partner edit distance",
      "memo section quality",
      "retrieval success rate",
      "entity resolution precision/recall",
      "reviewer-agent disagreement",
      "skill version comparison",
    ],
  },
  {
    horizon: "Day 365",
    scope: [
      "cross-deal memory usefulness",
      "sector learning quality",
      "partner trust score",
      "long-term unsupported-claim rate",
      "outcome-informed pattern review",
    ],
  },
];

export const evalTooling = ["Braintrust", "LangSmith"];

export const hardAndSoftGates: GatePolicy[] = [
  {
    level: "hard",
    name: "financial-claim-evidence",
    condition: "Any financial claim with no source evidence.",
    impact: "Publish blocked until claim is sourced and reviewed.",
  },
  {
    level: "hard",
    name: "entity-merge-risk",
    condition: "Entity merges above risk threshold.",
    impact: "Require human approval before merge applies.",
  },
  {
    level: "hard",
    name: "memo-section-citations",
    condition: "Memo section lacks citations.",
    impact: "Memo remains in draft and cannot publish.",
  },
  {
    level: "hard",
    name: "external-write-approval",
    condition: "Email or CRM write attempted from draft output.",
    impact: "Queue for explicit approval.",
  },
  {
    level: "hard",
    name: "external-request-drafts",
    condition: "Generated data requests emitted.",
    impact: "Only draft state allowed until approved.",
  },
  {
    level: "soft",
    name: "market-size-confidence",
    condition: "Low-confidence market-size estimate.",
    impact: "Return confidence labels and caveat.",
  },
  {
    level: "soft",
    name: "competitive-summary",
    condition: "Competitive synthesis lacks enough evidence.",
    impact: "Attach caveat and escalation step.",
  },
  {
    level: "soft",
    name: "founder-background",
    condition: "Low-confidence founder background synthesis.",
    impact: "Present as uncertain and request follow-up input.",
  },
  {
    level: "soft",
    name: "low-confidence-retrieval-answer",
    condition: "Low-confidence retrieval answers.",
    impact: "Force explicit uncertainty language.",
  },
];

export const evalIntegrityWarning = {
  title: "Avoid fake eval confidence",
  body:
    "Seed evals from real partner edits, rejected memo sections, and production traces. Synthetic tests alone are insufficient because they can miss subtle investment-critical errors.",
};
