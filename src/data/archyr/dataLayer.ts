export interface DataLayerRow {
  title: string;
  purpose: string;
  contract: string[];
  placement: string;
}

export interface DataStoreItem {
  store: string;
  purpose: string;
  whatItStores: string;
  whenToUse: string;
  whenNotToUse: string[];
  category: "canonical" | "derived";
}

export interface RetrievalConfig {
  type: string;
  description: string;
}

export interface GatewayExample {
  name: string;
  request: string;
  behavior: string;
}

export interface DataLifecycleNode {
  id: string;
  title: string;
  note: string;
}

export interface MvpFutureStatePlan {
  phase: string;
  instruction: string;
}

export const dataLayerRecommendation = "Postgres-first, with derived search and graph indexes.";

export const mvpVsFutureState: MvpFutureStatePlan[] = [
  {
    phase: "Day 0 MVP",
    instruction:
      "Postgres + pgvector + object storage. Keep Postgres as canonical, store vectors and artifacts as derived views.",
  },
  {
    phase: "Future scale trigger",
    instruction:
      "Add Redis when workflow runtime needs locks, budgets, queue state, or circuit breakers.",
  },
  {
    phase: "Future analytics scale trigger",
    instruction:
      "Add DuckDB when financial export analysis becomes painful in Postgres and query speed becomes a team blocker.",
  },
  {
    phase: "Future relationship scale trigger",
    instruction:
      "Add Kuzu or Neo4j only when repeated 2+ hop relationship queries justify graph ops over joins.",
  },
  {
    phase: "Canonical rule",
    instruction: "Do not make graph canonical on day one.",
  },
];

export const coreStorage: DataStoreItem[] = [
  {
    store: "Postgres",
    purpose: "Canonical source for companies, people, deals, facts, claims, relationships, memo sections, feedback events, and evals.",
    whatItStores: "All structured operational records and audit history.",
    whenToUse: "Default source of truth for durable state, joins, permissions, and review trails.",
    whenNotToUse: [
      "Do not store raw files.",
      "Do not use as an unstructured semantic-first memory.",
    ],
    category: "canonical",
  },
  {
    store: "pgvector",
    purpose: "Semantic retrieval over document chunks and memo history.",
    whatItStores: "Embedding vectors and recall metadata.",
    whenToUse: "Use for evidence retrieval and precedent lookup where semantic recall matters.",
    whenNotToUse: [
      "Not for source-of-truth authority.",
      "Not for workflow control state.",
    ],
    category: "derived",
  },
  {
    store: "Object storage",
    purpose: "Immutable raw decks, exports, emails, transcripts, PDFs, and generated artifacts.",
    whatItStores: "Binary files with provenance references and run lineage.",
    whenToUse: "Always for immutable raw inputs and artifact outputs.",
    whenNotToUse: [
      "Do not treat raw files as canonical structured state.",
    ],
    category: "derived",
  },
  {
    store: "DuckDB",
    purpose: "Financial export analysis and ad-hoc analytics.",
    whatItStores: "Computed metric snapshots from immutable inputs.",
    whenToUse: "Use for analyst-style calculations and fast local financial transformations.",
    whenNotToUse: ["Not as the primary transaction store."],
    category: "derived",
  },
  {
    store: "Redis",
    purpose: "Short-lived workflow state, locks, rate limits, circuit-breaker state.",
    whatItStores: "Ephemeral control-plane telemetry.",
    whenToUse: "Use for resumability controls and safe retries.",
    whenNotToUse: ["Not as historical truth.", "Not as a place for evidence that needs auditability."],
    category: "derived",
  },
  {
    store: "Kuzu or Neo4j",
    purpose: "Relationship traversal index for proven graph use cases.",
    whatItStores: "Derived graph edges and traversal metadata.",
    whenToUse: "Only when relationship-first questions outpace SQL joins.",
    whenNotToUse: ["Not as canonical source of record.", "Not for basic CRM filters or memo status queries."],
    category: "derived",
  },
];

export const optionalGraphStores = ["Kuzu", "Neo4j"];

export const retrievalConfig: RetrievalConfig[] = [
  {
    type: "pgvector semantic search",
    description: "High recall over chunks and memo context with scope and temporal filters.",
  },
  {
    type: "Postgres-backed metadata",
    description: "Exact filters on deals, creators, entities, and audit state.",
  },
  {
    type: "Hybrid retrieval",
    description: "Combine structured and semantic signals before drafting or answering.",
  },
];

export const gatewayExamples: GatewayExample[] = [
  {
    name: "searchEvidence",
    request: "searchEvidence(query, dealId, scope, modes, asOf, k)",
    behavior: "Returns scoped evidence with source spans, scores, confidence bands, and freshness tags.",
  },
  {
    name: "getEntityProfile",
    request: "getEntityProfile(entityId, asOf)",
    behavior: "Returns normalized entity profile, aliases, relationships, and active claims.",
  },
  {
    name: "writeClaims",
    request: "writeClaims(dealId, claims, provenance, confidence, extractorVersion)",
    behavior: "Persists structured claims with temporal bounds and mandatory review metadata.",
  },
  {
    name: "resolveEntity",
    request: "resolveEntity(mentions, candidateTypes, confidenceThresholds)",
    behavior: "Proposes deterministic candidates first, with LLM adjudication only after narrowing.",
  },
  {
    name: "queryFinancials",
    request: "queryFinancials(dealId, metric, period, sourcePreference)",
    behavior: "Runs deterministic finance lookup and returns source-attributed numeric series.",
  },
];

export const dataLifecycle: DataLifecycleNode[] = [
  {
    id: "raw",
    title: "Raw ingestion",
    note: "Immutable uploads: decks, PDFs, transcripts, emails, and exports.",
  },
  {
    id: "canonical",
    title: "Canonical entities and chunks",
    note: "Structured parsing with provenance, schema validation, and deterministic candidate generation.",
  },
  {
    id: "analysis",
    title: "Analysis products",
    note: "Financial metrics, classifications, and claims with confidence and review state.",
  },
  {
    id: "memory",
    title: "Memory + eval updates",
    note: "Temporal evidence, feedback loops, and retrieval index updates for next runs.",
  },
];

export const architectureLayers: DataLayerRow[] = coreStorage.map((store) => ({
  title: store.store,
  purpose: store.purpose,
  contract: [store.whatItStores, store.whenToUse, ...store.whenNotToUse],
  placement: store.category === "canonical" ? "Primary source-of-truth path" : "Derived / enrichment path",
}));

export const storageDecisionGrid: DataStoreItem[] = coreStorage;

export const whyPostgresFirst: string[] = [
  "Two-person team needs operational simplicity first.",
  "Postgres handles structured joins, transactions, permissions, and auditability.",
  "pgvector is sufficient early for semantic retrieval.",
  "Dedicated vector or graph stores can be added only when query patterns demand them.",
];

export const knowledgeGatewayMethodList: GatewayExample[] = gatewayExamples;

export const entityResolutionSample = {
  target: ["Lumenflow", "Lumenflow Inc.", "lumenflow.io"],
  steps: [
    "Deterministic candidate generation across exact name, legal entity, and domain variants for Lumenflow / Lumenflow Inc. / lumenflow.io.",
    "Evidence scoring using source strength, recency, and conflict penalties (no model judgment yet).",
    "LLM adjudication only after narrowing to top candidates and low-ambiguity fields.",
    "Human review for low-confidence merges, with explicit merge override path.",
  ],
};

export const biggestFailureMode =
  "Key failure mode: false positive merge corrupting future memos and relationship memory.";

export const graphWhereItWins = [
  "Founder/investor/advisor/customer relationships",
  "Warm intros",
  "Sector maps",
  "Competitor/customer relationships",
  "Cross-deal pattern questions",
];

export const graphWhereOverkill = [
  "Deal stages",
  "Memo status",
  "CRM filters",
  "Artifact metadata",
  "Basic company/person joins",
];
