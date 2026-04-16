import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopNav from "@/components/TopNav";
import StepIndicator from "@/components/StepIndicator";
import ContextBar from "@/components/insight/ContextBar";
import FiveCAnalysis from "@/components/insight/FiveCAnalysis";
import ActivationDirection from "@/components/insight/ActivationDirection";
import InsightChatbot from "@/components/insight/InsightChatbot";
import CreativeBriefPanel from "@/components/insight/CreativeBriefPanel";
import { ArrowLeft, Sparkles, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ActivePanel = "none" | "chatbot" | "brief";

const InsightActivation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const personaName = (location.state as any)?.personaName as string | undefined;

  const [activePanel, setActivePanel] = useState<ActivePanel>("none");
  const [briefDirection, setBriefDirection] = useState("");

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

        <FiveCAnalysis />

        <div className="my-10 h-px bg-border/60" />

        <ActivationDirection onExportBrief={handleOpenBrief} />
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
