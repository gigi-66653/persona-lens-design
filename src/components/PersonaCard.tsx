import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface BarItem {
  label: string;
  value: number;
}

interface DimensionGroup {
  title: string;
  items: BarItem[];
}

interface BulletGroup {
  title: string;
  items: BarItem[];
}

interface ExpandedData {
  whoTheyAre: DimensionGroup[];
  brandRelationship: {
    bulletGroups: BulletGroup[];
    barGroups: DimensionGroup[];
  };
  consumerVoices: string[];
}

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
  expandedData?: ExpandedData;
}

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2.5 mb-5">
    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
    <span className="text-[9px] font-medium uppercase tracking-ultra-wide text-primary/80">
      {title}
    </span>
  </div>
);

const BarChart = ({ items }: { items: BarItem[] }) => (
  <div className="space-y-3">
    {items.map((item) => (
      <div key={item.label}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-foreground/70">{item.label}</span>
          <span className="text-[10px] font-medium text-muted-foreground">{item.value}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary/70 transition-all duration-700"
            style={{ width: `${item.value}%` }}
          />
        </div>
      </div>
    ))}
  </div>
);

const QuoteCard = ({ text }: { text: string }) => (
  <div className="border-l-[3px] border-primary/40 bg-muted/50 rounded-r-lg px-4 py-3">
    <p className="text-[11px] leading-[1.8] text-foreground/60 italic font-serif">
      "{text}"
    </p>
  </div>
);

const PersonaCard = ({
  name,
  description,
  coreDimensions,
  brandRelations,
  postsCount,
  expandedData,
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
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(210_50%_95%/0.5)] via-transparent to-[hsl(220_45%_92%/0.3)]" />

      <div className="relative z-10">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
          {name}
        </h2>

        <p className="mt-3 text-[13px] leading-[1.8] text-muted-foreground">
          {description}
        </p>

        <div className="my-6 h-px bg-border/40" />

        <p className="text-[10px] font-medium uppercase tracking-widest leading-relaxed text-muted-foreground">
          {coreDimensions.join("  ·  ")}
        </p>

        <div className="my-6 h-px bg-border/40" />

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

        {/* Expandable Panel */}
        <div
          className={cn(
            "grid transition-all duration-500 ease-in-out",
            isExpanded ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            {expandedData && (
              <div className="space-y-8 pt-2">
                {/* Section 1: Who They Are */}
                <div>
                  <SectionHeader title="Who They Are" />
                  <div className="space-y-5">
                    {expandedData.whoTheyAre.map((group) => (
                      <div key={group.title}>
                        <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 mb-3">
                          {group.title}
                        </div>
                        <BarChart items={group.items} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-border/40" />

                {/* Section 2: Brand Relationship */}
                <div>
                  <SectionHeader title="Brand Relationship" />
                  <div className="space-y-5">
                    {expandedData.brandRelationship.bulletGroups.map((group) => (
                      <div key={group.title}>
                        <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 mb-3">
                          {group.title}
                        </div>
                        <div className="space-y-2">
                          {group.items.map((item) => (
                            <div key={item.label} className="flex items-center justify-between text-[11px]">
                              <div className="flex items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-primary/50" />
                                <span className="text-foreground/70">{item.label}</span>
                              </div>
                              <span className="font-medium text-muted-foreground">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {expandedData.brandRelationship.barGroups.map((group) => (
                      <div key={group.title}>
                        <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 mb-3">
                          {group.title}
                        </div>
                        <BarChart items={group.items} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-border/40" />

                {/* Section 3: Consumer Voices */}
                <div>
                  <SectionHeader title="Consumer Voices" />
                  <div className="space-y-3">
                    {expandedData.consumerVoices.map((quote, i) => (
                      <QuoteCard key={i} text={quote} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaCard;
