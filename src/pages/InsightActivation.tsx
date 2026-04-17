import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopNav from "@/components/TopNav";
import StepIndicator from "@/components/StepIndicator";
import ContextBar from "@/components/insight/ContextBar";
import FiveCAnalysis, {
  buildInitialInsightState,
  type ApprovalStats,
  type InsightStateMap,
} from "@/components/insight/FiveCAnalysis";
import ActivationDirection from "@/components/insight/ActivationDirection";
import InsightChatbot from "@/components/insight/InsightChatbot";
import CreativeBriefPanel from "@/components/insight/CreativeBriefPanel";
import { ArrowLeft, Sparkles, Bookmark, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ActivePanel = "none" | "chatbot" | "brief";
type GenerationStatus = "idle" | "generating" | "ready";

const tabLabel: Record<string, string> = {
  culture: "Culture",
  category: "Category",
  connection: "Connection",
  company: "Company",
};

const InsightActivation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const personaName = (location.state as any)?.personaName as string | undefined;

  const [activePanel, setActivePanel] = useState<ActivePanel>("none");
  const [briefDirection, setBriefDirection] = useState("");

  const [insightState, setInsightState] = useState<InsightStateMap>(() => buildInitialInsightState());
  const [stats, setStats] = useState<ApprovalStats | null>(null);
  const [generation, setGeneration] = useState<GenerationStatus>("idle");

  const lowDataTabs = stats?.lowDataTabs ?? [];
  const approvedCount = stats?.totalApproved ?? 0;
  const rejectedCount = stats?.totalRejected ?? 0;

  const handleOpenBrief = (directionTitle: string) => {
    setBriefDirection(directionTitle);
    setActivePanel("brief");
  };

  const handleChatbotToggle = (open: boolean) => {
    setActivePanel(open ? "chatbot" : "none");
  };

  const handleCloseBrief = () => {
    setActivePanel("none");
  };

  const handleConfirmGenerate = () => {
    setGeneration("generating");
    // Simulated P8 generation
    setTimeout(() => {
      setGeneration("ready");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <StepIndicator currentStep={4} />
      <ContextBar />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-8 lg:px-12">
        {/* Header row */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate("/validation", { state: { personaName } })}
            className="flex items-center gap-1.5 text-[12px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
              onClick={() => {
                toast("Save feature coming soon — your analysis is available during this session.");
              }}
            >
              <Bookmark className="mr-1.5 h-3.5 w-3.5" />
              Save Analysis
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-[11px] uppercase tracking-[0.12em]"
              onClick={() => navigate("/")}
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              New Validation
            </Button>
          </div>
        </div>

        <FiveCAnalysis
          insightState={insightState}
          onInsightStateChange={setInsightState}
          onStatsChange={setStats}
        />

        <div className="my-10 h-px bg-border/60" />

        {generation !== "ready" ? (
          <section>
            <h2 className="mb-6 font-serif text-2xl font-semibold tracking-tight text-foreground">
              Activation Direction
            </h2>
            <div className="rounded-2xl border border-dashed border-border/70 bg-muted/30 px-8 py-12 text-center shadow-sm">
              <p className="mx-auto max-w-md text-sm leading-relaxed text-foreground/80">
                Review the 5C analysis above, then confirm to generate Activation Directions.
              </p>

              {lowDataTabs.length > 0 && (
                <div className="mx-auto mt-5 inline-flex max-w-lg items-start gap-2 rounded-md border border-amber-300/60 bg-amber-50 px-3 py-2 text-left text-[12px] leading-relaxed text-amber-800">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    {lowDataTabs.map((t) => tabLabel[t]).join(", ")}{" "}
                    {lowDataTabs.length === 1 ? "has" : "have"} limited validated data.
                    Direction confidence may be lower.
                  </span>
                </div>
              )}

              <div className="mt-7">
                <button
                  onClick={handleConfirmGenerate}
                  disabled={generation === "generating"}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-[13px] font-medium text-background shadow-sm transition-all hover:bg-foreground/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {generation === "generating" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Confirm &amp; Generate
                      <span aria-hidden>→</span>
                    </>
                  )}
                </button>
              </div>

              {stats && (
                <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-muted-foreground/70">
                  {approvedCount} insight{approvedCount === 1 ? "" : "s"} approved · {rejectedCount} rejected across 4 dimensions
                </p>
              )}
            </div>
          </section>
        ) : (
          <ActivationDirection onExportBrief={handleOpenBrief} />
        )}
      </div>

      <InsightChatbot
        open={activePanel === "chatbot"}
        onToggle={handleChatbotToggle}
      />

      <CreativeBriefPanel
        open={activePanel === "brief"}
        directionTitle={briefDirection}
        onClose={handleCloseBrief}
      />
    </div>
  );
};

export default InsightActivation;
