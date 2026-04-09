import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopNav from "@/components/TopNav";
import StepIndicator from "@/components/StepIndicator";
import { ArrowLeft, Lightbulb, Plus, Sparkles, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const suggestedConcepts = [
  "Ingredient trust",
  "Safety anxiety",
  "Peer validation",
  "Premium positioning",
  "Origin transparency",
];

const HypothesisInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const personaName = location.state?.personaName as string | undefined;

  const [hypothesis, setHypothesis] = useState("");
  const [conceptInput, setConceptInput] = useState("");
  const [concepts, setConcepts] = useState<string[]>([]);
  const [timeWindow, setTimeWindow] = useState("90");

  const addConcept = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !concepts.includes(trimmed)) {
      setConcepts((prev) => [...prev, trimmed]);
    }
    setConceptInput("");
  };

  const removeConcept = (concept: string) => {
    setConcepts((prev) => prev.filter((c) => c !== concept));
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <StepIndicator currentStep={2} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-8">
        {/* Back + Persona info */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
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
                  <p className="text-sm font-medium text-foreground">
                    {personaName}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
                    P001
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-border/60 bg-card p-10 shadow-sm">
          {/* Header */}
          <div className="mb-8 flex items-center gap-2.5">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-xl font-semibold tracking-tight text-foreground">
              Hypothesis Input
            </h2>
          </div>

          {/* Hypothesis statement */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Hypothesis Statement{" "}
              <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="e.g. Anxious mothers care more about formula milk origin and ingredients"
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              className="h-12 border-border/50 bg-background text-sm placeholder:text-muted-foreground/50"
            />
            <p className="mt-2 text-[11px] text-muted-foreground/70">
              Enter a clear, verifiable hypothesis statement
            </p>
          </div>

          {/* Concept Components */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Concept Components
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a key concept…"
                value={conceptInput}
                onChange={(e) => setConceptInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addConcept(conceptInput);
                  }
                }}
                className="h-12 flex-1 border-border/50 bg-background text-sm placeholder:text-muted-foreground/50"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 shrink-0 border-border/50"
                onClick={() => addConcept(conceptInput)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Added concepts */}
            {concepts.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {concepts.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary"
                  >
                    {c}
                    <button
                      onClick={() => removeConcept(c)}
                      className="ml-0.5 text-primary/50 transition-colors hover:text-primary"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Suggestions */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-muted-foreground/60">
                Suggestions:
              </span>
              {suggestedConcepts.map((s) => (
                <button
                  key={s}
                  onClick={() => addConcept(s)}
                  className="rounded-full border border-border/40 px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>

          {/* Time Window */}
          <div className="mb-10">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Time Window
            </label>
            <Select value={timeWindow} onValueChange={setTimeWindow}>
              <SelectTrigger className="h-12 w-48 border-border/50 bg-background text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="60">Last 60 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="180">Last 180 days</SelectItem>
                <SelectItem value="365">Last 1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <Button
            className="h-14 w-full text-sm font-medium uppercase tracking-[0.15em]"
            disabled={!hypothesis.trim()}
            onClick={() =>
              navigate("/validation", {
                state: { personaName, hypothesis },
              })
            }
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Start Validation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HypothesisInput;
