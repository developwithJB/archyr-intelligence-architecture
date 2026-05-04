export interface TemporalClaimField {
  name: string;
  reason: string;
}

export interface MemorySignal {
  id: string;
  item: string;
  cadence: string;
  action: string;
}

export interface MemoryLoopStep {
  id: string;
  title: string;
  description: string;
}

export interface MemoryCell {
  title: string;
  description: string;
}

export type MemoryPolicy = "Adopt" | "Reject";

export interface MemoryPolicyItem {
  policy: MemoryPolicy;
  title: string;
  detail: string;
}

export const memoryRecommendation = "Use temporal memory, not vague model memory.";

export const whatArchyrRemembers = [
  "deal facts",
  "source-backed claims",
  "company/person profiles",
  "partner edits",
  "rejected memo sections",
  "retrieval clicks",
  "sector playbooks",
  "skill versions",
  "eval results",
  "model routing decisions",
];

export const temporalFields: TemporalClaimField[] = [
  { name: "valid_from", reason: "Start time where the claim is asserted as true." },
  { name: "valid_to", reason: "End time where the claim is no longer current." },
  { name: "observed_at", reason: "Capture timestamp of evidence observation." },
  { name: "source_artifact_id", reason: "Link to immutable source file or message artifact." },
  { name: "source_span", reason: "Exact line/position slice for auditability." },
  { name: "confidence", reason: "Model or rule confidence score with provenance." },
  { name: "supersedes_claim_id", reason: "Pointer to prior claim replaced by this version." },
  { name: "extraction_version", reason: "Schema/version metadata for reproducibility." },
  { name: "review_status", reason: "Pending, approved, rejected, or needs review." },
];

export const temporalExample = {
  title: "Temporal claim example",
  note: "A company had $2.4M ARR in January and restated to $2.1M in March. Both records remain historically valid; only the March claim is current.",
  fields: temporalFields,
};

export const memoryLoop: MemoryLoopStep[] = [
  {
    id: "draft",
    title: "Draft / extract",
    description: "System drafts or extracts claim candidates and structured outputs.",
  },
  {
    id: "review",
    title: "Human feedback",
    description: "Human approves, edits, or rejects drafts and claims.",
  },
  {
    id: "event",
    title: "Feedback event",
    description: "Store each human decision as a structured, auditable event.",
  },
  {
    id: "eval",
    title: "Eval refresh",
    description: "Update eval set and expected behavior guardrails.",
  },
  {
    id: "propose",
    title: "Update proposals",
    description: "Retrieval, prompts, skills, and routers generate proposed updates.",
  },
  {
    id: "approve",
    title: "Human approval gate",
    description: "Important updates require explicit human approval.",
  },
  {
    id: "release",
    title: "Versioned rollout",
    description: "New version is tested before becoming default.",
  },
];

export const memorySignals: MemorySignal[] = [
  {
    id: "partner-edits",
    item: "Partner edits",
    cadence: "weekly",
    action: "Reviewed for prompt and skill improvements.",
  },
  {
    id: "eval-failures",
    item: "Reviewer-agent eval failures",
    cadence: "daily during build phase",
    action: "Used for immediate triage and test expansion.",
  },
  {
    id: "retrieval-clicks",
    item: "Retrieval click-through",
    cadence: "weekly",
    action: "Used to tune retrieval and reranking.",
  },
  {
    id: "approval-events",
    item: "Human approval/rejection",
    cadence: "immediate",
    action: "Captured as structured feedback event.",
  },
  {
    id: "outcomes",
    item: "Deal outcomes",
    cadence: "quarterly or annually",
    action: "Long-term signal for retrospective system quality.",
  },
  {
    id: "skills",
    item: "Skill performance",
    cadence: "versioned/eval-gated",
    action: "Promote only after evaluation checks pass.",
  },
];

export const memoryPolicies: MemoryPolicyItem[] = [
  {
    policy: "Adopt",
    title: "Skills for reusable diligence playbooks",
    detail: "Keep SOPs isolated and reusable across sectors and deals.",
  },
  {
    policy: "Adopt",
    title: "Hybrid + contextual retrieval",
    detail: "Use semantic and structured retrieval before memo drafting.",
  },
  {
    policy: "Adopt",
    title: "Temporal claims model",
    detail: "Every claim carries time bounds and source traceability.",
  },
  {
    policy: "Adopt",
    title: "Graph-assisted memory later",
    detail: "Add graph indexes once relationship queries prove repeatable value.",
  },
  {
    policy: "Adopt",
    title: "Evals as update governor",
    detail: "No behavioral update should bypass eval gates.",
  },
  {
    policy: "Reject",
    title: "Vector-only memory",
    detail: "Vector indexes are retrieval aids, not the full source of truth.",
  },
  {
    policy: "Reject",
    title: "Silent self-modifying prompts",
    detail: "Every change requires explicit versioning and review.",
  },
  {
    policy: "Reject",
    title: "Model memory without provenance",
    detail: "Unattributed model context is not auditable.",
  },
  {
    policy: "Reject",
    title: "Graph-first architecture",
    detail: "Delay dedicated graph core until query value is proven.",
  },
];

export const memoryLayers: MemoryCell[] = [
  {
    title: "Temporal claim store",
    description: "Historical and current facts with validity windows and provenance.",
  },
  {
    title: "Source-backed knowledge",
    description: "Structured claims from documents, exports, and reviews with trace IDs.",
  },
  {
    title: "Feedback ledger",
    description: "Approved edits, rejections, and evaluation outcomes form a stable improvement trail.",
  },
];

export const memoryCells = memoryLayers;
