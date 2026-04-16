import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContextBar = () => {
  const { toast } = useToast();

  const hypothesis =
    "German first-time mothers trust pediatrician recommendations over online reviews when choosing formula";
  const activationSeed =
    "Pediatrician trust is strong but coexists with active online research — activating on the tension between authority trust and peer validation";

  const handleSave = () => {
    toast({
      description: "Save feature coming soon — your analysis is available during this session.",
      duration: 3000,
    });
  };

  return (
    <div className="sticky top-0 z-30 border-b border-border/60 bg-card/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-6 px-6 py-4 lg:px-12">
        {/* Persona */}
        <div className="shrink-0">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground/60">
            Persona
          </p>
          <p className="text-sm font-medium text-foreground">
            The Cautious First-Timer
          </p>
        </div>

        <div className="h-10 w-px shrink-0 bg-border/60" />

        {/* Hypothesis */}
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground/60">
            Hypothesis
          </p>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="truncate text-sm text-foreground/80">{hypothesis}</p>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-sm">
              <p className="text-sm">{hypothesis}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="h-10 w-px shrink-0 bg-border/60" />

        {/* Verdict */}
        <div className="shrink-0">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground/60">
            Verdict
          </p>
          <Badge className="bg-amber-500/15 text-amber-700 border-amber-500/30 hover:bg-amber-500/15 text-xs">
            Partially Supported
          </Badge>
        </div>

        <div className="h-10 w-px shrink-0 bg-border/60" />

        {/* Activation Seed */}
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground/60">
            Activation Seed
          </p>
          <p className="text-[13px] leading-relaxed text-foreground/70">
            {activationSeed}
          </p>
        </div>

        {/* Save Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleSave}
              className="shrink-0 rounded-lg border border-border/60 p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Save analysis"
            >
              <Bookmark className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-xs">Save analysis</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ContextBar;
