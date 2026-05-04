export type RouteVerdict =
  | "Adopt selectively, but do not make it the core system spine."
  | "Recommended route."
  | "Use graph where relationship traversal clearly earns its keep.";

export interface ArchitectureRoute {
  id: string;
  name: string;
  bestFor: string;
  coreStack: string[];
  whyItWorks: string[];
  whyNotAsCore?: string[];
  whyNotAsCoreIfAny?: string[];
  verdict: RouteVerdict;
}

export interface ArchitectureRouteCard {
  id: string;
  title: string;
  summary: string;
  stage?: string;
  inputs: string[];
  outputs: string[];
  guarantees: string[];
  failureHandling: string[];
  failureExamples: string[];
  diagramNodeId: string;
  bestFor: string;
  coreStack: string[];
  whyItWorks: string[];
  verdict: string;
}

export const architectureRoutes: ArchitectureRoute[] = [
  {
    id: "route-1",
    name: "Claude-native Skills OS",
    bestFor: "fastest frontier-native prototype",
    coreStack: [
      "Claude Agent SDK",
      "Claude Skills / SKILL.md",
      "MCP servers",
      "Postgres",
      "pgvector",
      "object storage",
    ],
    whyItWorks: [
      "Strong alignment with Claude’s agent ecosystem",
      "Skills are portable units of capability",
      "Good for domain playbooks like SaaS revenue QA, memo writing, and data room analysis",
      "Strong file and tool workflows",
    ],
    whyNotAsCore: [
      "Too vendor-native",
      "Durable multi-day diligence workflows need an external workflow backbone",
      "Skills need governance, versioning, evals, and approval gates",
    ],
    verdict: "Adopt selectively, but do not make it the core system spine.",
  },
  {
    id: "route-2",
    name: "Durable Workflow + Typed Intelligence Layer",
    bestFor: "production-quality architecture for a small team",
    coreStack: [
      "LangGraph",
      "Pydantic AI",
      "Postgres",
      "pgvector",
      "object storage",
      "DuckDB",
      "Redis",
      "MCP",
      "Braintrust or LangSmith",
    ],
    whyItWorks: [
      "Durable workflows map directly to diligence processes",
      "Human checkpoints are natural",
      "Typed outputs reduce downstream chaos",
      "Easy to inspect, test, retry, and resume",
      "Good upgrade path as the system grows",
    ],
    verdict: "Recommended route.",
  },
  {
    id: "route-3",
    name: "Graph / Memory-First Intelligence Layer",
    bestFor: "long-term compounding knowledge advantage",
    coreStack: [
      "Postgres",
      "Kuzu or Neo4j",
      "hybrid retrieval",
      "temporal knowledge graph",
      "memory and eval loop",
    ],
    whyItWorks: [
      "VC is relationship-heavy",
      "Cross-deal memory matters",
      "Graph traversal helps with founder, investor, customer, competitor, and sector relationships",
    ],
    whyNotAsCoreIfAny: [
      "Easy to overbuild",
      "Most early CRM queries are relational",
      "Graph should start as a derived index, not the canonical source of truth",
    ],
    verdict: "Use graph where relationship traversal clearly earns its keep.",
  },
];

export const architectureRouteCards: ArchitectureRouteCard[] = architectureRoutes.map((route) => ({
  id: route.id,
  title: route.name,
  summary: route.bestFor,
  stage: route.id,
  inputs: route.bestFor ? [route.bestFor] : [],
  outputs: [route.verdict],
  guarantees: route.whyItWorks,
  failureHandling: route.whyNotAsCore ?? route.whyNotAsCoreIfAny ?? [],
  failureExamples: route.whyNotAsCoreIfAny ? route.whyNotAsCoreIfAny : [],
  diagramNodeId: route.id,
  bestFor: route.bestFor,
  coreStack: route.coreStack,
  whyItWorks: route.whyItWorks,
  verdict: route.verdict,
}));
