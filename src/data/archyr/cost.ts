export type CostTarget =
  | "ingest-200-page-data-room"
  | "draft-investment-memo"
  | "answer-partner-question"
  | "score-new-pipeline-company";

export type WorkflowModelRoute = "Haiku-class" | "Sonnet-class" | "Opus-class" | "Fine-tune";

export interface CostRecommendationProfile {
  recommendation: string;
}

export interface ModelClass {
  modelClass: "Haiku-class" | "Sonnet-class" | "Opus-class";
  strengths: string[];
  useFor: string[];
}

export interface WorkflowTarget {
  id: CostTarget;
  title: string;
  targetLatency: string;
  costGoal: string;
  costEnvelope: string;
  modelRoute: WorkflowModelRoute;
  routeDetail: string;
  extendedThinking: string;
  promptCaching: string;
  stack: string[];
  notes?: string[];
  blastRadiusControls: string[];
}

export interface ExtendedThinkingPolicy {
  useFor: string[];
  avoidFor: string[];
}

export type WorkflowType =
  | "ingest-materials"
  | "extract-facts"
  | "resolve-entities"
  | "draft-memo"
  | "answer-question"
  | "update-memory-skills";

export type WorkflowDepth = "fast" | "balanced" | "deep";
export type ModelTier = "cheap" | "standard" | "premium";

export interface CostFlowProfile {
  workflowType: WorkflowType;
  label: string;
  baseLatencyMinutes: number;
  baseBudgetPoints: number;
  baseDescription: string;
  sensitivityPerArtifact: number;
}

export interface ModelClassProfile {
  tier: ModelTier;
  label: string;
  recommendedClass: "Haiku-class" | "Sonnet-class" | "Opus-class";
  depthMultiplier: Record<WorkflowDepth, number>;
  budgetMultiplier: Record<WorkflowDepth, number>;
  accuracyPosture: Record<WorkflowDepth, string>;
  blastRadiusControls: string[];
}

export interface CostCalculatorParams {
  workflowType: WorkflowType;
  artifacts: number;
  depth: WorkflowDepth;
  modelTier: ModelTier;
}

export interface CostCalculatorResult {
  estimatedLatencyMin: number;
  latencyBand: string;
  budgetLow: number;
  budgetHigh: number;
  recommendedModelClass: "Haiku-class" | "Sonnet-class" | "Opus-class";
  accuracyPosture: string;
  blastRadiusControls: string[];
  note: string;
}

export interface CostControl {
  name: string;
  description: string;
}

export interface CostInputDefaults {
  dealsPerDay: number;
  dealPagesPerDeck: number;
  transcriptMinutes: number;
  mcpCallsPerDeal: number;
  retries: number;
}

export interface CostProfile {
  promptTokensPerDeckPage: number;
  promptTokensPerTranscriptMinute: number;
  outputTokensPerDeckPage: number;
  outputTokensPerTranscriptMinute: number;
  promptCostPerMillion: number;
  outputCostPerMillion: number;
  embeddingCostPerMillion: number;
  mcpCallCost: number;
  memoryWriteCost: number;
  redisOverhead: number;
}

export interface FineTunePolicy {
  whenToUse: string;
  whyNotDefault: string;
}

export interface CostModeProfile {
  id: "fast" | "accurate" | "cheap";
  label: string;
  llmMultiplier: number;
  latencyMultiplier: number;
  confidenceShift: string;
}

export const costRecommendation: CostRecommendationProfile = {
  recommendation: "Use model routing by workflow risk.",
};

export const modelRouting: ModelClass[] = [
  {
    modelClass: "Haiku-class",
    strengths: ["fast", "inexpensive", "high throughput"],
    useFor: ["extraction", "classification", "formatting", "simple scoring"],
  },
  {
    modelClass: "Sonnet-class",
    strengths: ["balanced reasoning", "strong drafting", "stable quality"],
    useFor: ["main reasoning", "memo drafting", "partner Q&A"],
  },
  {
    modelClass: "Opus-class",
    strengths: ["deep reasoning", "contradiction handling", "policy-sensitive critique"],
    useFor: ["final critique", "conflict resolution", "high-stakes investment reasoning"],
  },
];

export const workflowTargets: WorkflowTarget[] = [
  {
    id: "ingest-200-page-data-room",
    title: "Ingest 200-page data room",
    targetLatency: "15 to 45 minutes",
    costGoal: "Estimate",
    costEnvelope: "estimate 10-24 budget points per run",
    modelRoute: "Sonnet-class",
    routeDetail: "Parse+normalize with cheap deterministic extraction, then Sonnet summaries and conflict reruns.",
    extendedThinking: "Use for contradiction-heavy filings, legal changes, and conflicting ownership evidence.",
    promptCaching: "High value on parser/system prompts and section templates reused across each data room run.",
    stack: [
      "parser + cheap extraction model",
      "Sonnet summaries",
      "reviewer for conflicts",
    ],
    blastRadiusControls: [
      "per-deal budget caps",
      "workflow timeout",
      "idempotency keys",
      "max retries",
    ],
  },
  {
    id: "draft-investment-memo",
    title: "Draft investment memo",
    targetLatency: "3 to 7 minutes",
    costGoal: "Estimate",
    costEnvelope: "estimate 4-12 budget points per memo",
    modelRoute: "Sonnet-class",
    routeDetail: "Sonnet for drafting, Opus-class only on conflict-heavy or final-signoff branches.",
    extendedThinking: "Use for final thesis synthesis and explicit contradiction calls.",
    promptCaching: "Useful for memo structure, citation phrasing, and rubric prompts.",
    stack: [
      "retrieval",
      "Sonnet drafting",
      "Opus/Sonnet reviewer depending on deal priority",
    ],
    blastRadiusControls: [
      "hard gates on unsupported claims",
      "human approval before publish",
      "max tool calls",
      "kill switch",
    ],
  },
  {
    id: "answer-partner-question",
    title: "Answer partner ad-hoc question",
    targetLatency: "p50 under 10 seconds, p95 under 30 seconds",
    costGoal: "Estimate",
    costEnvelope: "estimate <$1 budget points per answer",
    modelRoute: "Haiku-class",
    routeDetail: "Fast retrieval-and-answer path, escalate to Sonnet when confidence drops.",
    extendedThinking: "Avoid except for ambiguous valuation, legal, or contradictory factual asks.",
    promptCaching: "High value on query normalization and citation formatting prompts.",
    stack: [
      "hybrid retrieval",
      "evidence bundles",
      "Sonnet answer",
    ],
    notes: ["Rule: cite sources or state uncertainty."],
    blastRadiusControls: [
      "query-level budget caps",
      "tool-call limits",
      "evidence citations hard stop",
      "max retries",
    ],
  },
  {
    id: "score-new-pipeline-company",
    title: "Score new pipeline company",
    targetLatency: "15 to 60 seconds",
    costGoal: "Estimate",
    costEnvelope: "estimate 1.5-5 budget points per score",
    modelRoute: "Haiku-class",
    routeDetail: "Haiku/Sonnet mix with strict schema and score bands; human escalation below confidence floor.",
    extendedThinking: "Use for edge-case sectors and founder-claim conflicts.",
    promptCaching: "Cache scoring rubric and sector priors; biggest savings on repeat scoring tasks.",
    stack: [
      "Haiku/Sonnet classifier",
      "retrieval",
      "lightweight scoring rubric",
    ],
    blastRadiusControls: [
      "max subagent fan-out",
      "human review for low-confidence scores",
      "idempotency keys",
      "workflow timeout",
    ],
  },
];

export const costFlowProfiles: CostFlowProfile[] = [
  {
    workflowType: "ingest-materials",
    label: "Ingest materials",
    baseLatencyMinutes: 22,
    baseBudgetPoints: 14,
    baseDescription: "Data-room upload, parse, and normalization readiness.",
    sensitivityPerArtifact: 0.08,
  },
  {
    workflowType: "extract-facts",
    label: "Extract facts",
    baseLatencyMinutes: 6,
    baseBudgetPoints: 7,
    baseDescription: "Typed extraction from normalized chunks.",
    sensitivityPerArtifact: 0.07,
  },
  {
    workflowType: "resolve-entities",
    label: "Resolve entities",
    baseLatencyMinutes: 3,
    baseBudgetPoints: 5,
    baseDescription: "Candidate generation and merge validation.",
    sensitivityPerArtifact: 0.04,
  },
  {
    workflowType: "draft-memo",
    label: "Draft investment memo",
    baseLatencyMinutes: 5,
    baseBudgetPoints: 10,
    baseDescription: "Memo assembly with citation scaffolding.",
    sensitivityPerArtifact: 0.05,
  },
  {
    workflowType: "answer-question",
    label: "Answer partner question",
    baseLatencyMinutes: 1.5,
    baseBudgetPoints: 3,
    baseDescription: "Ad-hoc query + retrieval bundle path.",
    sensitivityPerArtifact: 0.03,
  },
  {
    workflowType: "update-memory-skills",
    label: "Update memory and skills",
    baseLatencyMinutes: 2,
    baseBudgetPoints: 4,
    baseDescription: "Feedback events, version bumping, routing updates.",
    sensitivityPerArtifact: 0.02,
  },
];

export const costModelProfiles: ModelClassProfile[] = [
  {
    tier: "cheap",
    label: "Cheap",
    recommendedClass: "Haiku-class",
    depthMultiplier: {
      fast: 0.76,
      balanced: 0.88,
      deep: 1.05,
    },
    budgetMultiplier: {
      fast: 0.6,
      balanced: 0.75,
      deep: 0.95,
    },
    accuracyPosture: {
      fast: "Coverage-first with explicit caveats on weak areas.",
      balanced: "Good for repeatable, deterministic extraction and classification.",
      deep: "Reasonable depth but still limited without human review.",
    },
    blastRadiusControls: [
      "Keep retries strict",
      "Lower fan-out",
      "Block external writes by default",
      "Require explicit approval for rerun promotions",
    ],
  },
  {
    tier: "standard",
    label: "Standard",
    recommendedClass: "Sonnet-class",
    depthMultiplier: {
      fast: 0.84,
      balanced: 1.0,
      deep: 1.22,
    },
    budgetMultiplier: {
      fast: 0.85,
      balanced: 1.0,
      deep: 1.35,
    },
    accuracyPosture: {
      fast: "Balanced throughput with acceptable factual stability.",
      balanced: "Strong for most diligence memo paths.",
      deep: "High-confidence outputs for partner-facing writing.",
    },
    blastRadiusControls: [
      "Enable reviewer + approval checkpoints",
      "Expand tool retries conservatively",
      "Keep audit trail for every output transition",
      "Route complex conflicts to escalation lane",
    ],
  },
  {
    tier: "premium",
    label: "Premium",
    recommendedClass: "Opus-class",
    depthMultiplier: {
      fast: 0.9,
      balanced: 1.08,
      deep: 1.4,
    },
    budgetMultiplier: {
      fast: 1.0,
      balanced: 1.25,
      deep: 1.8,
    },
    accuracyPosture: {
      fast: "Best-effort precision with stronger reasoning than cheaper tiers.",
      balanced: "High rigor with structured skepticism and conflict review.",
      deep: "Investment-grade depth for critical assumptions and synthesis.",
    },
    blastRadiusControls: [
      "Pair with budget cap and hard timeout",
      "Require explicit final human signoff for publish",
      "Escalate low-confidence merges for manual merge review",
      "Keep decision replay attached to memo section",
    ],
  },
];

export const depthFactors: Record<WorkflowDepth, { label: string; multiplier: number }> = {
  fast: { label: "Fast", multiplier: 0.85 },
  balanced: { label: "Balanced", multiplier: 1.0 },
  deep: { label: "Deep", multiplier: 1.25 },
};

export const costCalculatorDefault: CostCalculatorParams = {
  workflowType: "draft-memo",
  artifacts: 40,
  depth: "balanced",
  modelTier: "standard",
};

export function estimateRunCost(params: CostCalculatorParams): CostCalculatorResult {
  const profile = costFlowProfiles.find((item) => item.workflowType === params.workflowType);
  const modelProfile = costModelProfiles.find((item) => item.tier === params.modelTier);
  const depthProfile = depthFactors[params.depth];

  if (!profile || !modelProfile || !depthProfile) {
    return {
      estimatedLatencyMin: 0,
      latencyBand: "n/a",
      budgetLow: 0,
      budgetHigh: 0,
      recommendedModelClass: "Sonnet-class",
      accuracyPosture: "Not available",
      blastRadiusControls: [],
      note: "Input parameters could not be resolved.",
    };
  }

  const artifactLoad = 1 + Math.max(params.artifacts - 1, 0) * profile.sensitivityPerArtifact;
  const estimatedLatency = profile.baseLatencyMinutes * artifactLoad * modelProfile.depthMultiplier[params.depth] * depthProfile.multiplier;
  const budgetBase = profile.baseBudgetPoints * artifactLoad * modelProfile.budgetMultiplier[params.depth] * depthProfile.multiplier;

  return {
    estimatedLatencyMin: Math.round(estimatedLatency * 10) / 10,
    latencyBand: `${Math.max(Math.round(estimatedLatency * 0.75), 1)}-${Math.round(estimatedLatency * 1.35)} min`,
    budgetLow: Math.round(budgetBase * 0.75 * 100) / 100,
    budgetHigh: Math.round(budgetBase * 1.35 * 100) / 100,
    recommendedModelClass: modelProfile.recommendedClass,
    accuracyPosture: modelProfile.accuracyPosture[params.depth],
    blastRadiusControls: modelProfile.blastRadiusControls,
    note:
      "Budget envelope values are directional planning estimates, not exact invoiced billing.",
  };
}

export const extendedThinkingPolicy: ExtendedThinkingPolicy = {
  useFor: [
    "conflicting source resolution",
    "investment memo risk critique",
    "market and competitive synthesis",
    "final partner-facing outputs",
  ],
  avoidFor: [
    "basic parsing",
    "simple classification",
    "formatting",
    "entity lookup",
    "deterministic calculations",
  ],
};

export const costControls: CostControl[] = [
  { name: "per-deal budget caps", description: "Reject run or route overflow when cost guardrails are crossed." },
  { name: "max tokens per workflow", description: "Hard token ceilings per workflow path and stage." },
  { name: "max retries", description: "Bounded retry budget to avoid runaway failure loops." },
  { name: "max tool calls", description: "Tool-call ceilings with escalation on exceedance." },
  { name: "max subagent fan-out", description: "Limit parallel agents to keep costs and ambiguity bounded." },
  { name: "idempotency keys", description: "Prevent duplicate financial writes and duplicate model paths." },
  { name: "workflow timeout", description: "Kill long-running runs automatically when stale." },
  { name: "kill switch", description: "Emergency circuit breaker for production containment." },
  { name: "human approval before external writes", description: "No outbound external write without explicit approval." },
];

export const fineTunePolicy: FineTunePolicy = {
  whenToUse:
    "Use fine-tuning for high-volume deterministic extraction and normalization tasks where inputs are stable and evaluation is strict.",
  whyNotDefault:
    "Avoid by default to keep behavior transparent under partner-facing diligence and to prevent untracked model drift.",
};

export const costDefaults: CostInputDefaults = {
  dealsPerDay: 18,
  dealPagesPerDeck: 24,
  transcriptMinutes: 52,
  mcpCallsPerDeal: 7,
  retries: 1,
};

export const costProfile: CostProfile = {
  promptTokensPerDeckPage: 320,
  promptTokensPerTranscriptMinute: 140,
  outputTokensPerDeckPage: 120,
  outputTokensPerTranscriptMinute: 95,
  promptCostPerMillion: 0.6,
  outputCostPerMillion: 2.4,
  embeddingCostPerMillion: 0.08,
  mcpCallCost: 0.024,
  memoryWriteCost: 0.003,
  redisOverhead: 0.0015,
};

export const costModes: CostModeProfile[] = [
  {
    id: "fast",
    label: "Fast",
    llmMultiplier: 0.85,
    latencyMultiplier: 0.9,
    confidenceShift: "Less retries, tighter timeouts.",
  },
  {
    id: "accurate",
    label: "Accurate",
    llmMultiplier: 1.3,
    latencyMultiplier: 1.35,
    confidenceShift: "Extra validation and stricter rubric checks.",
  },
  {
    id: "cheap",
    label: "Cheap",
    llmMultiplier: 0.75,
    latencyMultiplier: 0.95,
    confidenceShift: "Single-pass parsing, reduced cross-checks.",
  },
];

export const businessDaysPerMonth = 21;
