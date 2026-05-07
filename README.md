# Archyr Intelligence Architecture

Interactive architecture artifact for Archyr, an AI-native VC CRM diligence layer.

**Live deployment:** [Vercel preview](https://archyr-intelligence-architecture-232maluhy-haus-havn.vercel.app)  
**Local app:** [http://localhost:3000](http://localhost:3000)

> Note: the current Vercel project is team-protected. If the live URL asks for Vercel access, the local run below is the same app.

## The Point

Archyr should not be built as an autonomous agent swarm.

It should be a deterministic diligence workflow system where LLM agents are bounded workers around ingestion, extraction, retrieval, memo drafting, review, and memory updates.

The architecture I defend:

- **LangGraph** for durable workflow state.
- **Pydantic AI** for typed model boundaries.
- **Claude Skills / SKILL.md** for reusable diligence SOPs.
- **MCP** for connector boundaries.
- **Postgres + pgvector** as the early source-of-truth and retrieval base.
- **Object storage** for raw artifacts.
- **DuckDB** for financial/export analysis when it earns its keep.
- **Redis** for queue, lock, budget, and circuit-breaker state.
- **Graph indexing later**, only when relationship traversal proves material.

## What To Click

Start here if you are reviewing the take-home:

1. **Home / Thesis** - the core recommendation.
2. **Architecture Routes** - why the durable typed workflow route wins.
3. **Agent Harness** - framework comparisons and decision rules.
4. **Data Layer** - KnowledgeGateway, Lumenflow entity resolution, and graph boundaries.
5. **Memory** - temporal claims and the self-learning loop.
6. **Speed, Accuracy & Cost** - model routing, prompt caching, and blast-radius controls.
7. **Evaluation** - day-one/day-90/day-365 trust strategy.
8. **Sources / Build Notes** - citation matrix and rubric coverage.

## What This Is

This is a decision-architecture artifact: a clickable design doc built as an app.

It is meant to show the architecture I would defend in a room with Mucker/Archyr before starting the build: what I would adopt, what I would reject, where I would put the gates, and how the system gets better without pretending the model magically learns.

It is not:

- a production CRM
- a backend ingestion engine
- a legal or financial compliance system
- an autonomous investment decision-maker

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate

```bash
npm run lint
npm run typecheck
npm run build
```

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Content-driven sections under `src/data/archyr/*`

## Files Worth Reading

- `src/data/archyr/thesis.ts` - the core point of view.
- `src/data/archyr/orchestration.ts` - agent framework comparisons and coordination rules.
- `src/data/archyr/dataLayer.ts` - storage architecture and KnowledgeGateway API.
- `src/data/archyr/memory.ts` - temporal memory and self-learning loop.
- `src/data/archyr/cost.ts` - workflow cost/speed/accuracy frontier.
- `src/data/archyr/evaluation.ts` - trust, gates, and eval roadmap.
- `src/data/archyr/sources.ts` - citation matrix and rubric coverage.

## Built With AI, Steered By Taste

I used Codex to move fast on scaffolding, component structure, UI plumbing, and documentation passes.

I took the wheel on the parts that matter most:

- the architecture thesis
- final stack recommendation
- rejected alternatives
- failure-mode reasoning
- Lumenflow entity-resolution example
- eval gates and self-learning model
- skepticism section
- final pruning

That is the intended signal of the submission: use modern tooling aggressively, but keep architectural judgment human and explicit.
