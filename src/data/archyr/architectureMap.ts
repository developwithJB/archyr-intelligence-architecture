export type ArchitectureMapNodeId =
  | "inputs"
  | "ingestion"
  | "knowledgeGateway"
  | "storage"
  | "agentWorkflow"
  | "outputs"
  | "evaluationGovernance";

export interface ArchitectureMapNode {
  id: ArchitectureMapNodeId;
  title: string;
  purpose: string;
  whyExists: string;
  failureMode: string;
  alternativeRejected: string;
}

export interface ArchitectureMapEdge {
  from: ArchitectureMapNodeId;
  to: ArchitectureMapNodeId;
}

export const architectureMapNodes: ArchitectureMapNode[] = [
  {
    id: "inputs",
    title: "Inputs",
    purpose: "Collect data room files, transcripts, emails, URLs, and analyst notes as immutable source artifacts.",
    whyExists: "No workflow can begin without an auditable ingestion source set.",
    failureMode: "Unstructured or missing inputs create silent hallucinations and irreproducible outputs.",
    alternativeRejected: "Freeform chat intake without normalized upload and manifest tracking.",
  },
  {
    id: "ingestion",
    title: "Ingestion & Parsing",
    purpose: "Parse, chunk, normalize, and attach provenance to every incoming artifact.",
    whyExists: "Structured ingest is required before any reliable retrieval, extraction, or scoring.",
    failureMode: "Parser drift, dropped sections, and corrupted offsets break downstream claims.",
    alternativeRejected: "Direct model reading of full PDFs without deterministic chunk metadata.",
  },
  {
    id: "knowledgeGateway",
    title: "KnowledgeGateway",
    purpose: "Provide a narrow, typed API for all storage and retrieval interactions.",
    whyExists: "Prevents direct storage shape leakage into agents and centralizes policy enforcement.",
    failureMode: "Bypassing gateway logic weakens governance and makes security, auditability, and retries inconsistent.",
    alternativeRejected: "Letting agents call storage tables and external APIs directly.",
  },
  {
    id: "storage",
    title: "Storage Layer",
    purpose: "Persist structured records, artifacts, temporal claims, and retrieval indexes.",
    whyExists: "Postgres and derived stores provide durable state for long-lived diligence evidence.",
    failureMode: "Single-source-of-truth gaps and stale or duplicated records.",
    alternativeRejected: "Vector-only memory as the only source of evidence authority.",
  },
  {
    id: "agentWorkflow",
    title: "Agent Workflow Layer",
    purpose: "Run deterministic workflow nodes for extraction, classification, drafting, and review gating.",
    whyExists: "Bounded workers with checkpoints beat unbounded autonomous coordination.",
    failureMode: "Uncontrolled multi-agent loops produce inconsistent state and unbounded costs.",
    alternativeRejected: "Autonomous swarm orchestration as the default routing plane.",
  },
  {
    id: "outputs",
    title: "Outputs",
    purpose: "Create partner-facing memos, structured summaries, and action items with evidence traces.",
    whyExists: "Human decision support requires reviewable artifacts, not raw model text.",
    failureMode: "Unsupported claims or uncited statements pass to partners without visible provenance.",
    alternativeRejected: "Publishing raw generated prose without source or confidence surfaces.",
  },
  {
    id: "evaluationGovernance",
    title: "Evaluation & Governance",
    purpose: "Apply schema checks, citation checks, cost/latency gates, and escalation policies before release.",
    whyExists: "Diligence requires trust infrastructure before confidence claims are surfaced.",
    failureMode: "Unchecked defects become institutionalized and costly across all subsequent deals.",
    alternativeRejected: "Treating eval and governance as optional afterthoughts.",
  },
];

export const architectureMapEdges: ArchitectureMapEdge[] = [
  { from: "inputs", to: "ingestion" },
  { from: "ingestion", to: "knowledgeGateway" },
  { from: "knowledgeGateway", to: "storage" },
  { from: "storage", to: "agentWorkflow" },
  { from: "agentWorkflow", to: "outputs" },
  { from: "outputs", to: "evaluationGovernance" },
];
