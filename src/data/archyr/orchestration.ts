export type DiagramCategory = "workflow" | "data" | "evaluation" | "infra" | "routing";

export interface ArchitectureNode {
  id: string;
  title: string;
  category: DiagramCategory;
  summary: string;
  contract: string;
  x: number;
  y: number;
  relatedRoute?: string;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label: string;
}

export const architectureNodes: ArchitectureNode[] = [
  {
    id: "langgraph",
    title: "LangGraph Orchestrator",
    category: "workflow",
    summary:
      "Durable workflow engine for checkpointed stages and resumable runs.",
    contract: "Input: job intent, source set, policy envelope. Output: stage events and state transitions.",
    x: 14,
    y: 18,
    relatedRoute: "normalize",
  },
  {
    id: "knowledge-gateway",
    title: "KnowledgeGateway API",
    category: "routing",
    summary:
      "Single interface for all structured write and retrieval operations.",
    contract: "Workers call typed APIs only. No direct table contracts are exposed to LLM workers.",
    x: 14,
    y: 42,
    relatedRoute: "classify",
  },
  {
    id: "connectors",
    title: "MCP Connector Layer",
    category: "infra",
    summary: "Tool adapters for files, exports, web, CRM, and email sources.",
    contract: "Connector returns normalized typed source payload with provenance.",
    x: 14,
    y: 66,
    relatedRoute: "ingest",
  },
  {
    id: "ingestion",
    title: "Ingestion Workers",
    category: "workflow",
    summary: "Bounded ingestion with retries and quarantine routing.",
    contract: "Input artifacts and manifest. Output: immutable object refs and chunk metadata.",
    x: 34,
    y: 20,
    relatedRoute: "ingest",
  },
  {
    id: "canonicalizer",
    title: "Pydantic AI Canonicalizers",
    category: "workflow",
    summary: "Strict schema extraction into typed chunks and candidate entities.",
    contract: "Each chunk carries confidence, schema path, and parser reason when invalid.",
    x: 34,
    y: 56,
    relatedRoute: "normalize",
  },
  {
    id: "postgres",
    title: "Postgres Core",
    category: "data",
    summary: "Source of truth for deals, entities, claims, approvals, and audit.",
    contract:
      "Append-only events, idempotent keys, temporal ranges, and actor attribution.",
    x: 58,
    y: 13,
  },
  {
    id: "pgvector",
    title: "pgvector Search",
    category: "data",
    summary: "Semantic retrieval over memo history and precedent.",
    contract: "Embeddings and chunks are indexed with source IDs, scope, and confidence.",
    x: 58,
    y: 31,
  },
  {
    id: "bm25",
    title: "Hybrid Retrieval",
    category: "data",
    summary: "BM25 for exact matches plus dense search for semantic recall.",
    contract: "Both indexes feed contextual retrieval for drafting and answering ad hoc questions.",
    x: 58,
    y: 49,
  },
  {
    id: "classifier",
    title: "Classification Workers",
    category: "workflow",
    summary: "Deterministic classification with confidence-aware fallback.",
    contract: "Structured labels plus risk score and source IDs are emitted together.",
    x: 74,
    y: 58,
    relatedRoute: "classify",
  },
  {
    id: "duckdb",
    title: "DuckDB Analytics",
    category: "data",
    summary: "Fast financial transformations and export reconciliation.",
    contract: "Run SQL on immutable snapshots and emit formula lineage for each metric.",
    x: 74,
    y: 16,
  },
  {
    id: "analytics",
    title: "Financial Analytics Worker",
    category: "workflow",
    summary: "Unit economics and risk metrics with consistency checks.",
    contract: "Outputs carry reconciliation status and anomaly flags.",
    x: 74,
    y: 48,
    relatedRoute: "analyze",
  },
  {
    id: "memo-worker",
    title: "Memo Authoring",
    category: "workflow",
    summary: "Draft sections with evidence map and assumption ledger.",
    contract: "Every factual line maps to claim IDs and source artifact IDs.",
    x: 88,
    y: 22,
    relatedRoute: "memo",
  },
  {
    id: "review-gate",
    title: "Reviewer Gate",
    category: "workflow",
    summary: "Human approval layer with override reasons and rollback metadata.",
    contract: "Approvals capture actor, diff list, rationale, and confidence updates.",
    x: 88,
    y: 50,
    relatedRoute: "review",
  },
  {
    id: "memory",
    title: "Memory & Feedback Store",
    category: "data",
    summary: "Temporal memory for claims, edits, and strategy outcomes.",
    contract: "Writes store validFrom, validTo, observedAt, sourceSpan, and supersedesClaimId.",
    x: 74,
    y: 76,
    relatedRoute: "memory",
  },
  {
    id: "redis",
    title: "Redis Control Plane",
    category: "infra",
    summary: "Runtime locks, budgets, and circuit breaker state.",
    contract: "Lock state with heartbeat and backoff counters for reliability.",
    x: 16,
    y: 76,
  },
  {
    id: "object-store",
    title: "Object Storage",
    category: "infra",
    summary: "Immutable raw files and intermediate artifacts for replay.",
    contract: "Append-only prefixes by deal, route, stage, and run id.",
    x: 36,
    y: 82,
  },
  {
    id: "braintrust",
    title: "Eval and Observability",
    category: "evaluation",
    summary: "Quality grading, latency tracking, and confidence drift detection.",
    contract: "Every stage emits trace ids, hard gates, and eval metrics.",
    x: 88,
    y: 76,
  },
];

export const architectureEdges: ArchitectureEdge[] = [
  { from: "langgraph", to: "connectors", label: "source task" },
  { from: "connectors", to: "ingestion", label: "manifest" },
  { from: "ingestion", to: "canonicalizer", label: "raw chunks" },
  { from: "canonicalizer", to: "knowledge-gateway", label: "typed chunks" },
  { from: "knowledge-gateway", to: "postgres", label: "persist records" },
  { from: "postgres", to: "pgvector", label: "index text and history" },
  { from: "pgvector", to: "bm25", label: "blend search" },
  { from: "bm25", to: "classifier", label: "candidate evidence" },
  { from: "canonicalizer", to: "classifier", label: "entity candidates" },
  { from: "classifier", to: "duckdb", label: "classified exports" },
  { from: "duckdb", to: "analytics", label: "metric queries" },
  { from: "analytics", to: "memo-worker", label: "insight blocks" },
  { from: "memo-worker", to: "review-gate", label: "draft" },
  { from: "review-gate", to: "memory", label: "approval and edits" },
  { from: "review-gate", to: "memory", label: "feedback events" },
  { from: "redis", to: "langgraph", label: "locks and budgets" },
  { from: "memo-worker", to: "object-store", label: "artifacts" },
  { from: "memory", to: "braintrust", label: "eval feedback" },
  { from: "object-store", to: "braintrust", label: "trace replay" },
];

export interface OrchestrationHighlight {
  title: string;
  summary: string;
  badgeLabel: string;
  badgeVariant: "default" | "outline" | "warning" | "success";
}

export interface OrchestrationComparison {
  id: string;
  name: string;
  fit: string;
  whyWorks: string[];
  whyNotAsCore: string[];
  verdict: string;
  recommended: boolean;
}

export interface CoordinationPattern {
  id: string;
  title: string;
  summary: string;
  detail: string;
}

export interface DecisionRule {
  type: "Tool" | "MCP server" | "Skill" | "Subagent" | "Workflow node";
  meaning: string;
  detail: string;
}

export interface SkillStance {
  title: string;
  guidance: string;
  constraint: string;
}

export interface OrchestrationRecommendation {
  recommendation: string;
  reason: string;
}

export const orchestrationRecommendation: OrchestrationRecommendation = {
  recommendation: "LangGraph should be the orchestration core.",
  reason:
    "Archyr workflows are long-running, multi-step, stateful, and review-heavy. Data room ingestion, memo drafting, entity resolution, partner review, and skill updates require checkpoints, retries, human approval, and resumability. A durable workflow graph is a better center of gravity than an agent swarm.",
};

export const orchestrationHighlights: OrchestrationHighlight[] = [
  {
    title: "Bounded orchestration",
    summary:
      "LLM agents operate in narrow roles with strict contracts, while LangGraph controls durable flow and state transitions.",
    badgeLabel: "Recommended",
    badgeVariant: "success",
  },
  {
    title: "Typed interfaces",
    summary:
      "Pydantic AI is used at worker boundaries for validated structured output, easier retries, and less downstream ambiguity.",
    badgeLabel: "Typed",
    badgeVariant: "outline",
  },
  {
    title: "Governance-first",
    summary:
      "Human checkpoints, approval metadata, and replayable artifacts reduce silent drift and keep diligence auditable.",
    badgeLabel: "Production",
    badgeVariant: "default",
  },
];

export const orchestrationComparisons: OrchestrationComparison[] = [
  {
    id: "orchestrate-claude-agent-sdk",
    name: "Claude Agent SDK",
    fit: "Excellent for Claude-native tools, skills, MCP, and file workflows. Use selectively.",
    whyWorks: [
      "Excellent for Claude-native tools, skills, MCP, and file workflows.",
      "Useful for selective worker integrations where direct file/tool handling is strong.",
    ],
    whyNotAsCore: [
      "Durable multi-day diligence workflows need a broader production workflow backbone.",
      "Skills alone do not solve resumability, approvals, and deterministic rollback in long pipelines.",
    ],
    verdict: "Use selectively.",
    recommended: false,
  },
  {
    id: "orchestrate-langgraph",
    name: "LangGraph",
    fit: "Best fit for durable workflows, human checkpoints, retries, and production control.",
    whyWorks: [
      "Durable workflows map directly to diligence processes.",
      "Human checkpoints are natural.",
      "Typed outputs reduce downstream chaos.",
      "Easy to inspect, test, retry, and resume.",
      "Strong upgrade path as system grows.",
    ],
    whyNotAsCore: [],
    verdict: "Core recommendation.",
    recommended: true,
  },
  {
    id: "orchestrate-crewai",
    name: "CrewAI",
    fit: "Useful for demos and role-based agent collaboration.",
    whyWorks: [
      "Works well when you need role-based handoffs between agents in small experiments.",
    ],
    whyNotAsCore: [
      "Less ideal as the main production workflow spine for long-running diligence.",
    ],
    verdict: "Not core.",
    recommended: false,
  },
  {
    id: "orchestrate-openai-swarm",
    name: "OpenAI Swarm",
    fit: "Useful as architectural reference, not full production.",
    whyWorks: [
      "Useful reference pattern for agent choreography and messaging patterns.",
    ],
    whyNotAsCore: [
      "Insufficient as a full production architecture for the diligence lifecycle.",
    ],
    verdict: "Reference only.",
    recommended: false,
  },
  {
    id: "orchestrate-mastra",
    name: "Mastra",
    fit: "Promising TypeScript agent framework. Worth watching.",
    whyWorks: [
      "Good potential for typed workflow-like agent definitions in TypeScript.",
      "Developer ergonomics can be strong for product teams.",
    ],
    whyNotAsCore: [
      "Not yet the default core pick without more production maturity.",
    ],
    verdict: "Watch list.",
    recommended: false,
  },
  {
    id: "orchestrate-pydantic-ai",
    name: "Pydantic AI",
    fit: "Strong typed workers inside workflow nodes.",
    whyWorks: [
      "Excellent for typed agents and structured outputs.",
      "Best used as enforcement layer at node boundaries.",
    ],
    whyNotAsCore: [
      "It is not itself a durable workflow coordinator.",
    ],
    verdict: "Use inside nodes.",
    recommended: true,
  },
  {
    id: "orchestrate-hand-rolled",
    name: "Hand-rolled",
    fit: "Tempting early but increases orchestration debt.",
    whyWorks: [
      "Fastest to start for a rough prototype with one engineer.",
    ],
    whyNotAsCore: [
      "Creates orchestration debt quickly as requirements grow.",
      "Harder to guarantee retries, checkpoints, and auditability over time.",
    ],
    verdict: "Avoid as core.",
    recommended: false,
  },
  {
    id: "orchestrate-superpowers",
    name: "Superpowers",
    fit: "Meta-framework for packaging reusable capabilities across tools and prompts.",
    whyWorks: [
      "Useful for packaging repeatable capability wrappers and local tooling conventions.",
      "De-risks copy/paste behavior around skill invocation.",
    ],
    whyNotAsCore: [
      "Limited durable orchestration support for multi-day diligence state.",
      "Weak under load because retries, resumability, and audit boundaries are externalized.",
      "Less useful for high-stakes VC workflows where every merge decision needs explicit review control.",
    ],
    verdict: "Defer.",
    recommended: false,
  },
  {
    id: "orchestrate-harness",
    name: "Harness",
    fit: "Workflow and task framework intended for general automation and execution plumbing.",
    whyWorks: [
      "Good at stitching non-AI tasks with deterministic runs.",
      "Strong for predictable process automation in non-diligence surfaces.",
    ],
    whyNotAsCore: [
      "Missing the agent-contract granularity we need for LLM handoffs.",
      "Breaks where VC workflows demand evidence-anchored model decisions, not just task dispatch.",
      "Harder to map to human override gates without a dedicated long-running agent graph.",
    ],
    verdict: "Defer.",
    recommended: false,
  },
  {
    id: "orchestrate-archon",
    name: "Archon",
    fit: "Knowledge-centric platform pattern for memory and context orchestration.",
    whyWorks: [
      "Useful for organizing and exposing project context.",
      "Can reduce startup boilerplate around context hydration.",
    ],
    whyNotAsCore: [
      "Context hydration itself is insufficient without durable route-level checkpoints.",
      "Can drift from canonical evidence contracts under parallel context growth.",
      "Not ideal as first layer for two-person teams maintaining VC memory and approvals.",
    ],
    verdict: "Defer.",
    recommended: false,
  },
  {
    id: "orchestrate-ecc",
    name: "ECC",
    fit: "Event/call-control oriented harness pattern for tool choreography.",
    whyWorks: [
      "Strong where deterministic execution and event boundaries are the main need.",
      "Clean mental model for call-level tracing.",
    ],
    whyNotAsCore: [
      "Lacks native handling for evidence-heavy LLM arbitration across long memory lifecycles.",
      "Under multi-context pressure, failure isolation and merge semantics are weaker than a workflow graph.",
      "Adds unnecessary indirection for a team that already needs durable graph-like orchestration.",
    ],
    verdict: "Defer.",
    recommended: false,
  },
];

export const coordinationPatterns: CoordinationPattern[] = [
  {
    id: "pattern-pipeline",
    title: "Pipeline",
    summary: "ingest, parse, extract, resolve, retrieve, draft, review",
    detail:
      "A linear path with explicit checkpoints and schema checks at each diligence milestone.",
  },
  {
    id: "pattern-fan-out-fan-in",
    title: "Fan-out / fan-in",
    summary: "Parallel specialist analysis and consolidated synthesis",
    detail:
      "Market, financials, founder, and risk streams run independently and merge into a stable review state.",
  },
  {
    id: "pattern-producer-reviewer",
    title: "Producer-reviewer",
    summary: "Memo drafter and skeptical reviewer",
    detail:
      "Drafting and critical review stay separate so assumptions are challenged before approval.",
  },
  {
    id: "pattern-supervisor",
    title: "Supervisor",
    summary: "Controls state, budget, retries, and gates",
    detail:
      "A deterministic control layer decides reruns, escalations, and manual checkpoints.",
  },
  {
    id: "pattern-expert-pool",
    title: "Expert pool",
    summary: "Specialized domain workers",
    detail:
      "SaaS revenue, marketplace dynamics, GTM, and financial exports each get dedicated bounded workers.",
  },
  {
    id: "pattern-hierarchical",
    title: "Hierarchical delegation",
    summary: "Escalate only for complex diligence",
    detail:
      "Multi-level coordination is reserved for difficult contexts, not the default mode.",
  },
];

export const decisionRules: DecisionRule[] = [
  {
    type: "Tool",
    meaning: "Tool = deterministic operation",
    detail:
      "Use tools for repeatable, auditable operations that do not require model judgment in every step.",
  },
  {
    type: "MCP server",
    meaning: "MCP server = connector to external or internal system",
    detail: "Every integration boundary should be an MCP-exposed operation with consistent auth and payload semantics.",
  },
  {
    type: "Skill",
    meaning: "Skill = reusable domain SOP",
    detail: "Skills define reusable playbooks for repeatable diligence behavior.",
  },
  {
    type: "Subagent",
    meaning: "Subagent = isolated model worker with narrow role and summary-only return",
    detail: "Keep returned state minimal, explicit, and auditable.",
  },
  {
    type: "Workflow node",
    meaning: "Workflow node = anything durable, auditable, retryable, or gated",
    detail:
      "Long-lived and review-heavy behavior must live in durable workflow nodes rather than freeform chats.",
  },
];

export const skillStance: SkillStance = {
  title: "Filesystem-native skills",
  guidance:
    "Adopt them as versioned internal playbooks. Avoid letting skills self-update silently.",
  constraint:
    "Any important skill update must pass eval evidence and human approval before promotion.",
};
