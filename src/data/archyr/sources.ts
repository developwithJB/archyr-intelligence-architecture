export interface SourceItem {
  title: string;
  category: "primary" | "reference" | "pattern";
  tags?: string[];
  link?: string;
  note: string;
}

export interface BuildNote {
  section: string;
  note?: string;
  items?: string[];
}

export const sourceItems: SourceItem[] = [
  {
    title: "LangGraph durable execution",
    category: "primary",
    tags: ["workflow", "durability", "stateful graph"],
    link: "https://www.langchain.com/langgraph",
    note: "Chosen as the durable workflow spine for long-running diligence processes and resumable states.",
  },
  {
    title: "Pydantic AI",
    category: "primary",
    tags: ["typed outputs", "contracts", "validation"],
    link: "https://ai.pydantic.dev/",
    note: "Used for schema-driven agents and explicit typed contracts inside orchestration nodes.",
  },
  {
    title: "Claude Agent SDK",
    category: "reference",
    tags: ["agent runtime", "tools"],
    link: "https://docs.anthropic.com/en/docs/claude-code/sdk",
    note: "Considered for Claude-native workflows where direct file- and MCP-oriented tooling is strongest.",
  },
  {
    title: "Claude Skills / SKILL.md",
    category: "pattern",
    tags: ["playbooks", "versioning", "operations"],
    link: "https://support.claude.com/en/articles/12512180-using-skills-in-claude",
    note: "Used as reusable SOP units with explicit governance, review, and version control over behavior.",
  },
  {
    title: "MCP",
    category: "primary",
    tags: ["connector", "integration", "tool boundary"],
    link: "https://modelcontextprotocol.io/",
    note: "Defines the connector layer for clean external and internal system interactions.",
  },
  {
    title: "pgvector",
    category: "primary",
    tags: ["semantic retrieval", "evidence lookup", "recall"],
    link: "https://github.com/pgvector/pgvector",
    note: "Used for semantic indexing over document chunks and memo history with provenance fields.",
  },
  {
    title: "DuckDB",
    category: "primary",
    tags: ["financial exports", "analytics", "ad hoc"],
    link: "https://duckdb.org/docs/",
    note: "Used for financial export analysis and local, reproducible analytical queries.",
  },
  {
    title: "Kuzu",
    category: "pattern",
    tags: ["graph", "relationship traversal"],
    link: "https://kuzudb.com/",
    note: "Candidate for relationship traversal when founder/investor/customer graph patterns become recurrent.",
  },
  {
    title: "Neo4j GraphRAG",
    category: "pattern",
    tags: ["graph", "RAG", "relationships"],
    link: "https://neo4j.com/docs/genai-concepts/graphrag/",
    note: "Candidate if hybrid graph + retrieval patterns consistently outperform pure relational joins.",
  },
  {
    title: "Contextual retrieval",
    category: "reference",
    tags: ["retrieval", "context windows", "precision"],
    link: "https://www.anthropic.com/engineering/contextual-retrieval",
    note: "Applied to keep evidence retrieval grounded and reduce low-confidence, context-drifted summaries.",
  },
  {
    title: "Hybrid search / reranking",
    category: "reference",
    tags: ["search", "rerank", "evaluation"],
    link: "https://weaviate.io/developers/weaviate/search/hybrid",
    note: "Blend lexical and vector retrieval, then rerank by relevance, freshness, and evidence quality.",
  },
  {
    title: "Braintrust or LangSmith",
    category: "primary",
    tags: ["eval", "observability", "quality"],
    link: "https://www.braintrust.dev/",
    note: "Referenced for evaluation workflow patterns, scoring governance, and long-horizon model behavior review.",
  },
  {
    title: "MemPalace",
    category: "pattern",
    tags: ["memory", "long-horizon", "RAG"],
    link: "https://github.com/mempalace/mempalace",
    note: "Reviewed for memory architecture patterns emphasizing temporal claims, compounding retrieval, and context stability.",
  },
  {
    title: "HippoRAG",
    category: "pattern",
    tags: ["memory", "long-horizon", "RAG"],
    link: "https://github.com/OSU-NLP-Group/HippoRAG",
    note: "Reviewed for memory architecture patterns emphasizing temporal claims, compounding retrieval, and context stability.",
  },
];

export const buildNotes: BuildNote[] = [
  {
    section: "Tool used",
    note: "Codex 5.3 Spark",
  },
  {
    section: "Where AI helped",
    items: [
      "app scaffolding",
      "component creation",
      "data modeling",
      "interactive diagram UI",
      "calculator UI",
      "README/deployment prep",
    ],
  },
  {
    section: "Where I manually intervened",
    items: [
      "architecture thesis",
      "final stack recommendation",
      "rejected alternatives",
      "trust/eval model",
      "skepticism section",
      "final review and polish",
    ],
  },
];
