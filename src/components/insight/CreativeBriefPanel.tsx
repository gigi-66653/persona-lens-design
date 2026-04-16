import { X, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CreativeBriefPanelProps {
  open: boolean;
  directionTitle: string;
  onClose: () => void;
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">
    <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
      {children}
    </h3>
    <div className="mt-1.5 h-px bg-primary/20" />
  </div>
);

const SourceLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 text-[11px] italic text-muted-foreground/60">Source: {children}</p>
);

const BriefQuote = ({ text }: { text: string }) => (
  <p className="text-[13px] italic leading-relaxed text-foreground/75">"{text}"</p>
);

const CreativeBriefPanel = ({ open, directionTitle, onClose }: CreativeBriefPanelProps) => {
  const { toast } = useToast();
  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const handleDownload = () => {
    toast({
      title: "Coming Soon",
      description: "Document download will be available in the production version",
    });
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-in-out md:w-[60%] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="border-b border-border/60 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <h2 className="text-base font-bold text-foreground">Creative Brief</h2>
                <p className="mt-0.5 font-serif text-sm italic text-foreground/70">"{directionTitle}"</p>
                <p className="mt-1 text-[11px] text-muted-foreground/50">Generated {today}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Download bar */}
        <div className="border-b border-border/40 px-6 py-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="text-[11px] uppercase tracking-wider" onClick={handleDownload}>
              <Download className="mr-1.5 h-3.5 w-3.5" /> Download Word
            </Button>
            <Button variant="outline" size="sm" className="text-[11px] uppercase tracking-wider" onClick={handleDownload}>
              <Download className="mr-1.5 h-3.5 w-3.5" /> Download PDF
            </Button>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground/40">Demo — downloads not functional</p>
        </div>

        {/* Brief body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Section 1: Context */}
          <section>
            <SectionTitle>Context</SectionTitle>
            <SourceLabel>Page 3 Context + Activation Seed</SourceLabel>
            <div className="space-y-2 text-sm leading-relaxed text-foreground/85">
              <div className="flex gap-2"><span className="font-semibold text-foreground/60 w-28 shrink-0">Persona</span><span>The Cautious First-Timer</span></div>
              <div className="flex gap-2"><span className="font-semibold text-foreground/60 w-28 shrink-0">Hypothesis</span><span>First-time mothers in the DACH region rely on medical authority as their primary trust anchor when selecting infant formula, creating a tension between clinical validation and peer community influence</span></div>
              <div className="flex gap-2"><span className="font-semibold text-foreground/60 w-28 shrink-0">Verdict</span><span>Validated (Strong)</span></div>
              <div className="flex gap-2"><span className="font-semibold text-foreground/60 w-28 shrink-0">Activation Seed</span><span>Validated hypothesis — strong alignment across consumer signals and cultural patterns</span></div>
              <div className="flex gap-2"><span className="font-semibold text-foreground/60 w-28 shrink-0">Direction</span><span>"{directionTitle}"</span></div>
              <div className="flex gap-2"><span className="font-semibold text-foreground/60 w-28 shrink-0">Report ID</span><span>VP-ACT-2026-0416-D1</span></div>
            </div>
          </section>

          {/* Section 2: Audience Insight */}
          <section>
            <SectionTitle>Audience Insight</SectionTitle>
            <SourceLabel>Consumer C · Persona definition, Page 3 verification, original posts</SourceLabel>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Target Audience</h4>
            <p className="mb-4 text-sm leading-relaxed text-foreground/80">
              The Cautious First-Timer: A high-anxiety first-time mother in early infancy (0–6M), navigating the breast-to-formula transition. Guided by medical authority, validated through peer experience. Primary driver: scientific credibility. Trust anchor: pediatrician endorsement.
            </p>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Verified Insight</h4>
            <p className="mb-1 text-sm leading-relaxed text-foreground/80">
              Medical authority is the dominant trust driver, but it is insufficient on its own — mothers actively seek peer validation to confirm clinical recommendations. This dual-trust dynamic is consistent across DACH markets with regional intensity variations.
            </p>
            <ul className="mb-4 space-y-1 text-sm text-foreground/70">
              <li>• Verdict: Validated (Strong)</li>
              <li>• Confidence: High</li>
            </ul>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Key Signals</h4>
            <ul className="mb-4 space-y-1 text-sm text-foreground/80">
              <li>• 78% of posts mentioning formula transition reference a healthcare professional</li>
              <li>• Peer experience threads receive 3.2× more engagement than brand content</li>
              <li>• "My pediatrician recommended…" is the most common trust-opening phrase in formula discussions</li>
            </ul>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Consumer Voices</h4>
            <div className="mb-4 space-y-2">
              <BriefQuote text="My pediatrician said Aptamil is fine, but I still needed to read what other moms experienced before I felt okay giving it." />
              <BriefQuote text="I trust the science, but the forums are where I go to feel less alone at 3am." />
              <BriefQuote text="When three moms in my group said the same thing my doctor said, that's when I actually believed it." />
            </div>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Unmet Needs</h4>
            <ul className="space-y-1 text-sm text-foreground/80">
              <li>• Trustworthy bridge between clinical recommendation and peer confirmation</li>
              <li>• Transition guidance that feels medically endorsed AND emotionally supportive</li>
              <li>• Nighttime/crisis-moment content that combines authority with empathy</li>
            </ul>
          </section>

          {/* Section 3: Market & Cultural Landscape */}
          <section>
            <SectionTitle>Market & Cultural Landscape</SectionTitle>
            <SourceLabel>Culture + Category + Connection · Internet Scouting (Tavily)</SourceLabel>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Cultural Context</h4>
            <ul className="mb-4 space-y-1 text-sm text-foreground/80">
              <li>• <strong>Macro Trends:</strong> Rising "informed motherhood" movement in DACH — mothers expect scientific backing but reject paternalistic messaging. Growing influence of digital parenting communities.</li>
              <li>• <strong>Cultural Tensions:</strong> Medical expertise is respected but increasingly questioned when it conflicts with lived peer experience. "Doctor says X but my baby…" is a recurring narrative pattern.</li>
            </ul>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Category Dynamics</h4>
            <ul className="mb-4 space-y-1 text-sm text-foreground/80">
              <li>• <strong>Competitive Landscape:</strong> HiPP dominates organic/natural positioning; Nestlé NAN leads clinical/medical messaging. No major brand owns the "bridge" between medical authority and peer trust.</li>
              <li>• <strong>Category Trends:</strong> Shift from pure ingredient-led messaging to emotional reassurance. Rise of "science + community" as a positioning territory.</li>
              <li>• <strong>Whitespace:</strong> No brand currently occupies "medically endorsed AND peer-validated" as a unified positioning.</li>
            </ul>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Connection Channels</h4>
            <ul className="space-y-1 text-sm text-foreground/80">
              <li>• <strong>Platform Presence:</strong> Highest engagement on parenting forums (Urbia.de, NetMoms), Instagram parenting accounts, and pediatrician-adjacent touchpoints.</li>
              <li>• <strong>Content Formats:</strong> Long-form personal stories outperform product-led content 4:1. Video testimonials from real mothers drive highest trust scores.</li>
              <li>• <strong>Influence Drivers:</strong> Pediatricians as primary trigger, peer mothers as validators, parenting influencers as amplifiers.</li>
            </ul>
          </section>

          {/* Section 4: Brand Play */}
          <section>
            <SectionTitle>Brand Play</SectionTitle>
            <SourceLabel>Company C · Internet Scouting (public)</SourceLabel>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Brand Positioning</h4>
            <p className="mb-4 text-sm leading-relaxed text-foreground/80">
              Aptamil positions itself as the science-led infant nutrition brand with "closest to breast milk" as its core claim. Strong R&D heritage (Milupa/Danone Research). Brand voice skews clinical-authoritative.
            </p>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Leverageable Brand Assets</h4>
            <ul className="mb-4 space-y-1 text-sm text-foreground/80">
              <li>• Pronutra+ proprietary blend — scientific credibility anchor</li>
              <li>• 50+ years of breast milk research heritage</li>
              <li>• Existing HCP (Healthcare Professional) recommendation network</li>
              <li>• "Inspired by breast milk science" tagline</li>
            </ul>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Recent Brand Activities</h4>
            <ul className="space-y-1 text-sm text-foreground/80">
              <li>• 2025 campaign: "Science of Closeness" — focused on R&D story, limited community angle</li>
              <li>• HCP outreach program in Germany and Austria — active but not consumer-visible</li>
              <li>• No active peer/community-building initiative in current brand portfolio</li>
            </ul>
          </section>

          {/* Section 5: Activation Direction */}
          <section>
            <SectionTitle>Activation Direction</SectionTitle>
            <SourceLabel>Activation Direction Module (P8) · 5C synthesis + Activation Seed</SourceLabel>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Selected Direction: "{directionTitle}"</h4>
            <ul className="mb-4 space-y-1 text-sm text-foreground/70">
              <li>• Priority: HIGH</li>
              <li>• Confidence: HIGH</li>
            </ul>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Rationale</h4>
            <p className="mb-4 text-sm leading-relaxed text-foreground/80">
              Leverages the tension between medical authority and peer validation — no competitor currently owns this positioning territory. Consumer signals consistently show that trust in formula choice is a two-step process (clinical → peer), and Aptamil has existing assets on the clinical side but no investment in the peer validation layer.
            </p>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Communication Lead</h4>
            <p className="mb-4 text-sm italic text-foreground/80">"Backed by science. Validated by moms like you."</p>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Key Scenarios</h4>
            <ul className="mb-4 space-y-1 text-sm text-foreground/80">
              <li>• First pediatrician visit after birth — the moment clinical recommendation is given</li>
              <li>• Late-night forum browsing during feeding — the moment peer validation is sought</li>
              <li>• Formula aisle decision moment — where both trust layers converge</li>
              <li>• Post-hospital discharge first week — peak anxiety window</li>
            </ul>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Tone Guidance</h4>
            <p className="mb-4 text-sm text-foreground/80">
              Reassuring, warm-scientific, not preachy. Acknowledge the mother's agency and intelligence. Never dismiss peer experience as inferior to medical advice — position them as complementary.
            </p>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Supporting Insights</h4>
            <p className="text-sm text-foreground/80">
              Consumer + Culture + Category — this direction draws on the dual-trust dynamic (Consumer), the medical-vs-peer tension (Culture), and the positioning whitespace (Category).
            </p>
          </section>

          {/* Section 6: Appendix / Sources */}
          <section>
            <SectionTitle>Appendix / Sources</SectionTitle>
            <SourceLabel>All C source_references + Internet Scout logs</SourceLabel>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Consumer Sources</h4>
            <ul className="mb-4 space-y-1 text-[13px] text-foreground/70">
              <li>• Page 3 verification dataset (internal)</li>
              <li>• Persona definition: "The Cautious First-Timer" (internal)</li>
              <li>• Representative posts: 42 analyzed, 12 high-relevance</li>
            </ul>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Culture Sources</h4>
            <ul className="mb-4 space-y-1 text-[13px] text-foreground/70">
              <li>• "Digital Parenting in DACH 2025" — Statista</li>
              <li>• "The Informed Mother: Trust Dynamics in German Parenting Communities" — ZHAW Zurich</li>
              <li>• Urbia.de forum analysis (Tavily, retrieved Apr 2026)</li>
            </ul>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Category Sources</h4>
            <ul className="mb-4 space-y-1 text-[13px] text-foreground/70">
              <li>• "Infant Formula Market DACH 2025-2026" — Euromonitor</li>
              <li>• HiPP, Nestlé NAN, Holle brand positioning analysis (Tavily, retrieved Apr 2026)</li>
            </ul>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Connection Sources</h4>
            <ul className="mb-4 space-y-1 text-[13px] text-foreground/70">
              <li>• NetMoms engagement data (Tavily, retrieved Apr 2026)</li>
              <li>• Instagram #formulafeeding DACH geo-filtered analysis</li>
            </ul>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Company Sources</h4>
            <ul className="mb-4 space-y-1 text-[13px] text-foreground/70">
              <li>• Aptamil.de official site</li>
              <li>• "Science of Closeness" campaign materials (public)</li>
              <li>• Danone Annual Report 2025 — Early Life Nutrition segment</li>
            </ul>

            <h4 className="mb-1 text-[12px] font-semibold text-foreground">Search Queries Used</h4>
            <ul className="space-y-1 text-[13px] text-muted-foreground/60 font-mono">
              <li>• "infant formula trust mothers Germany 2025"</li>
              <li>• "Säuglingsnahrung Vertrauen Mütter DACH"</li>
              <li>• "Aptamil brand positioning pediatrician"</li>
              <li>• "HiPP vs Aptamil market share Germany"</li>
              <li>• "parenting forum formula recommendation Urbia NetMoms"</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default CreativeBriefPanel;
