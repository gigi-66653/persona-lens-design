import { useState } from "react";
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react";

/* ── Sources toggle ── */
const SourcesToggle = ({ sources }: { sources: string[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 border-t border-border/40 pt-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60 hover:text-muted-foreground transition-colors"
      >
        View Sources {open ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>
      {open && (
        <ul className="mt-2 space-y-1">
          {sources.map((s, i) => (
            <li key={i} className="text-[12px] text-primary/70 break-all">{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* ── Field label ── */
const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary/80">
    {children}
  </h4>
);

/* ── Quote block (consumer voices style) ── */
const QuoteBlock = ({ text }: { text: string }) => (
  <div className="border-l-2 border-primary/40 bg-muted/30 py-2 pl-4 pr-3 rounded-r">
    <p className="font-serif text-[13px] italic leading-relaxed text-foreground/80">{text}</p>
  </div>
);

/* ── Tab data ── */
const tabs = [
  { key: "consumer", label: "Consumer" },
  { key: "culture", label: "Culture" },
  { key: "category", label: "Category" },
  { key: "connection", label: "Connection" },
  { key: "company", label: "Company" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

/* ── Content ── */
const ConsumerContent = () => (
  <div className="space-y-6">
    <div>
      <FieldLabel>Persona Snapshot</FieldLabel>
      <p className="text-sm leading-relaxed text-foreground/85">
        The Cautious First-Timer: A high-anxiety first-time mother in early infancy (0-6M), guided by medical authority and triggered by breast-to-formula transition. Top driver: Scientific Credibility. Trust anchor: Medical Authority.
      </p>
    </div>
    <div>
      <FieldLabel>Verified Insight</FieldLabel>
      <p className="text-sm leading-relaxed text-foreground/85">
        Mothers in this group rely heavily on pediatrician advice but simultaneously seek peer validation online, creating a dual-trust dynamic. Verdict: Partially Supported (Confidence: 0.72)
      </p>
    </div>
    <div>
      <FieldLabel>Key Signals</FieldLabel>
      <ul className="space-y-2 text-sm text-foreground/80">
        <li className="flex gap-2"><span className="shrink-0">•</span>Emotional resonance: High anxiety around 'doing it right' — pediatrician advice provides safety anchor (Score: 7.8/10)</li>
        <li className="flex gap-2"><span className="shrink-0">•</span>Behavioral readiness: Active in parenting forums despite claiming to trust only doctors (Score: 6.5/10)</li>
        <li className="flex gap-2"><span className="shrink-0">•</span>Risk sensitivity: Switching aversion driven by fear of 'harming baby' rather than brand loyalty (Score: 8.2/10)</li>
      </ul>
    </div>
    <div>
      <FieldLabel>Consumer Voices</FieldLabel>
      <div className="space-y-3">
        <QuoteBlock text="I always ask my pediatrician first, but then I go to the forum to see what other moms actually experienced..." />
        <QuoteBlock text="I know what the doctor says, but hearing from a mom who's been through it just hits different." />
      </div>
    </div>
    <div>
      <FieldLabel>Unmet Needs</FieldLabel>
      <ul className="space-y-2 text-sm text-foreground/80">
        <li className="flex gap-2"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />Need for a trusted 'bridge' between medical advice and real-world peer experience</li>
        <li className="flex gap-2"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />Desire for formula transition guidance that feels medically endorsed but emotionally supportive</li>
      </ul>
    </div>
  </div>
);

const CultureContent = () => (
  <div className="space-y-6">
    <div>
      <FieldLabel>Macro Trends</FieldLabel>
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-foreground">Evidence-Based Parenting Movement</p>
          <p className="text-[13px] leading-relaxed text-foreground/75">Growing demand for science-backed parenting decisions in DACH markets, driven by social media health literacy.</p>
          <p className="mt-1 text-[11px] text-muted-foreground/50">[Source: Deutsche Hebammenzeitung, 2024]</p>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Digital Parenting Communities Boom</p>
          <p className="text-[13px] leading-relaxed text-foreground/75">Forum-based peer support surging among first-time parents; Netmoms.de and Urbia saw 40% growth in formula-related threads YoY.</p>
          <p className="mt-1 text-[11px] text-muted-foreground/50">[Source: Similarweb Traffic Analysis, 2024]</p>
        </div>
      </div>
    </div>
    <div>
      <FieldLabel>Cultural Tensions</FieldLabel>
      <div>
        <p className="text-sm font-medium text-foreground">Medical Authority vs. Community Wisdom</p>
        <p className="text-[13px] leading-relaxed text-foreground/75">German mothers respect institutional medical advice but increasingly turn to online peer communities for emotional validation and practical tips</p>
      </div>
    </div>
    <SourcesToggle sources={[
      "https://www.hebammenzeitung.de/evidence-based-parenting-2024",
      "https://www.similarweb.com/de/website/netmoms.de",
      "https://www.urbia.de/forum/formula-threads-analysis",
    ]} />
  </div>
);

const CategoryContent = () => (
  <div className="space-y-6">
    <div>
      <FieldLabel>Competitive Landscape</FieldLabel>
      <p className="text-sm leading-relaxed text-foreground/85">
        DACH infant formula market is dominated by Aptamil (Danone), HiPP, and Holle, with premium organic positioning as the key differentiator. Market growing at 3.2% CAGR.
      </p>
    </div>
    <div>
      <FieldLabel>Category Trends</FieldLabel>
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-foreground">Clean Label Demand</p>
          <p className="text-[13px] leading-relaxed text-foreground/75">Parents increasingly scrutinize ingredient lists; 'no palm oil' and 'organic' are becoming table stakes rather than differentiators</p>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">HCP-Endorsed Marketing</p>
          <p className="text-[13px] leading-relaxed text-foreground/75">Brands leveraging healthcare professional endorsements see 2.1x higher conversion among first-time parents</p>
        </div>
      </div>
    </div>
    <div>
      <FieldLabel>Whitespace</FieldLabel>
      <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
        <p className="text-sm font-medium text-foreground">Science-Backed Emotional Reassurance</p>
        <p className="text-[13px] leading-relaxed text-foreground/75">No major brand owns the intersection of clinical credibility and emotional support for anxious first-time mothers</p>
      </div>
    </div>
    <SourcesToggle sources={[
      "https://www.euromonitor.com/dach-infant-formula-2024",
      "https://www.mintel.com/clean-label-baby-food-trends",
      "https://www.nielsen.com/hcp-marketing-effectiveness",
    ]} />
  </div>
);

const ConnectionContent = () => (
  <div className="space-y-6">
    <div>
      <FieldLabel>Platform Presence</FieldLabel>
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-foreground">Netmoms.de & Urbia</p>
          <p className="text-[13px] leading-relaxed text-foreground/75">Primary forums where first-time mothers seek formula advice; threads often start with pediatrician quotes then pivot to personal experience sharing</p>
        </div>
      </div>
    </div>
    <div>
      <FieldLabel>Content Formats</FieldLabel>
      <div>
        <p className="text-sm font-medium text-foreground">Long-form forum threads</p>
        <p className="text-[13px] leading-relaxed text-foreground/75">Most trusted format; mothers read 10+ replies before forming opinion. Short-form (Instagram/TikTok) drives awareness but not trust.</p>
      </div>
    </div>
    <div>
      <FieldLabel>Influence Drivers</FieldLabel>
      <div>
        <p className="text-sm font-medium text-foreground">Pediatrician endorsement {">"} KOL recommendation</p>
        <p className="text-[13px] leading-relaxed text-foreground/75">For this persona, a product mentioned by their pediatrician carries 3x the weight of an influencer post</p>
      </div>
    </div>
    <SourcesToggle sources={[
      "https://www.netmoms.de/forum/formula-discussions",
      "https://www.urbia.de/forum/baby-ernaehrung",
      "https://www.instagram.com/aptamil_de/insights",
    ]} />
  </div>
);

const CompanyContent = () => (
  <div className="space-y-6">
    <div>
      <FieldLabel>Brand Positioning</FieldLabel>
      <p className="text-sm leading-relaxed text-foreground/85">
        Aptamil positions as the science-led premium formula brand in DACH, leveraging 50+ years of breast milk research. 'Inspired by breast milk' is the core communication platform.
      </p>
    </div>
    <div>
      <FieldLabel>Brand Assets</FieldLabel>
      <div>
        <p className="text-sm font-medium text-foreground">Pronutra+ research heritage</p>
        <p className="text-[13px] leading-relaxed text-foreground/75">Proprietary blend with strong clinical backing, differentiator vs. organic-first competitors</p>
      </div>
    </div>
    <div>
      <FieldLabel>Recent Activities</FieldLabel>
      <div>
        <p className="text-sm font-medium text-foreground">2024 Q4: 'Science of Togetherness' campaign</p>
        <p className="text-[13px] leading-relaxed text-foreground/75">Shifted messaging from pure science to emotional bonding, tested in DE market with positive recall metrics</p>
      </div>
    </div>
    <SourcesToggle sources={[
      "https://www.aptamil.de/about-us",
      "https://www.danone.com/brands/specialized-nutrition/aptamil.html",
      "https://www.campaignlive.com/aptamil-science-togetherness",
    ]} />
  </div>
);

const contentMap: Record<TabKey, React.ReactNode> = {
  consumer: <ConsumerContent />,
  culture: <CultureContent />,
  category: <CategoryContent />,
  connection: <ConnectionContent />,
  company: <CompanyContent />,
};

const FiveCAnalysis = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("consumer");

  return (
    <section className="mb-8">
      <h2 className="mb-6 font-serif text-2xl font-semibold tracking-tight text-foreground">
        5C Analysis
      </h2>

      {/* Tabs */}
      <div className="mb-0 flex border-b border-border/60">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative px-5 py-3 text-[12px] font-medium uppercase tracking-[0.12em] transition-colors ${
              activeTab === tab.key
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-b-2xl border border-t-0 border-border/60 bg-card p-8 shadow-sm">
        {contentMap[activeTab]}
      </div>
    </section>
  );
};

export default FiveCAnalysis;
