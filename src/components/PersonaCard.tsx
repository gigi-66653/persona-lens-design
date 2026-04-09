import { useState } from "react";
import { ChevronDown, Heart, MessageSquare, Users, TrendingUp, Shield, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandRelation {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface PersonaCardProps {
  name: string;
  description: string;
  coreDimensions: [string, string, string];
  brandRelations: BrandRelation[];
  postsCount: number;
  expandedDetails?: {
    label: string;
    value: string;
  }[];
}

const PersonaCard = ({
  name,
  description,
  coreDimensions,
  brandRelations,
  postsCount,
  expandedDetails = [],
}: PersonaCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "group relative cursor-pointer rounded-2xl p-8 transition-all duration-500",
        "bg-[hsl(var(--persona-glass))] backdrop-blur-2xl",
        "border border-[hsl(var(--persona-glass-border))]",
        "shadow-[0_8px_40px_-12px_hsl(215_55%_48%/0.1)]",
        "hover:-translate-y-0.5 hover:shadow-[0_16px_60px_-16px_hsl(215_55%_48%/0.18)]",
      )}
    >
      {/* Refined blue-tinted overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(210_50%_95%/0.5)] via-transparent to-[hsl(220_45%_92%/0.3)]" />

      <div className="relative z-10">
        {/* Layer 1: Persona Name — serif, editorial */}
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
          {name}
        </h2>

        {/* Layer 2: Description */}
        <p className="mt-3 text-[13px] leading-[1.8] text-muted-foreground">
          {description}
        </p>

        {/* Ultra-thin divider */}
        <div className="my-6 h-px bg-border/40" />

        {/* Layer 3: Core Dimensions — editorial grid */}
        <div className="grid grid-cols-3 gap-2">
          {coreDimensions.map((dim) => (
            <span
              key={dim}
              className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground"
            >
              {dim}
            </span>
          ))}
        </div>

        {/* Ultra-thin divider */}
        <div className="my-6 h-px bg-border/40" />

        {/* Layer 4: Brand Relations */}
        <div className="space-y-2.5">
          {brandRelations.map((rel) => (
            <div key={rel.label} className="flex items-center gap-2.5 text-[11px]">
              <span className="text-primary/50">{rel.icon}</span>
              <span className="font-medium uppercase tracking-widest text-primary/70">
                {rel.label}
              </span>
              <span className="text-foreground/60">{rel.value}</span>
            </div>
          ))}
        </div>

        {/* Layer 5: Posts Count */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-ultra-wide text-muted-foreground/60">
            {postsCount.toLocaleString()} posts
          </span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 text-muted-foreground/40 transition-transform duration-500",
              isExpanded && "rotate-180"
            )}
          />
        </div>

        {/* Expandable Details */}
        <div
          className={cn(
            "grid transition-all duration-500 ease-in-out",
            isExpanded ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="h-px bg-border/40" />
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 pt-6">
              {expandedDetails.map((detail) => (
                <div key={detail.label}>
                  <div className="text-[9px] font-medium uppercase tracking-ultra-wide text-muted-foreground/50">
                    {detail.label}
                  </div>
                  <div className="mt-1.5 font-serif text-sm text-foreground/70">
                    {detail.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaCard;
