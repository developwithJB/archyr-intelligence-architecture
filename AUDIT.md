# Archyr Take-Home Compliance Audit

## Overall status
The brief file itself is not present in this repo (`Archyr_Take_Home.pdf`, `docs/brief.md`, `brief.md`, and `*Archyr*`/`*Take Home*` matches were not found), so the audit is based on the app’s current content under `src/data/archyr/*` and rendered sections. The artifact is strong on architecture framing, explicit governance controls, and workflow modeling for a VC-focused diligence pipeline. The shallow areas are evidence depth on several prompt/memory/review specifics (e.g., prompt caching, fine-tuning policy, some requested benchmark/human-signal clarity, and explicit “brief requirement” matching) rather than full functional architecture. Must-fix before Monday: align missing required items that materially affect interview defensibility (especially the absent brief, source confidence checks, and missing explicit stances on several named approaches/risks). Can wait until Friday: cleaner wording and completion of the remaining section-level edge cases (EM-LLM/Titans/Meta-harness treatment, explicit scaling cost deltas, founder-title example, and “Danny sees success” signal).

## Section 1: Agent harness and orchestration
- **Claude Agent SDK comparison — COVERED**
  - `src/data/archyr/orchestration.ts`:
    - `name: "Claude Agent SDK"`, `fit: "Excellent for Claude-native tools, skills, MCP, and file workflows. Use selectively."`
    - `whyNotAsCore: ["Durable multi-day diligence workflows need a broader production workflow backbone.", ...]`

- **LangGraph comparison — COVERED**
  - `src/data/archyr/orchestration.ts`:
    - `name: "LangGraph"`, `verdict: "Core recommendation."`
    - `whyWorks` includes resumable runs, checkpoints, retries, inspection, testing.
    - Route rationale also marks it `Recommended route` in `src/data/archyr/routes.ts`.

- **CrewAI comparison — COVERED**
  - `src/data/archyr/orchestration.ts`:
    - `name: "CrewAI"`, `fit: "Useful for role-based agent collaboration."`, `whyNotAsCore: ["best suited for demos", ...]`, `verdict: "Useful selectively, not core."`

- **OpenAI Swarm comparison — COVERED**
  - `src/data/archyr/orchestration.ts`:
    - `name: "OpenAI Swarm"`, `fit: "Useful as architectural reference, not full production architecture for the diligence lifecycle."`, `verdict: "Reference only."`

- **Mastra comparison — COVERED**
  - `src/data/archyr/orchestration.ts`:
    - `name: "Mastra"`, `fit: "Promising TypeScript agent framework. Worth watching."`, `whyNotAsCore` warns about production maturity, `verdict: "Watch list."`

- **Pydantic AI comparison — COVERED**
  - `src/data/archyr/orchestration.ts`:
    - `name: "Pydantic AI"`, `fit: "Strong typed workers inside workflow nodes."`, `whyNotAsCore: "not itself a durable workflow coordinator."`, `verdict: "Use inside nodes."`
  - Reinforced in `src/data/archyr/thesis.ts` and `finalRecommendation`.

- **Hand-rolled option discussed — COVERED**
  - `src/data/archyr/orchestration.ts`:
    - `name: "Hand-rolled"`, `fit: "Tempting early but increases orchestration debt."`, `whyNotAsCore` rejects as core due to durability/auditability debt.

- **Meta-harnesses: Superpowers, Harness, Archon, ECC — MISSING**
  - Search for these names in `src/data/archyr` and `components/sections` yields no matches. No dedicated comparison coverage.

- **Where each breaks under load, context pressure, or multi-day workflows — PARTIAL**
  - `src/data/archyr/orchestration.ts` explains load-responsiveness indirectly:
    - `orchestrationRecommendation.reason` says multi-day, stateful diligence needs checkpoints, retries, and human approval.
    - `node` contracts in `src/data/archyr/architectureMap.ts` include `failureMode` entries, but no explicit per-framework scalability curve.

- **Upgrade path if Archyr outgrows the pick — COVERED**
  - `src/data/archyr/orchestration.ts` includes upgrade language (`"Easy to inspect, test, retry, and resume."`, `"Good upgrade path as the system grows."`) for LangGraph.
  - `src/data/archyr/routes.ts` marks `Recommended route` as durable and says graph indexes are added only when proven.

- **Why the recommended pick is right for a VC CRM specifically, not a generalist agent platform — PARTIAL**
  - VC-CRM specificity is present (`"agent-harness"` focus, `"VC diligence systems"`, `"two-person team"`, `"final recommendation for a small team"`) in `src/data/archyr/thesis.ts`, `routes.ts`, and `dataLayer.ts`.
  - It stops short of explicit counterfactuals versus generalist orchestration platforms.

- **Coordination patterns mapped to Archyr**
  - **pipeline — COVERED**: `src/data/archyr/orchestration.ts` pattern `Pipeline`, shown in `components/sections/agent-harness.tsx`.
  - **fan-out / fan-in — COVERED**: `pattern-fan-out-fan-in`, with independent stream pattern and merge.
  - **expert pool — COVERED**: `pattern-expert-pool`, with specialized workers.
  - **producer-reviewer — COVERED**: `pattern-producer-reviewer` and in `src/data/archyr/workflow.ts` step 7 “Run skeptical reviewer”.
  - **supervisor — COVERED**: `pattern-supervisor` sets retry/escalation/control role.
  - **hierarchical delegation — COVERED**: `pattern-hierarchical` indicates multi-level only for complex contexts.

- **Decision rule: skill vs subagent vs tool vs MCP server — COVERED**
  - `src/data/archyr/orchestration.ts` `decisionRules` enumerates all four categories with explicit selection criteria.

- **Stance on filesystem-native skills and progressive disclosure — PARTIAL**
  - `src/data/archyr/orchestration.ts` states `skillStance.title: "Filesystem-native skills"` with guidance to adopt as versioned SOPs and avoid silent self-updates.
  - `src/data/archyr/routes.ts` mentions “Claude Skills / SKILL.md” in route options.
  - No explicit “progressive disclosure” mechanism text is present.

- **Where filesystem-native skills break down — PARTIAL**
  - Break-down condition appears as safeguards: `constraint: "Any important skill update must pass eval evidence and human approval before promotion."` and `Reject` list item in workflow comparison.

## Section 2: Multi-database backend and data layer
- **Postgres + pgvector vs dedicated vector DB — PARTIAL**
  - Covered in role assignment and grid: `src/data/archyr/dataLayer.ts` marks `Postgres` canonical and `pgvector` as derived retrieval.
  - No explicit dedicated-vector alternative (e.g., managed vector DB) comparison.

- **Neo4j vs Kuzu vs property-graph-in-Postgres — PARTIAL**
  - `coreStorage` includes `Kuzu or Neo4j` as optional derived graph indexes in `src/data/archyr/dataLayer.ts`.
  - No `property-graph-in-Postgres`-specific alternative path or benchmark.

- **DuckDB role — COVERED**
  - `src/data/archyr/dataLayer.ts` defines DuckDB purpose: `Financial export analysis and ad-hoc analytics` with explicit when-to-use example.

- **Object storage role — COVERED**
  - `src/data/archyr/dataLayer.ts` and `architectureMap.ts` define immutable raw docs/artifacts, run lineage, and `object-store` as storage boundary.

- **Redis role — COVERED**
  - `src/data/archyr/dataLayer.ts`: short-lived workflow control, locks, rate limits, circuit-breaker state.
  - `src/data/archyr/architectureMap.ts`: node `Redis Control Plane`.

- **Query patterns and operational burden for a two-person team — PARTIAL**
  - `src/data/archyr/dataLayer.ts` explicitly says `"Two-person team needs operational simplicity first."` and favors Postgres first with canonical vs derived split.
  - But no quantified query-pattern workload (hot path, concurrency profiles, index strategy) by team size.

- **Cost at low and high scale — MISSING**
  - No explicit low/high scale storage cost model in data layer text.

- **Failure modes of each storage option — PARTIAL**
  - `biggestFailureMode` addresses entity merge corruption (global), and each store lists at least one misuse case; not a per-store failure mode matrix.

- **Storage-shape-agnostic API for agents — COVERED**
  - `src/data/archyr/dataLayer.ts`: `KnowledgeGateway API` card states agents do not see direct storage shape.
  - `KnowledgeGatewayMethod` list includes bounded method set.

- **Example API signatures — COVERED**
  - `src/data/archyr/dataLayer.ts` exposes explicit signatures, e.g. `searchEvidence(query, dealId, scope, modes, asOf, k)` and `resolveEntity(mentions, candidateTypes, confidenceThresholds)`.

- **Entity resolution example using names: Lumenflow / Lumenflow Inc. / lumenflow.io — COVERED**
  - `src/data/archyr/dataLayer.ts` `entityResolutionSample.target` has exactly those three variants.

- **Failure mode most concerning in entity resolution — COVERED**
  - `src/data/archyr/dataLayer.ts: biggestFailureMode = "False positive merges..."` and `src/data/archyr/workflow.ts` step 4 `failureMode` explicitly calls out false-positive merges.

- **Where graph structure earns its keep — COVERED**
  - `graphWhereItWins` lists relationship-heavy use cases in `src/data/archyr/dataLayer.ts`.

- **Where relational joins are enough — COVERED**
  - `graphWhereOverkill` includes memo status, CRM filters, deal stages, artifact metadata as join-suitable workloads.

## Section 3: Memory and self-learning
- **MemPalace / method-of-loci stance — MISSING**
  - `MemPalace` appears as a source reference only in `src/data/archyr/sources.ts`; no explicit method-of-loci evaluation.

- **Hierarchical memory skills stance — PARTIAL**
  - `coordinationPatterns` includes `Hierarchical delegation` (agent patterns) but no memory-specific hierarchical skill hierarchy policy.

- **Vector-only memory stance — COVERED**
  - `src/data/archyr/memory.ts`: `memoryPolicies` includes `vector-only memory` with `Reject` and clear reason.

- **HippoRAG stance — PARTIAL**
  - `src/data/archyr/sources.ts` lists `HippoRAG` as reviewed pattern; no explicit accept/reject rationale or integration pattern.

- **EM-LLM stance — MISSING**
  - No EM-LLM reference in `src/data/archyr/*`.

- **Titans stance — MISSING**
  - No `Titans` reference in `src/data/archyr/*`.

- **Anthropic memory tooling stance — MISSING**
  - Contains links to Claude skills/support but no explicit architectural stance on Anthropic memory tooling as a stack choice.

- **Temporal validity model — COVERED**
  - `src/data/archyr/memory.ts` defines `TemporalClaimField` plus `temporalExample` with valid_from/valid_to/observed_at/ supersedes etc.

- **Founder title change example — MISSING**
  - No explicit founder-title change example in data or section content.

- **Restated revenue example — COVERED**
  - `temporalExample.note` in `src/data/archyr/memory.ts`: `$2.4M ARR` → `$2.1M ARR` restatement.

- **Self-learning loop — COVERED**
  - `src/data/archyr/memory.ts` has ordered `memoryLoop` steps through draft → review → eval → proposals → human gate → release.

- **Signals named: human approval / rejection — COVERED**
  - Signal present in `memorySignals`.
  - `cadence` present (`immediate`), `action` present, but approver explicitly missing except implied via approval events.

- **Signals named: reviewer-agent eval scores — COVERED**
  - Signal `eval-failures` exists with cadence/action; approver not explicit.

- **Signals named: partner feedback — COVERED**
  - Signal `partner-edits` exists; cadence/action present.

- **Signals named: deal outcomes years later — COVERED**
  - Signal `outcomes` with cadence `quarterly or annually` and action.

- **Signals named: retrieval click-through — COVERED**
  - Signal `retrieval-clicks` exists weekly with action.

- **For each signal: what updates / cadence / who approves — PARTIAL**
  - Update intent is present in action text and cadence is present, but approver is only explicit for approvals overall, not per-signal.

- **Where skills, prompts, retrieval indices, and routers get updated — COVERED**
  - `src/data/archyr/memory.ts` step `Update proposals` names all four (`retrieval`, `prompts`, `skills`, `routers`) and then human approval + release.

## Section 4: Speed, accuracy, and cost
- **Four named workflows**
  - **Ingest a 200-page data room** — COVERED
    - `src/data/archyr/cost.ts` `workflowTargets` id `ingest-200-page-data-room`, latency `15 to 45 minutes`, model stack includes `Sonnet summaries`, and cost goal.
  - **Draft a memo** — COVERED
    - `draft-investment-memo`, latency `3 to 7 minutes`, stack `Sonnet drafting` + optional Opus/Sonnet reviewer.
  - **Answer partner’s ad-hoc question** — COVERED
    - `answer-partner-question`, latency `p50 under 10 seconds`, stack includes `Sonnet answer`.
  - **Score a new pipeline company** — COVERED
    - `score-new-pipeline-company`, latency `15 to 60 seconds`, stack `Haiku/Sonnet classifier` + scoring rubric.

- **Each workflow has latency target, model choice, cost envelope, accuracy posture — COVERED**
  - `workflowTargets` + `CostCalculator` data (`workflowTargets` includes latency/cost; `costFlowProfiles` + `modelProfiles` include posture).

- **When to use Opus-class model — COVERED**
  - `src/data/archyr/cost.ts` `costFlowProfiles` cheap/standard/premium and `workflow.ts` uses Opus for skeptical reviewer and conflict-heavy outputs.

- **When Sonnet-class is enough — COVERED**
  - `cost.ts` states Sonnet for balanced standard diligence, used for drafting, answering, and retrieval-heavy standard path.

- **When Haiku-class is enough — COVERED**
  - `workflow.ts` parsing/extraction on Haiku; `cost.ts` cheap profile and useFor include deterministic/simple stages.

- **When fine-tuning a smaller model makes sense — MISSING**
  - No explicit “fine-tune smaller model” policy.

- **Extended thinking: where used and where rejected — COVERED**
  - `src/data/archyr/cost.ts` has explicit `extendedThinkingPolicy` with `useFor` and `avoidFor` lists.

- **Prompt caching: where it pays back — MISSING**
  - No mention of prompt caching in data/section files.

- **Hybrid retrieval: BM25, dense vectors, reranker — COVERED**
  - `src/data/archyr/architectureMap.ts` has `Hybrid Retrieval` node with BM25 + dense; `sources.ts` has source for Hybrid search/reranking.

- **Contextual retrieval: where adopted — COVERED**
  - `sources.ts` source entry `Contextual retrieval` and architecture contracts include it in retrieval pipeline.

- **Agentic RAG with self-correction: where adopted or rejected — PARTIAL**
  - Self-correction appears via workflow skeptical review and “reduced/extra check” modes.
  - No direct “agentic RAG” term or formal acceptance criterion.

- **Eval that proves retrieval is working — COVERED**
  - `src/data/archyr/evaluation.ts` includes trust dimensions `retrieval-quality` with scope and control.

- **Blast radius controls**
  - budget caps — COVERED: `src/data/archyr/cost.ts` `per-deal budget caps`.
  - retry limits — COVERED: `max retries`.
  - token limits — COVERED: `max tokens per workflow`.
  - tool-call limits — COVERED: `max tool calls`.
  - subagent fan-out limits — COVERED: `max subagent fan-out`.
  - timeout — COVERED: `workflow timeout`.
  - kill switch — COVERED: `kill switch`.
  - idempotency keys — COVERED: `idempotency keys`.

## Section 5: Evaluation and trust
- **Day 1 evals — COVERED**
  - `src/data/archyr/evaluation.ts` `evalRoadmap` contains `horizon: "Day 1"` scope.

- **Day 90 evals — COVERED**
  - `evalRoadmap` contains `Day 90` scope.

- **Day 365 evals — COVERED**
  - `evalRoadmap` contains `Day 365` scope.

- **Hard gates with examples — COVERED**
  - `hardAndSoftGates` in `src/data/archyr/evaluation.ts` includes multiple hard gates and `name`/`condition`/`impact`.

- **Soft gates with examples — COVERED**
  - Same list includes `level: "soft"` entries and condition/impact.

- **Producer-reviewer loop stance — COVERED**
  - `workflow.ts` explicit producer/reviewer split and `workflow` mapping, plus `coordinationPatterns` producer-reviewer in `orchestration.ts`.

- **Human-in-the-loop checkpoint stance — COVERED**
  - `workflow.ts` step 8 and `sources` around review gates; `evaluation.ts` hard gate on external publish and approvals.

- **Rubric-based scoring stance — PARTIAL**
  - `workflowTargets`/`workflow.ts` mention scoring rubric, but no rubric format/thresholds.

- **“95% eval but subtly wrong” trap — MISSING**
  - No explicit anti-overfitting-to-metrics guardrail phrasing.

- **How Danny knows the system is working — MISSING**
  - No personalized named owner signal summary or explicit “Danny” dashboard semantics.

## Section 6: Skepticism
- **One overhyped thing specific to current AI systems — COVERED**
  - `src/data/archyr/skepticism.ts` includes overhyped theme: `Autonomous agent swarms.` with opinionated justification.

- **One underrated thing specific to current AI systems — COVERED**
  - `src/data/archyr/skepticism.ts` includes underrated theme: `Evidence contracts.` with concrete justification.

- **Both are opinionated and defensible — COVERED**
  - `skepticism.ts` uses explicit claims and rationale plus supporting evidence-contract checklist and kill switches.

## Sources
External URLs cited in app files (all from `src/data/archyr/sources.ts` unless noted):

1. Title: `LangGraph durable execution` — URL: `https://www.langgraph.com/` — Where appears: `src/data/archyr/sources.ts` (source row). — Looks real: likely yes (official domain) — Manual browser verification needed: Yes.
2. Title: `Pydantic AI` — URL: `https://ai.pydantic.dev/` — Where appears: `src/data/archyr/sources.ts` — Looks real: likely yes — Manual browser verification needed: Yes.
3. Title: `Claude Agent SDK` — URL: `https://docs.anthropic.com/en/docs/claude-code/sdk` — Where appears: `src/data/archyr/sources.ts` — Looks real: likely yes — Manual browser verification needed: Yes.
4. Title: `Claude Skills / SKILL.md` — URL: `https://support.claude.com/en/articles/12512180-using-skills-in-claude` — Where appears: `src/data/archyr/sources.ts` — Looks real: likely yes — Manual browser verification needed: Yes.
5. Title: `MCP` — URL: `https://modelcontextprotocol.io/` — Where appears: `src/data/archyr/sources.ts` — Looks real: likely yes — Manual browser verification needed: Yes.
6. Title: `pgvector` — URL: `https://github.com/pgvector/pgvector` — Where appears: `src/data/archyr/sources.ts` — Looks real: likely yes — Manual browser verification needed: Yes.
7. Title: `DuckDB` — URL: `https://duckdb.org/docs/` — Where appears: `src/data/archyr/sources.ts` — Looks real: likely yes — Manual browser verification needed: Yes.
8. Title: `Kuzu` — URL: `https://kuzudb.com/` — Where appears: `src/data/archyr/sources.ts` — Looks real: likely yes — Manual browser verification needed: Yes.
9. Title: `Neo4j GraphRAG` — URL: `https://neo4j.com/docs/genai-concepts/graphrag/` — Where appears: `src/data/archyr/sources.ts` — Looks real: likely yes — Manual browser verification needed: Yes.
10. Title: `Contextual retrieval` — URL: `https://www.anthropic.com/engineering/contextual-retrieval` — Where appears: `src/data/archyr/sources.ts` — Looks real: likely yes — Manual browser verification needed: Yes.
11. Title: `Hybrid search / reranking` — URL: `https://weaviate.io/developers/weaviate/search/hybrid` — Where appears: `src/data/archyr/sources.ts` — Looks real: likely yes — Manual browser verification needed: Yes.
12. Title: `Braintrust or LangSmith` — URL: `https://www.braintrust.dev/` — Where appears: `src/data/archyr/sources.ts` — Looks real: likely yes — Manual browser verification needed: Yes.
13. Title: `MemPalace` — URL: `https://github.com/mempalace/mempalace` — Where appears: `src/data/archyr/sources.ts` — Looks real: likely yes — Manual browser verification needed: Yes.
14. Title: `HippoRAG` — URL: `https://github.com/OSU-NLP-Group/HippoRAG` — Where appears: `src/data/archyr/sources.ts` — Looks real: likely yes — Manual browser verification needed: Yes.

App documentation/reference URLs:
15. Title: `Repository setup` — URL: `https://github.com/developwithJB/archyr-intelligence-architecture.git` — Where appears: `README.md` setup block — Looks real: likely yes — Manual browser verification needed: Yes.
16. Title: `Local run URL` — URL: `http://localhost:3000` — Where appears: `README.md` — Looks real for local dev instruction: n/a.

## Codex transparency
- **where Codex helped — COVERED**
  - `README.md` `buildNotes[0]`: `Tool used` → `Codex 5.3 Spark`.
  - `buildNotes` list explicit items where AI helped (app scaffolding, component creation, etc.).

- **where the human intervened — COVERED**
  - `README.md` `buildNotes[1]` `"Where I manually intervened"` lists architecture thesis, final stack recommendation, etc.

- **whether the distinction is concrete — COVERED**
  - It is concrete, by sectioned bullets with separate categories for tool vs manual intervention.

- **whether it answers the brief’s AI assistance requirement — PARTIAL**
  - It demonstrates transparency but only at a high level; no formal “brief requirement mapping” evidence of proportion or scope is present.

## Priority fixes
- Must fix before Monday call
  - Add or confirm the take-home brief artifact in-repo (`Archyr_Take_Home.pdf`, `docs/brief.md`, or equivalent) and map every section against explicit rubric language.
  - Add explicit coverage for missing checklist items that are expected by the brief (Meta-harnesses, EM-LLM, Titans, method-of-loci rationale, founder-title example, prompt caching, fine-tuning policy, who approves each named signal).
  - Replace ambiguity in coordination stress points with concrete failure-mode per framework and explicit tradeoff language at load/context-pressure scale.

- Should fix before Friday submission
  - Add explicit storage-cost comparison (low/high scale and operational cost by layer).
  - Expand source/URL validation section with a verification pass and status for each external link.
  - Tie architecture recommendations to “Danny” success metrics by defining a crisp observability dashboard and acceptance criteria.

- Nice to have
  - Add explicit rubric schemas and threshold definitions in `evaluation.ts`.
  - Add short one-line citations or anchors in source cards for each reference (title-only + URL is present, but a short reason tied to Archyr risk controls would improve review speed).
