import { thesis } from "@/src/data/archyr/thesis";
import { architectureRouteCards } from "@/src/data/archyr/routes";

export const workflowModes = ["fast", "accurate", "cheap"] as const;
export type WorkflowMode = (typeof workflowModes)[number];

export interface WorkflowModeExplanation {
  id: WorkflowMode;
  label: string;
  rationale: string;
  profile: string[];
}

export type GateType = "hard gate" | "soft gate";

export interface WorkflowDemoStep {
  id: number;
  title: string;
  summary: string;
  componentResponsible: string;
  modelTier: string;
  dataWritten: string;
  failureMode: string;
  gateType: GateType;
  detail: string;
}

export const workflowModeExplanations: WorkflowModeExplanation[] = [
  {
    id: "fast",
    label: "Fast",
    rationale: "Prefer throughput and low latency for lower-risk runs.",
    profile: [
      "Single pass for low-risk fields.",
      "Tighter timeouts and tighter retry budgets.",
      "Evidence requirement remains in place.",
    ],
  },
  {
    id: "accurate",
    label: "Accurate",
    rationale: "Prioritize correctness for memo-grade outputs and high-risk deals.",
    profile: [
      "Dual pass checks on key diligence claims.",
      "Broader reviewer-oriented contradiction checks.",
      "Increased reranking and confidence calibration.",
    ],
  },
  {
    id: "cheap",
    label: "Cheap",
    rationale: "Minimize spend where complexity and risk are lower.",
    profile: ["Leaner model depth on deterministic stages.", "Lower rerank breadth.", "Gates remain for publication boundaries."],
  },
];

export const workflowScenarios: Record<WorkflowMode, string> = {
  fast: "Speed-first route with constrained retries and fast publish checks.",
  accurate: "Quality-first route with extra contradiction and evidence checks.",
  cheap: "Cost-first route with narrower exploratory branches.",
};

export const workflowDemoSteps: WorkflowDemoStep[] = [
  {
    id: 1,
    title: "Upload target company materials",
    summary: "Collect deck, transcript, and export inputs into immutable storage.",
    componentResponsible: "Ingestion API + object storage manifest service",
    modelTier: "No model required (validation + checksums)",
    dataWritten: "Raw artifact records, file manifests, and checksum map",
    failureMode: "Missing files, stale links, corrupted uploads, or duplicate artifacts",
    gateType: "hard gate",
    detail: "The run is blocked until required artifacts are present and checksum-validated.",
  },
  {
    id: 2,
    title: "Parse and normalize artifacts",
    summary: "Transform raw inputs into typed chunks and normalized metadata.",
    componentResponsible: "Parser worker (structured chunker)",
    modelTier: "Haiku-class",
    dataWritten: "Parsed chunks, normalization records, parser confidence, and source spans",
    failureMode: "OCR failures, malformed chunk boundaries, missing structure fields",
    gateType: "hard gate",
    detail: "Normalization must produce stable chunk identifiers before extraction can proceed.",
  },
  {
    id: 3,
    title: "Extract structured facts",
    summary: "Pull key structured facts from normalized chunks with schema checks.",
    componentResponsible: "Extraction worker",
    modelTier: "Haiku-class",
    dataWritten: "Typed fact candidates with schema path, provenance, and confidence score",
    failureMode: "Fact schema mismatch, hallucinated field values, or duplicate extraction keys",
    gateType: "hard gate",
    detail: "Claims are validated against Pydantic contracts before persistence.",
  },
  {
    id: 4,
    title: "Resolve entities",
    summary: "Match mentions to canonical entities and track same-as candidates.",
    componentResponsible: "Entity resolution service",
    modelTier: "Haiku-class then Sonnet for tie-breaks",
    dataWritten: "Entity candidate sets, matching confidence, human-review flags",
    failureMode: "False-positive merges or missing same-as relationships",
    gateType: "hard gate",
    detail: "High-risk merges require explicit human approval before commit.",
  },
  {
    id: 5,
    title: "Retrieve supporting evidence",
    summary: "Build evidence bundles from retrieval indexes for each draft section.",
    componentResponsible: "KnowledgeGateway retrieval worker",
    modelTier: "Sonnet-class",
    dataWritten: "Evidence bundles keyed by claim, snippet IDs, and evidence freshness",
    failureMode: "Weak recall, stale evidence, or insufficient citation coverage",
    gateType: "hard gate",
    detail: "Drafting pauses until minimum evidence coverage reaches route threshold.",
  },
  {
    id: 6,
    title: "Draft investment memo",
    summary: "Compose memo sections with citations and explicit assumption ledgers.",
    componentResponsible: "Memo drafting worker",
    modelTier: "Sonnet-class",
    dataWritten: "Draft memo text, section-level citation map, and uncertainty flags",
    failureMode: "Overconfident claims, missing assumptions, uncited assertions",
    gateType: "hard gate",
    detail: "Every factual line includes claim IDs and source IDs.",
  },
  {
    id: 7,
    title: "Run skeptical reviewer",
    summary: "Run adversarial review pass for contradictions and missing support.",
    componentResponsible: "Skeptical reviewer node",
    modelTier: "Opus-class",
    dataWritten: "Reviewer notes, contradiction list, and revision recommendations",
    failureMode: "Conflict signals not surfaced, weak challenge on high-risk items",
    gateType: "soft gate",
    detail: "Softly escalates to analyst if conflicts are low-confidence.",
  },
  {
    id: 8,
    title: "Human approves or edits",
    summary: "Partner analyst accepts, edits, or rejects memo sections and routing decisions.",
    componentResponsible: "Human review interface",
    modelTier: "Human-in-the-loop",
    dataWritten: "Approval decisions, edit diffs, rejection reasons, and override log",
    failureMode: "Unreviewed edits, unclear feedback rationale, stalled review",
    gateType: "hard gate",
    detail: "No external publish without explicit human approval signature.",
  },
  {
    id: 9,
    title: "Update memory and skills",
    summary: "Propagate approved edits into temporal memory and skill feedback tracks.",
    componentResponsible: "Memory and skill update orchestrator",
    modelTier: "Sonnet-class + policy guardrails",
    dataWritten: "Temporal claim records, skill version updates, eval traces, and learning events",
    failureMode: "Unversioned skill changes, stale supersession links, or broken lineage",
    gateType: "soft gate",
    detail: "Only approved or confidence-stable updates become default behavior.",
  },
];

export const workflowContext = {
  totalSteps: workflowDemoSteps.length,
  routeCount: architectureRouteCards.length,
  thesisTitle: thesis.title,
};
