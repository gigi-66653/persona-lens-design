import { useState, useEffect } from "react";
import { Lightbulb, ChevronDown, ChevronUp, Check, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Types ── */
type ValidatedTabKey = "culture" | "category" | "connection" | "company";
type TabKey = "consumer" | ValidatedTabKey;

export type InsightStatus = "approved" | "rejected";

export interface ValidatedInsight {
  id: string;
  title?: string;
  body: string;
  source?: { url: string; snippet: string };
}

export interface InsightStateMap {
  // tabKey -> insightId -> status
  [tab: string]: { [id: string]: InsightStatus };
}

export interface ApprovalStats {
  totalApproved: number;
  totalRejected: number;
  perTab: Record<ValidatedTabKey, { approved: number; rejected: number }>;
  lowDataTabs: ValidatedTabKey[]; // tabs with <=1 approved insight
}

interface FiveCAnalysisProps {
  insightState: InsightStateMap;
  onInsightStateChange: (next: InsightStateMap) => void;
  onStatsChange?: (stats: ApprovalStats) => void;
}

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

/* ── Per-insight source expand ── */
const InsightSource = ({ url, snippet }: { url: string; snippet: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-[11px] text-muted-foreground/70 hover:text-muted-foreground transition-colors"
      >
        Source: <span className="text-primary/70 underline-offset-2 hover:underline truncate max-w-[280px]">{url}</span>
        {open ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>
      {open && (
        <p className="mt-1.5 rounded border border-border/40 bg-muted/20 px-3 py-2 text-[12px] italic leading-relaxed text-foreground/70">
          "{snippet}"
        </p>
      )}
    </div>
  );
};

/* ── Approve / Reject toggle ── */
const ApprovalToggle = ({
  status,
  onChange,
}: {
  status: InsightStatus;
  onChange: (next: InsightStatus) => void;
}) => (
  <div className="flex shrink-0 items-center gap-1">
    <button
      onClick={() => onChange("approved")}
      aria-label="Approve"
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-full border transition-all",
        status === "approved"
          ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
          : "border-border/60 bg-background text-muted-foreground/50 hover:border-emerald-300 hover:text-emerald-500"
      )}
    >
      <Check className="h-3.5 w-3.5" strokeWidth={3} />
    </button>
    <button
      onClick={() => onChange("rejected")}
      aria-label="Reject"
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-full border transition-all",
        status === "rejected"
          ? "border-destructive bg-destructive text-destructive-foreground shadow-sm"
          : "border-border/60 bg-background text-muted-foreground/50 hover:border-destructive/40 hover:text-destructive"
      )}
    >
      <X className="h-3.5 w-3.5" strokeWidth={3} />
    </button>
  </div>
);

/* ── Validated insight item card ── */
const ValidatedItem = ({
  insight,
  status,
  onChange,
}: {
  insight: ValidatedInsight;
  status: InsightStatus;
  onChange: (next: InsightStatus) => void;
}) => {
  const rejected = status === "rejected";
  return (
    <div
      className={cn(
        "rounded-lg border border-border/40 bg-background/40 p-4 transition-colors",
        rejected && "bg-muted/20"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className={cn("flex-1", rejected && "opacity-50")}>
          {insight.title && (
            <p
              className={cn(
                "text-sm font-medium text-foreground",
                rejected && "line-through"
              )}
            >
              {insight.title}
            </p>
          )}
          <p
            className={cn(
              "text-[13px] leading-relaxed text-foreground/75",
              insight.title && "mt-0.5",
              rejected && "line-through"
            )}
          >
            {insight.body}
          </p>
          {insight.source && (
            <InsightSource url={insight.source.url} snippet={insight.source.snippet} />
          )}
        </div>
        <ApprovalToggle status={status} onChange={onChange} />
      </div>
    </div>
  );
};

/* ── Validated section: a labeled group of validated insights ── */
const ValidatedSection = ({
  label,
  insights,
  tabKey,
  state,
  onToggle,
}: {
  label: string;
  insights: ValidatedInsight[];
  tabKey: ValidatedTabKey;
  state: InsightStateMap;
  onToggle: (tab: ValidatedTabKey, id: string, status: InsightStatus) => void;
}) => (
  <div>
    <FieldLabel>{label}</FieldLabel>
    <div className="space-y-3">
      {insights.map((ins) => {
        const status = state[tabKey]?.[ins.id] ?? "approved";
        return (
          <ValidatedItem
            key={ins.id}
            insight={ins}
            status={status}
            onChange={(next) => onToggle(tabKey, ins.id, next)}
          />
        );
      })}
    </div>
  </div>
);

/* ── Mock data for the 4 validated C tabs ── */
const cultureData: { label: string; insights: ValidatedInsight[] }[] = [
  {
    label: "Macro Trends",
    insights: [
      {
        id: "macro-1",
        title: "Evidence-Based Parenting Movement",
        body: "Growing demand for science-backed parenting decisions in DACH markets, driven by social media health literacy.",
        source: {
          url: "hebammenzeitung.de/evidence-based-parenting-2024",
          snippet: "Survey of 1,200 DACH parents shows 68% now actively seek peer-reviewed sources before making infant nutrition decisions, up from 42% in 2020.",
        },
      },
      {
        id: "macro-2",
        title: "Digital Parenting Communities Boom",
        body: "Forum-based peer support surging among first-time parents; Netmoms.de and Urbia saw 40% growth in formula-related threads YoY.",
        source: {
          url: "similarweb.com/de/website/netmoms.de",
          snippet: "Netmoms.de monthly active visitors grew from 2.1M to 2.9M between 2023 and 2024, with formula and feeding subforums driving the largest engagement uplift.",
        },
      },
    ],
  },
  {
    label: "Cultural Tensions",
    insights: [
      {
        id: "tension-1",
        title: "Medical Authority vs. Community Wisdom",
        body: "German mothers respect institutional medical advice but increasingly turn to online peer communities for emotional validation and practical tips.",
        source: {
          url: "urbia.de/forum/formula-threads-analysis",
          snippet: "Thread analysis: 73% of formula-recommendation threads open with a pediatrician quote but conclude based on the mother's own peer-validated decision.",
        },
      },
    ],
  },
];

const categoryData: { label: string; insights: ValidatedInsight[] }[] = [
  {
    label: "Competitive Landscape",
    insights: [
      {
        id: "comp-1",
        body: "DACH infant formula market is dominated by Aptamil (Danone), HiPP, and Holle, with premium organic positioning as the key differentiator. Market growing at 3.2% CAGR.",
        source: {
          url: "euromonitor.com/dach-infant-formula-2024",
          snippet: "Aptamil holds 34% value share, HiPP 28%, Holle 11% in the DACH premium infant formula segment as of Q3 2024.",
        },
      },
    ],
  },
  {
    label: "Category Trends",
    insights: [
      {
        id: "trend-1",
        title: "Clean Label Demand",
        body: "Parents increasingly scrutinize ingredient lists; 'no palm oil' and 'organic' are becoming table stakes rather than differentiators.",
        source: {
          url: "mintel.com/clean-label-baby-food-trends",
          snippet: "82% of DACH parents check ingredient labels before purchase; palm-oil-free claims no longer drive significant preference uplift versus 2021 baseline.",
        },
      },
      {
        id: "trend-2",
        title: "HCP-Endorsed Marketing",
        body: "Brands leveraging healthcare professional endorsements see 2.1x higher conversion among first-time parents.",
        source: {
          url: "nielsen.com/hcp-marketing-effectiveness",
          snippet: "Conversion lift study (n=4,800): formula brands with visible HCP endorsement achieved 2.1x conversion vs. control among first-time-parent buyers.",
        },
      },
    ],
  },
  {
    label: "Whitespace",
    insights: [
      {
        id: "white-1",
        title: "Science-Backed Emotional Reassurance",
        body: "No major brand owns the intersection of clinical credibility and emotional support for anxious first-time mothers.",
        source: {
          url: "kantar.com/dach-formula-positioning-map",
          snippet: "Brand positioning map (2024): clinical-credibility axis dominated by Aptamil, emotional-warmth axis by HiPP, with the intersection quadrant largely empty.",
        },
      },
    ],
  },
];

const connectionData: { label: string; insights: ValidatedInsight[] }[] = [
  {
    label: "Platform Presence",
    insights: [
      {
        id: "plat-1",
        title: "Netmoms.de & Urbia",
        body: "Primary forums where first-time mothers seek formula advice; threads often start with pediatrician quotes then pivot to personal experience sharing.",
        source: {
          url: "netmoms.de/forum/formula-discussions",
          snippet: "Top 50 formula-advice threads on Netmoms.de in 2024 averaged 47 replies; 81% included at least one mention of a pediatrician recommendation.",
        },
      },
    ],
  },
  {
    label: "Content Formats",
    insights: [
      {
        id: "fmt-1",
        title: "Long-form forum threads",
        body: "Most trusted format; mothers read 10+ replies before forming opinion. Short-form (Instagram/TikTok) drives awareness but not trust.",
        source: {
          url: "urbia.de/forum/baby-ernaehrung",
          snippet: "Reader-behavior tracking: average mother spends 11.4 minutes per formula thread and views ≥10 replies before making or changing a brand intent.",
        },
      },
    ],
  },
  {
    label: "Influence Drivers",
    insights: [
      {
        id: "inf-1",
        title: "Pediatrician endorsement > KOL recommendation",
        body: "For this persona, a product mentioned by their pediatrician carries 3x the weight of an influencer post.",
        source: {
          url: "instagram.com/aptamil_de/insights",
          snippet: "First-time-parent panel survey: pediatrician mention scored 8.7/10 trust, parenting-influencer post scored 2.9/10 trust on identical claims.",
        },
      },
    ],
  },
];

const companyData: { label: string; insights: ValidatedInsight[] }[] = [
  {
    label: "Brand Positioning",
    insights: [
      {
        id: "pos-1",
        body: "Aptamil positions as the science-led premium formula brand in DACH, leveraging 50+ years of breast milk research. 'Inspired by breast milk' is the core communication platform.",
        source: {
          url: "aptamil.de/about-us",
          snippet: "Aptamil brand site: '50+ years of breast milk research' headlines the about page; 'Inspired by breast milk' tagline appears across all DACH market touchpoints.",
        },
      },
    ],
  },
  {
    label: "Brand Assets",
    insights: [
      {
        id: "asset-1",
        title: "Pronutra+ research heritage",
        body: "Proprietary blend with strong clinical backing, differentiator vs. organic-first competitors.",
        source: {
          url: "danone.com/brands/specialized-nutrition/aptamil.html",
          snippet: "Danone reports Pronutra+ underpinned by 30+ peer-reviewed studies, used as the lead scientific asset in Aptamil's premium and follow-on lines.",
        },
      },
    ],
  },
  {
    label: "Recent Activities",
    insights: [
      {
        id: "act-1",
        title: "2024 Q4: 'Science of Togetherness' campaign",
        body: "Shifted messaging from pure science to emotional bonding, tested in DE market with positive recall metrics.",
        source: {
          url: "campaignlive.com/aptamil-science-togetherness",
          snippet: "Campaign post-test (DE, Nov 2024): unaided recall +14pts vs. prior science-only execution; emotional-warmth attribute scores improved by 22%.",
        },
      },
    ],
  },
];

const validatedTabData: Record<ValidatedTabKey, { label: string; insights: ValidatedInsight[] }[]> = {
  culture: cultureData,
  category: categoryData,
  connection: connectionData,
  company: companyData,
};

const tabs = [
  { key: "consumer", label: "Consumer" },
  { key: "culture", label: "Culture" },
  { key: "category", label: "Category" },
  { key: "connection", label: "Connection" },
  { key: "company", label: "Company" },
] as const;

/* ── Consumer (no validation) ── */
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

/* ── Generic validated tab content ── */
const ValidatedTabContent = ({
  tabKey,
  state,
  onToggle,
  rejectedCount,
}: {
  tabKey: ValidatedTabKey;
  state: InsightStateMap;
  onToggle: (tab: ValidatedTabKey, id: string, status: InsightStatus) => void;
  rejectedCount: number;
}) => {
  const sections = validatedTabData[tabKey];
  return (
    <div className="space-y-6">
      {sections.map((sec) => (
        <ValidatedSection
          key={sec.label}
          label={sec.label}
          insights={sec.insights}
          tabKey={tabKey}
          state={state}
          onToggle={onToggle}
        />
      ))}

      {/* V2.1 placeholder — only when 2+ rejected */}
      {rejectedCount >= 2 && (
        <div className="mt-2 rounded-lg border border-dashed border-border/60 bg-muted/10 px-4 py-5 text-center">
          <p className="text-sm font-medium text-muted-foreground/80">Refine Search — coming soon</p>
          <p className="mt-1 text-[12px] text-muted-foreground/60">
            You'll be able to guide a new search for this dimension with your own direction.
          </p>
        </div>
      )}
    </div>
  );
};

/* ── Helpers ── */
const computeStats = (state: InsightStateMap): ApprovalStats => {
  const perTab = {} as ApprovalStats["perTab"];
  let totalApproved = 0;
  let totalRejected = 0;
  const lowDataTabs: ValidatedTabKey[] = [];

  (Object.keys(validatedTabData) as ValidatedTabKey[]).forEach((tab) => {
    const allIds = validatedTabData[tab].flatMap((s) => s.insights.map((i) => i.id));
    let approved = 0;
    let rejected = 0;
    allIds.forEach((id) => {
      const s = state[tab]?.[id] ?? "approved";
      if (s === "approved") approved += 1;
      else rejected += 1;
    });
    perTab[tab] = { approved, rejected };
    totalApproved += approved;
    totalRejected += rejected;
    if (approved <= 1) lowDataTabs.push(tab);
  });

  return { totalApproved, totalRejected, perTab, lowDataTabs };
};

export const buildInitialInsightState = (): InsightStateMap => {
  const state: InsightStateMap = {};
  (Object.keys(validatedTabData) as ValidatedTabKey[]).forEach((tab) => {
    state[tab] = {};
    validatedTabData[tab].forEach((sec) => {
      sec.insights.forEach((ins) => {
        state[tab][ins.id] = "approved";
      });
    });
  });
  return state;
};

const FiveCAnalysis = ({ insightState, onInsightStateChange, onStatsChange }: FiveCAnalysisProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>("consumer");

  const stats = computeStats(insightState);

  useEffect(() => {
    onStatsChange?.(stats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(insightState)]);

  const handleToggle = (tab: ValidatedTabKey, id: string, status: InsightStatus) => {
    onInsightStateChange({
      ...insightState,
      [tab]: {
        ...insightState[tab],
        [id]: status,
      },
    });
  };

  return (
    <section className="mb-8">
      <h2 className="mb-6 font-serif text-2xl font-semibold tracking-tight text-foreground">
        5C Analysis
      </h2>

      {/* Tabs */}
      <div className="mb-0 flex border-b border-border/60">
        {tabs.map((tab) => {
          const isLow =
            tab.key !== "consumer" && stats.lowDataTabs.includes(tab.key as ValidatedTabKey);
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabKey)}
              className={cn(
                "relative flex items-center gap-1.5 px-5 py-3 text-[12px] font-medium uppercase tracking-[0.12em] transition-colors",
                activeTab === tab.key
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {isLow && (
                <span
                  title="Limited validated data"
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/15 text-amber-600"
                >
                  <AlertTriangle className="h-2.5 w-2.5" />
                </span>
              )}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="rounded-b-2xl border border-t-0 border-border/60 bg-card p-8 shadow-sm">
        {activeTab === "consumer" ? (
          <ConsumerContent />
        ) : (
          <ValidatedTabContent
            tabKey={activeTab as ValidatedTabKey}
            state={insightState}
            onToggle={handleToggle}
            rejectedCount={stats.perTab[activeTab as ValidatedTabKey].rejected}
          />
        )}
      </div>
    </section>
  );
};

export default FiveCAnalysis;
