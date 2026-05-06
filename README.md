# Archyr Interactive Architecture Artifact

## What this app is

This project is a clickable architecture artifact for a VC diligence platform called **Archyr**.

It turns an architecture assignment into a web app:

- A thesis-first homepage with the core recommendation.
- Route cards that compare competing architecture choices.
- Dedicated sections for orchestration, data layer, memory, cost/speed tradeoffs, evaluation, skepticism, a workflow simulation, and interactive diagrams.
- Editable source references and build notes for interview-ready transparency.

The app is intentionally frontend-heavy and content-driven: each major section renders from small TypeScript content files under `src/data/archyr/`, so the structure is easy to audit and extend.

## What this app is not

- Not a backend service or production diligence engine.
- Not a legal/financial compliance system.
- Not a data ingestion or LLM runtime in its own right.
- Not an autonomous decision-maker.

It is a **decision-architecture artifact**: a readable, interactive representation of a target system design.

## Core thesis

Archyr should not be built as an autonomous agent swarm.

It should be a deterministic diligence workflow system, where LLM agents are bounded workers around:

- ingestion
- extraction
- memo drafting
- retrieval
- review
- memory updates

The final recommended spine is:

- **LangGraph** for durable workflows
- **Pydantic AI** for typed contracts
- **Claude Skills** for domain SOPs
- **MCP** for connectors
- **Postgres** as source of truth with **pgvector**, object storage, and **DuckDB** where needed
- **Redis** for workflow control
- optional graph indexing when relationship traversal proves material

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Pure frontend content model in `src/data/archyr/*`
- Optional interactive diagram rendering with standard React nodes (no external graph engine required by default)

## App sections

- Home / Thesis
- Architecture Routes
- Architecture Map
- Agent Harness & Orchestration
- Data Layer
- Memory & Self-Learning
- Speed, Accuracy & Cost
- Evaluation & Trust
- Skepticism
- Workflow Demo
- Sources / Build Notes

## Final architecture recommendation

Use a durable, typed, human-in-the-loop architecture:

- LangGraph orchestrates long-running diligence flows.
- Pydantic AI constrains model outputs.
- MCP exposes connectors.
- Postgres stores canonical structured data and audit-safe history.
- pgvector + object storage handle evidence retrieval and raw artifacts.
- DuckDB powers financial/export analysis.
- Redis controls job/state runtime concerns.
- Graph systems (Kuzu/Neo4j) are introduced only when proven necessary.

Human approvals and eval gates are first-class controls, and evidence trails are retained in temporal memory.

## Prerequisites

- Node.js 20+ (recommended)
- npm

## How to run locally

```bash
git clone https://github.com/developwithJB/archyr-intelligence-architecture.git
cd archyr-intelligence-architecture
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Files of interest

- `src/data/archyr/*` — structured, typed content for each artifact section.
- `app/page.tsx` and `components/sections/*` — section composition and rendering.
- `components/diagram/architecture-diagram.tsx` — interactive architecture map.
- `components/widgets/cost-calculator.tsx` — speed/accuracy/cost simulator.
- `components/sections/sources-notes.tsx` — citation matrix, rubric readiness, and build notes.
- `components/site-nav.tsx` — navigation and section anchoring.

## Rubric readiness

The app now explicitly maps to the take-home rubric:

- **Shipping velocity:** one-command local run, passing build, Codex build notes.
- **Architectural taste:** thesis-first route selection with rejected alternatives.
- **Tradeoff reasoning:** cost envelopes, model routing, graph deferral triggers, and failure controls.
- **Self-learning:** feedback signals with cadence, update target, and approver.
- **Originality:** permission-aware evidence, temporal claims, and evidence contracts.
- **Research depth:** source matrix covering named frameworks, meta-harnesses, memory systems, retrieval/eval tooling, and pricing assumptions.

## Research defensibility

All major architecture claims are tied to source cards in the app. The source matrix is intentionally read-only for reviewers and includes:

- decision area
- supported claim
- stance taken
- source category
- source quality
- link to official docs, source repository, pricing page, or paper

## Tooling and human intervention

Built with **Codex 5.3 Spark**.

### Where Codex drove

- app scaffolding and routing
- reusable section/card components
- diagram and calculator UI plumbing
- structured content file organization
- README, audit, and deployment documentation drafts

### Where I took the wheel

- architecture thesis and route selection
- final stack recommendation
- rejected alternatives and failure-mode reasoning
- Lumenflow entity-resolution example
- evaluation gates and self-learning model
- skepticism section and final pruning

## Local development flow

```bash
git clone https://github.com/developwithJB/archyr-intelligence-architecture.git
cd archyr-intelligence-architecture
npm install
npm run dev
```

```bash
npm run lint
npm run typecheck
npm run build
```

Use `npm run build` to validate after doc/content edits as a guardrail for schema or import issues.

## Final pre-submit checklist

- Open the app and confirm the default Architecture Routes selection is **Durable Workflow + Typed Intelligence Layer**.
- Filter Sources by each decision area and confirm every required area has source coverage.
- Confirm `AUDIT.md` does not contain stale missing-item claims.
- Confirm no generated local browser artifacts are included in the final submission.
