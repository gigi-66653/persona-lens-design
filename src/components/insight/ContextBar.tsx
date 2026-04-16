import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ContextBar = () => {
  const hypothesis =
    "German first-time mothers trust pediatrician recommendations over online reviews when choosing formula";
  const activationSeed =
    "Pediatrician trust is strong but coexists with active online research — activating on the tension between authority trust and peer validation";

  return (
    <div className="sticky top-0 z-30 border-b border-border/60 bg-card/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex w-full max-w-5xl items-start gap-6 px-6 py-4 lg:px-12">
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
      </div>
    </div>
  );
};

export default ContextBar;
