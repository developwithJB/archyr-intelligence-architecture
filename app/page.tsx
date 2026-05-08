import { SiteNav } from "@/components/site-nav";
import HomeThesis from "@/components/sections/home-thesis";
import ArchitectureRoutes from "@/components/sections/architecture-routes";
import AgentHarness from "@/components/sections/agent-harness";
import DataLayer from "@/components/sections/data-layer";
import MemoryLearning from "@/components/sections/memory-learning";
import SpeedAccuracyCost from "@/components/sections/speed-cost";
import EvalTrust from "@/components/sections/eval-trust";
import TrustReplay from "@/components/sections/trust-replay";
import Skepticism from "@/components/sections/skepticism";
import ArchitectureMap from "@/components/sections/architecture-map";
import WorkflowDemo from "@/components/sections/workflow-demo";
import SourcesNotes from "@/components/sections/sources-notes";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main>
        <HomeThesis />
        <EvalTrust />
        <TrustReplay />
        <DataLayer />
        <WorkflowDemo />
        <AgentHarness />
        <MemoryLearning />
        <SourcesNotes />
        <ArchitectureRoutes />
        <ArchitectureMap />
        <SpeedAccuracyCost />
        <Skepticism />
      </main>
    </div>
  );
}
