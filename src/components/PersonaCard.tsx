import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface BarItem {
  label: string;
  value: number;
}

export interface DimensionGroup {
  title: string;
  items: BarItem[];
}

export interface BulletGroup {
  title: string;
  items: BarItem[];
}

export interface ExpandedData {
  whoTheyAre: DimensionGroup[];
  brandRelationship: {
    bulletGroups: BulletGroup[];
    barGroups: DimensionGroup[];
  };
  consumerVoices: string[];
}

export interface BrandRelation {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface PersonaData {
  name: string;
  description: string;
  coreDimensions: [string, string, string];
  brandRelations: BrandRelation[];
  postsCount: number;
  expandedData?: ExpandedData;
}

interface PersonaCardProps extends PersonaData {
  onSelect?: (data: PersonaData) => void;
}

const PersonaCard = ({
  name,
  description,
  coreDimensions,
  brandRelations,
  postsCount,
  expandedData,
  onSelect,
}: PersonaCardProps) => {
  return (
    <div
      onClick={() =>
        onSelect?.({ name, description, coreDimensions, brandRelations, postsCount, expandedData })
      }
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
        </div>
      </div>
    </div>
  );
};

export default PersonaCard;
