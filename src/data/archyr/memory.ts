export interface TemporalClaimField {
  name: string;
  reason: string;
}

export interface MemorySignal {
  id: string;
  item: string;
  cadence: string;
  action: string;
  updates: string;
  approver: string;
}

export type MemoryStance = "Adopt" | "Reject" | "Defer";

export interface MemoryLandscapeItem {
  technology: string;
  contribution: string;
  stance: MemoryStance;
  why: string;
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
    id: "human-approval-rejection",
    item: "Human approval / rejection",
    cadence: "immediate",
    action: "Captured as structured review events.",
    updates: "Publish and merge gates, memo status, and low-confidence merge controls.",
    approver: "Partner + designated reviewer",
  },
  {
    id: "eval-failures",
    item: "Reviewer-agent eval scores",
    cadence: "daily during build phase",
    action: "Used for eval drift detection and routing policy tuning.",
    updates: "Routers, rubric thresholds, and failure retry policy.",
    approver: "QA lead after evidence check",
  },
  {
    id: "retrieval-clicks",
    item: "Retrieval click-through",
    cadence: "weekly",
    action: "Used to tune retrieval and reranking.",
    updates: "Ranking weights and reranker thresholds.",
    approver: "Data owner (partner loop leader)",
  },
  {
    id: "partner-feedback",
    item: "Partner feedback",
    cadence: "weekly",
    action: "Used for prompt and section style improvement.",
    updates: "Prompt wording, memo sections, and escalation hints.",
    approver: "Partnership lead",
  },
  {
    id: "outcomes",
    item: "Deal outcomes years later",
    cadence: "quarterly or annually",
    action: "Long-term signal for retrospective system quality.",
    updates: "Signal weighting, memory decay assumptions, and diligence playbooks.",
    approver: "Portfolio governance forum",
  },
  {
    id: "skills",
    item: "Skill performance",
    cadence: "versioned/eval-gated",
    action: "Promote only after evaluation checks pass.",
    updates: "Skills and SOPs only after eval gates pass.",
    approver: "Owner + QA before release",
  },
];

export const memoryLandscape: MemoryLandscapeItem[] = [
  {
    technology: "MemPalace",
    contribution: "Method-of-loci memory framing for long-horizon episodic retrieval.",
    stance: "Defer",
    why: "Stronger novelty than fit for two-person MVP; too hard to keep evidence provenance and reversibility first.",
  },
  {
    technology: "Hierarchical memory skills",
    contribution: "Reusable memory-writing playbooks by domain and confidence tier.",
    stance: "Adopt",
    why: "Fits our skill model and keeps recall behavior consistent across sectors.",
  },
  {
    technology: "Vector-only memory",
    contribution: "Fast semantic lookup for first-pass retrieval.",
    stance: "Reject",
    why: "Insufficient for auditability, temporal claims, and merge safety in diligence.",
  },
  {
    technology: "HippoRAG",
    contribution: "Graph-like memory compression and retrieval over evolving context.",
    stance: "Defer",
    why: "Worth watching, but premature relative to Postgres-first and low team size.",
  },
  {
    technology: "EM-LLM",
    contribution: "Model-conditioned memory policies and adaptation loop.",
    stance: "Reject",
    why: "Unclear observability and harder to enforce deterministic guardrails now.",
  },
  {
    technology: "Titans",
    contribution: "Large-context memory-heavy orchestration pattern.",
    stance: "Defer",
    why: "Promising, but heavy for current scope and not yet tied to explicit VC-specific eval gates.",
  },
  {
    technology: "Anthropic memory tooling",
    contribution: "Production-friendly memory primitives with context contracts.",
    stance: "Adopt",
    why: "Useful where it aligns to prompt contracts and human checkpoints; not a replacement for custom memory schema.",
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
