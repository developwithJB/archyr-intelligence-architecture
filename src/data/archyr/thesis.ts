export const title = "Archyr Intelligence Layer Architecture";

export const subtitle =
  "A clickable architecture artifact for building a VC diligence system that compounds across deals.";

export const coreThesis =
  "Archyr should not be built as an autonomous agent swarm. It should be a deterministic diligence workflow system with LLM agents used as bounded workers around ingestion, extraction, memo drafting, retrieval, review, and memory updates.";

export const operatingPrinciples = [
  "Durable workflows beat agent swarms.",
  "Evidence-backed claims beat confident prose.",
  "Temporal memory beats vague model memory.",
  "Typed outputs beat unstructured agent chatter.",
  "Human approval gates beat silent self-modification.",
  "Postgres-first beats premature infrastructure sprawl.",
] as const;

export const finalRecommendation =
  "Use LangGraph as the durable workflow spine, Pydantic AI for typed agent outputs, Claude Skills for reusable domain SOPs, MCP as the connector layer, Postgres as the source of truth, pgvector for retrieval, object storage for raw artifacts, DuckDB for financial and export analysis, Redis for job control, and optional graph indexing when relationship traversal proves valuable.";

export type ArchitectureSectionId =
  | "home"
  | "architecture-routes"
  | "agent-harness"
  | "data-layer"
  | "memory"
  | "speed-accuracy-cost"
  | "evaluation-trust"
  | "skepticism"
  | "workflow-demo"
  | "architecture-map"
  | "sources";

export interface SiteSection {
  id: ArchitectureSectionId;
  label: string;
  title: string;
  subtitle: string;
}

export const siteSections: SiteSection[] = [
  {
    id: "home",
    label: "Home / Thesis",
    title: "Home / Thesis",
    subtitle: "A clickable architecture artifact for building a VC diligence system that compounds across deals.",
  },
  {
    id: "architecture-routes",
    label: "Architecture Routes",
    title: "Architecture Routes",
    subtitle: "Choose and compare the core architectural route.",
  },
  {
    id: "architecture-map",
    label: "Architecture Map",
    title: "Architecture Map",
    subtitle: "Interactive flow from inputs to governance with explicit checkpoints.",
  },
  {
    id: "agent-harness",
    label: "Agent Harness",
    title: "Agent Harness & Orchestration",
    subtitle: "LLM workers are bounded by deterministic workflows.",
  },
  {
    id: "data-layer",
    label: "Data Layer",
    title: "Data Layer",
    subtitle: "Postgres first, then retrieval and analytics layers.",
  },
  {
    id: "memory",
    label: "Memory",
    title: "Memory & Self-Learning",
    subtitle: "Temporal memory as a first-class system feature.",
  },
  {
    id: "speed-accuracy-cost",
    label: "Speed, Accuracy & Cost",
    title: "Speed, Accuracy & Cost",
    subtitle: "Trade off quality, spend, and latency with guardrails.",
  },
  {
    id: "evaluation-trust",
    label: "Evaluation",
    title: "Evaluation & Trust",
    subtitle: "Measure factual quality, citation discipline, and safety.",
  },
  {
    id: "skepticism",
    label: "Skepticism",
    title: "Skepticism",
    subtitle: "Challenge assumptions and model-led shortcuts.",
  },
  {
    id: "workflow-demo",
    label: "Workflow Demo",
    title: "Workflow Demo",
    subtitle: "A walkthrough of deterministic diligence stages.",
  },
  {
    id: "sources",
    label: "Sources",
    title: "Sources / Build Notes",
    subtitle: "Assumptions and references behind architecture choices.",
  },
];

export interface ThesisOverview {
  title: string;
  subtitle: string;
  coreThesis: string;
  operatingPrinciples: readonly string[];
  finalRecommendation: string;
}

export const thesis: ThesisOverview = {
  title,
  subtitle,
  coreThesis,
  operatingPrinciples,
  finalRecommendation,
};
