import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface ActivationDirectionProps {
  onExportBrief: (directionTitle: string) => void;
}

/* ── Mock Data ── */
const tensions = [
  {
    description: "First-time mothers trust medical authority but secretly rely on peer validation online — the advice they follow vs. the advice they feel is misaligned",
    dimensions: ["Consumer", "Culture"],
    implication: "Communication that acknowledges both trust systems — not 'choose one' but 'here's how they work together'",
  },
  {
    description: "The 'evidence-based parenting' movement demands scientific proof, yet emotional reassurance from peers carries equal decisional weight",
    dimensions: ["Culture", "Connection"],
    implication: "Content strategy needs to blend clinical data with real-mom testimony to feel both credible and relatable",
  },
];

const opportunities = [
  {
    description: "No major brand owns the 'pediatrician-endorsed but peer-validated' positioning in DACH formula market",
    dimensions: ["Category", "Company"],
    rationale: "Aptamil's clinical research heritage gives it unique credibility to bridge this gap — competitors lead with organic/natural, not science + trust",
  },
  {
    description: "Forum-based peer communities are hungry for brand-sponsored but editorially independent content",
    dimensions: ["Connection", "Consumer"],
    rationale: "First-mover advantage in trusted content partnerships with Netmoms.de/Urbia could lock in this persona's loyalty during the critical 0-6M window",
  },
];

const campaignDirections = [
  {
    title: "Bridge the Trust Gap",
    priority: "HIGH" as const,
    confidence: "HIGH" as const,
    rationale: "Leverages the tension between medical authority and peer validation — no competitor currently owns this positioning",
    communicationLead: "Backed by science. Validated by moms like you.",
    keyScenarios: ["First pediatrician visit after birth", "Late-night forum browsing during feeding"],
    tone: "Reassuring, warm-scientific, not preachy",
    supporting: ["Consumer", "Culture", "Category"],
  },
  {
    title: "The Pediatrician's Partner",
    priority: "HIGH" as const,
    confidence: "MEDIUM" as const,
    rationale: "Positions Aptamil as the brand pediatricians recommend and mothers confirm through peer experience",
    communicationLead: "The formula your doctor trusts. The community your heart trusts.",
    keyScenarios: ["Formula aisle decision moment", "Post-pediatrician-visit research phase"],
    tone: "Confident, authoritative but empathetic",
    supporting: ["Consumer", "Company", "Connection"],
  },
  {
    title: "First-Time Confidence",
    priority: "MEDIUM" as const,
    confidence: "MEDIUM" as const,
    rationale: "Addresses the unmet need for transition guidance that feels both medically endorsed and emotionally supportive",
    communicationLead: "Your first time doesn't have to feel like a test.",
    keyScenarios: ["Breast-to-formula transition moment", "Parenting class or midwife consultation"],
    tone: "Warm, encouraging, low-pressure",
    supporting: ["Consumer", "Culture"],
  },
];

const priorityStyles = {
  HIGH: "bg-primary text-primary-foreground",
  MEDIUM: "border border-primary text-primary bg-transparent",
  LOW: "border border-border text-muted-foreground bg-transparent",
};

const confidenceStyles = {
  HIGH: "text-emerald-600",
  MEDIUM: "text-amber-600",
  LOW: "text-muted-foreground",
};

const DimensionChip = ({ label }: { label: string }) => (
  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
    {label}
  </span>
);

const ActivationDirection = ({ onExportBrief }: ActivationDirectionProps) => {
  return (
    <section>
      <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight text-foreground">
        Activation Direction
      </h2>

      {/* Tensions */}
      <div className="mb-8">
        <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-destructive/80">
          Tensions
        </h3>
        <div className="space-y-4">
          {tensions.map((t, i) => (
            <div key={i} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <p className="text-sm font-medium leading-relaxed text-foreground">{t.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {t.dimensions.map((d) => <DimensionChip key={d} label={d} />)}
              </div>
              <p className="mt-3 text-[13px] italic leading-relaxed text-muted-foreground">{t.implication}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities */}
      <div className="mb-8">
        <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-600">
          Opportunities
        </h3>
        <div className="space-y-4">
          {opportunities.map((o, i) => (
            <div key={i} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <p className="text-sm font-medium leading-relaxed text-foreground">{o.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {o.dimensions.map((d) => <DimensionChip key={d} label={d} />)}
              </div>
              <p className="mt-3 text-[13px] italic leading-relaxed text-muted-foreground">{o.rationale}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Directions */}
      <div className="mb-8">
        <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/60">
          Campaign Directions
        </h3>
        <div className="space-y-5">
          {campaignDirections.map((d, i) => (
            <div key={i} className="rounded-2xl border border-border/60 bg-card p-7 shadow-sm">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <Badge className={`text-[10px] uppercase tracking-wider ${priorityStyles[d.priority]}`}>
                  ★ {d.priority} Priority
                </Badge>
                <span className={`text-[11px] font-medium ${confidenceStyles[d.confidence]}`}>
                  Confidence: {d.confidence}
                </span>
              </div>

              <h4 className="mb-5 font-serif text-xl font-semibold text-foreground">"{d.title}"</h4>

              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">Rationale</p>
                  <p className="text-sm leading-relaxed text-foreground/80">{d.rationale}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">Communication Lead</p>
                  <p className="text-sm font-medium italic text-foreground/90">"{d.communicationLead}"</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">Key Scenarios</p>
                  <ul className="space-y-1">
                    {d.keyScenarios.map((s, j) => (
                      <li key={j} className="flex gap-2 text-sm text-foreground/80"><span>•</span>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">Tone</p>
                  <p className="text-sm text-foreground/80">{d.tone}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">Supporting Insights</p>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {d.supporting.map((s) => <DimensionChip key={s} label={s} />)}
                    </div>
                    <button
                      onClick={() => onExportBrief(d.title)}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gray-700 px-4 py-1.5 text-[12px] font-medium text-white shadow-sm transition-all hover:bg-gray-800 hover:shadow-md"
                    >
                      Generate Brief <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivationDirection;
