import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopNav from "@/components/TopNav";
import StepIndicator from "@/components/StepIndicator";
import {
  ArrowLeft,
  User,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  BarChart3,
  ShieldAlert,
  AlertTriangle,
  Lightbulb,
  PenLine,
  Send,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

/* ── mock data ─────────────────────────────────────────── */

const reasoningScores = [
  { label: "Emotional Resonance", value: 92 },
  { label: "Stage Match", value: 85 },
  { label: "Risk Sensitivity", value: 94 },
  { label: "Behavioral Readiness", value: 88 },
  { label: "Conversion Risk", value: 81 },
  { label: "Ingredient Trust", value: 96 },
];

const barriers = [
  { text: "Price sensitivity may outweigh ingredient trust during promotional periods", severity: "High", source: "42%" },
  { text: "Contradictory behaviour: claiming ingredient-first but purchasing by discount", severity: "Medium", source: "28%" },
  { text: "Low awareness of specific certifications referenced in hypothesis", severity: "Low", source: "15%" },
];

const counterfactuals = [
  "If peer validation scores dropped below 60, trust in origin claims would weaken significantly.",
  "Removing social-proof elements from the purchase journey reduces conversion intent by ~35%.",
  "Switching from 'organic' to 'clinically tested' framing reverses ingredient-trust priority ranking.",
];

const unexpectedFindings = [
  "Anxious mothers show higher trust in unfamiliar brands when packaging includes QR-linked lab reports.",
  "Formula milk origin matters less than expected when the retailer brand is strong (e.g. flagship stores).",
  "Night-time browsing sessions (22:00–01:00) correlate with 2.3× higher engagement on safety-related content.",
];

const refinedHypotheses = [
  {
    title: "Ingredient transparency drives purchase only when paired with peer endorsement",
    explanation:
      "The data suggests ingredient origin alone is necessary but insufficient. Pairing it with community validation (e.g. parenting-forum mentions, KOL reviews) amplifies trust and intent to purchase.",
  },
  {
    title: "Safety anxiety peaks during the first 6 months post-birth and declines after 12 months",
    explanation:
      "Temporal analysis reveals a bell-curve pattern in safety-related search queries, suggesting hypothesis testing should segment by infant age.",
  },
];

const campaignRecs = [
  {
    title: "Launch 'Trace the Source' interactive mini-program",
    priority: "High",
    evidence: "Origin transparency scored 96 — highest among all trust drivers. An interactive traceability experience converts latent trust into engagement.",
  },
  {
    title: "Partner with parenting KOLs for ingredient deep-dive content",
    priority: "High",
    evidence: "Peer validation is the #1 purchase accelerator (42% attribution). Expert-endorsed content amplifies both trust and shareability.",
  },
  {
    title: "A/B test 'clinically tested' vs 'organic' badge on PDP pages",
    priority: "Medium",
    evidence: "Counterfactual signal shows framing swap reverses trust ranking — a low-cost experiment with high diagnostic value.",
  },
];

const reasoningSteps = [
  "Parsed hypothesis statement and extracted 3 key constructs",
  "Mapped constructs to persona dimensional model (6 axes)",
  "Retrieved 1,247 behavioural data points from last 90 days",
  "Applied sentiment analysis to 340 social listening mentions",
  "Cross-referenced purchase funnel data with stated preferences",
  "Ran counterfactual simulations (3 scenarios)",
  "Synthesised findings into verdict with confidence interval",
];

/* ── component ─────────────────────────────────────────── */

const ValidationOutput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const personaName = (location.state as any)?.personaName as string | undefined;

  const [reasoningOpen, setReasoningOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <StepIndicator currentStep={3} />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-8 lg:px-12">
        {/* ── Header row ── */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/hypothesis", { state: { personaName } })}
              className="flex items-center gap-1.5 text-[12px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            {personaName && (
              <>
                <div className="h-6 w-px bg-border" />
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-medium text-foreground">{personaName}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60">P001</p>
                  </div>
                </div>
              </>
            )}
          </div>

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

        {/* ── Reasoning Process (collapsible) ── */}
        <button
          onClick={() => setReasoningOpen(!reasoningOpen)}
          className="mb-6 flex w-full items-center justify-between rounded-xl border border-border/40 bg-card px-5 py-3.5 text-left transition-colors hover:bg-accent/30"
        >
          <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            View Reasoning Process
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-muted-foreground/60">23 steps · 37 s</span>
            {reasoningOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </button>

        {reasoningOpen && (
          <div className="mb-6 rounded-xl border border-border/40 bg-card p-5">
            <ol className="space-y-2.5">
              {reasoningSteps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* ── 1. Verdict Card ── */}
        <section className="mb-6 rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <div className="mb-5 flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <h2 className="font-serif text-xl font-semibold tracking-tight text-foreground">
              Hypothesis Confirmed
            </h2>
          </div>

          <div className="mb-5 flex items-center gap-4">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-4xl font-bold text-emerald-500">87</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
            <div className="text-sm text-muted-foreground">Confidence Score</div>
          </div>

          <p className="mb-4 text-sm leading-relaxed text-foreground/90">
            The hypothesis that anxious mothers care more about formula milk origin and
            ingredients is <strong>strongly supported</strong> by the available data. Behavioural
            signals, sentiment analysis, and purchase-funnel patterns all converge on the same
            conclusion.
          </p>

          <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-4">
            <p className="text-[13px] leading-relaxed text-emerald-700 dark:text-emerald-400">
              Cross-referencing 1,247 data points across social listening, search behaviour, and
              transaction records reveals a statistically significant correlation (r = 0.82) between
              safety-anxiety index and ingredient-origin engagement metrics.
            </p>
          </div>
        </section>

        {/* ── 2. Reasoning Scores ── */}
        <section className="mb-6 rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-2.5">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-lg font-semibold tracking-tight text-foreground">
              Reasoning Scores
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {reasoningScores.map((s) => (
              <div key={s.label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[12px] font-medium text-foreground/80">{s.label}</span>
                  <span className="text-[12px] font-semibold text-foreground">{s.value}</span>
                </div>
                <Progress value={s.value} className="h-2" />
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Key Barriers ── */}
        <section className="mb-6 rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-2.5">
            <ShieldAlert className="h-5 w-5 text-destructive" />
            <h2 className="font-serif text-lg font-semibold tracking-tight text-foreground">
              Key Barriers
            </h2>
          </div>

          <div className="space-y-4">
            {barriers.map((b, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    b.severity === "High"
                      ? "bg-destructive"
                      : b.severity === "Medium"
                        ? "bg-amber-500"
                        : "bg-muted-foreground/40"
                  }`}
                />
                <div>
                  <p className="text-sm leading-relaxed text-foreground/90">{b.text}</p>
                  <div className="mt-1 flex gap-3">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                      Severity: {b.severity}
                    </span>
                    <span className="text-[10px] text-muted-foreground/40">·</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                      Source: {b.source}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Counterfactual Signals ── */}
        <section className="mb-6 rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <div className="mb-2 flex items-center gap-2.5">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h2 className="font-serif text-lg font-semibold tracking-tight text-foreground">
              Counterfactual Signals
            </h2>
          </div>
          <p className="mb-5 text-[12px] text-muted-foreground/60">
            What signals would change the verdict?
          </p>

          <div className="space-y-3">
            {counterfactuals.map((c, i) => (
              <div key={i} className="flex gap-3">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-500/70" />
                <p className="text-sm leading-relaxed text-foreground/80">{c}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. Unexpected Findings ── */}
        <section className="mb-6 rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-2.5">
            <Lightbulb className="h-5 w-5 text-purple-500" />
            <h2 className="font-serif text-lg font-semibold tracking-tight text-foreground">
              Unexpected Findings
            </h2>
          </div>

          <div className="space-y-3">
            {unexpectedFindings.map((f, i) => (
              <div key={i} className="flex gap-3">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-purple-400/60" />
                <p className="text-sm leading-relaxed text-foreground/80">{f}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. Hypothesis Refinement (Track A) ── */}
        <section className="mb-6 rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-2.5">
            <PenLine className="h-5 w-5 text-blue-500" />
            <h2 className="font-serif text-lg font-semibold tracking-tight text-foreground">
              Hypothesis Refinement
            </h2>
            <Badge variant="secondary" className="ml-auto text-[10px] font-medium uppercase tracking-wider">
              Track A
            </Badge>
          </div>

          <div className="space-y-5">
            {refinedHypotheses.map((h, i) => (
              <div key={i} className="rounded-lg border border-border/40 p-5">
                <div className="mb-2 flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-[11px] font-semibold text-blue-500">
                    {i + 1}
                  </span>
                  <h3 className="text-sm font-medium leading-snug text-foreground">{h.title}</h3>
                </div>
                <p className="ml-9 text-[13px] leading-relaxed text-muted-foreground">{h.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. Campaign Recommendations (Track B) ── */}
        <section className="mb-10 rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-2.5">
            <Send className="h-5 w-5 text-rose-500" />
            <h2 className="font-serif text-lg font-semibold tracking-tight text-foreground">
              Campaign Recommendations
            </h2>
            <Badge variant="secondary" className="ml-auto text-[10px] font-medium uppercase tracking-wider">
              Track B
            </Badge>
          </div>

          <div className="space-y-4">
            {campaignRecs.map((r, i) => (
              <div key={i} className="rounded-lg border border-border/40 p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">{r.title}</h3>
                  <Badge
                    variant={r.priority === "High" ? "destructive" : "secondary"}
                    className="text-[10px]"
                  >
                    Priority: {r.priority}
                  </Badge>
                </div>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{r.evidence}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ValidationOutput;
