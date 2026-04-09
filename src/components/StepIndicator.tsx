import { Check } from "lucide-react";

const steps = [
  { number: 1, title: "Persona Scope", subtitle: "Select target personas" },
  { number: 2, title: "Hypothesis Input", subtitle: "Define your hypothesis" },
  { number: 3, title: "Validation Output", subtitle: "Review validation results" },
];

interface StepIndicatorProps {
  currentStep?: number;
}

const StepIndicator = ({ currentStep = 1 }: StepIndicatorProps) => {
  return (
    <div className="w-full border-b border-border/40 bg-background">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
        {steps.map((step, i) => {
          const isActive = step.number === currentStep;
          const isPast = step.number < currentStep;

          return (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center gap-3">
                {/* Dot */}
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium transition-colors ${
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : isPast
                        ? "border-foreground/30 bg-foreground/10 text-foreground/60"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  {isPast ? <Check className="h-3.5 w-3.5" /> : step.number}
                </div>

                {/* Text */}
                <div className="flex flex-col leading-tight">
                  <span
                    className={`text-xs font-medium tracking-wide ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground/70">
                    {step.subtitle}
                  </span>
                </div>
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="mx-6 h-px w-16 bg-border" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
