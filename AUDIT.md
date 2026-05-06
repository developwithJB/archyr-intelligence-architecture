# Archyr Take-Home Submission Readiness Audit

## Overall status

This artifact is ready to defend as a senior AI systems architecture submission. It is a runnable interactive app, not a static memo, and it now includes a citation matrix that ties the major architecture decisions to official docs, repositories, pricing pages, or papers.

Core thesis: Archyr should use deterministic, durable diligence workflows with bounded LLM workers, typed contracts, temporal memory, and eval gates. It should not be built as an autonomous agent swarm.

## Rubric coverage

| Dimension | Weight | Status | Evidence |
| --- | ---: | --- | --- |
| Shipping velocity | 20% | Covered | Next.js app with one-command local run, build scripts, and Codex build notes. |
| Architectural taste | 20% | Covered | Clear recommendation: LangGraph + Pydantic AI + Postgres-first data layer + governed Claude Skills/MCP workers. |
| Tradeoff reasoning | 20% | Covered | Cost envelopes, model routing, graph deferral triggers, KnowledgeGateway API, storage boundaries, and blast-radius controls. |
| Self-learning model | 15% | Covered | Feedback signals include cadence, update target, and approver; updates are eval-gated and versioned. |
| Originality | 10% | Covered | Evidence contracts, permission-aware citations, temporal claim supersession, and skepticism of uncontrolled agent chains. |
| Research depth | 15% | Covered | Source matrix covers named frameworks, meta-harnesses, memory systems, retrieval/eval tooling, pricing, and storage assumptions. |

## Decision area checklist

| Decision area | Status | Notes |
| --- | --- | --- |
| Agent harness and orchestration | Covered | Compares Claude Agent SDK, LangGraph, CrewAI, OpenAI Swarm, Mastra, Pydantic AI, hand-rolled, Superpowers, Harness, Archon, and ECC. |
| Multi-database backend and data layer | Covered | Explains Postgres-first canonical state, pgvector retrieval, object storage, DuckDB, Redis, optional graph, KnowledgeGateway, and Lumenflow entity resolution. |
| Memory and self-learning | Covered | Includes MemPalace, hierarchical memory skills, vector-only memory, HippoRAG, EM-LLM, Titans, Anthropic memory tooling, temporal validity, and update governance. |
| Speed, accuracy, and cost | Covered | Covers four named workflows, model classes, prompt caching, fine-tuning policy, retrieval choices, and circuit breakers. |
| Evaluation and trust | Covered | Includes day-one/day-90/day-365 evals, hard and soft gates, producer-reviewer loops, eval datasets, and the 95% eval trap. |
| Skepticism | Covered | States a concrete overhyped pattern and underrated primitive, with operational kill switches and evidence contract checklist. |

## Research coverage

The Sources / Build Notes section now functions as the reviewer-facing evidence layer. It includes source cards for:

- Agent frameworks: LangGraph, Claude Agent SDK, CrewAI, Mastra, OpenAI Swarm, Pydantic AI.
- Meta-harnesses: Superpowers, Harness Agents, Archon, ECC.
- Memory systems and papers: MemPalace, HippoRAG, EM-LLM, Titans, Anthropic memory tooling.
- Retrieval and evals: contextual retrieval, hybrid search/reranking, Braintrust, LangSmith.
- Cost and storage assumptions: Anthropic pricing, OpenAI pricing, Anthropic prompt caching, AWS S3 pricing, PostgreSQL, pgvector, DuckDB, Kuzu, Neo4j.

## UX readiness

- The first screen states the thesis and final recommendation without forcing the reviewer to infer it.
- Architecture Routes defaults to the recommended route: Durable Workflow + Typed Intelligence Layer.
- Sources are read-only, filterable by decision area and source type, and tied to explicit claims.
- The app favors dense, navigable architecture content over marketing copy.

## Verification commands

Run before submission:

```bash
npm run lint
npm run typecheck
npm run build
```

Recommended browser checks:

- Open `http://localhost:3000`.
- Confirm Architecture Routes opens on Durable Workflow + Typed Intelligence Layer.
- Filter Sources by each decision area.
- Confirm all source links intended for review are present.
- Confirm no local Playwright or browser debug artifacts are included.
