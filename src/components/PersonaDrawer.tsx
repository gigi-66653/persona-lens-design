import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { PersonaData, BarItem, DimensionGroup, BulletGroup } from "./PersonaCard";

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

interface PersonaDrawerProps {
  persona: PersonaData | null;
  open: boolean;
  onClose: () => void;
}

const PersonaDrawer = ({ persona, open, onClose }: PersonaDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-[420px] max-w-[90vw] p-0 border-l border-[hsl(var(--persona-glass-border))] bg-[hsl(var(--persona-glass))] backdrop-blur-2xl"
      >
        {persona && (
          <ScrollArea className="h-full">
            <div className="px-8 py-10 space-y-8">
              {/* Header */}
              <div>
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                  {persona.name}
                </h2>
                <p className="mt-3 text-[13px] leading-[1.8] text-muted-foreground">
                  {persona.description}
                </p>
                <p className="mt-4 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
                  {persona.coreDimensions.join("  ·  ")}
                </p>
              </div>

              {persona.expandedData && (
                <>
                  <div className="h-px bg-border/40" />

                  {/* Who They Are */}
                  <div>
                    <SectionHeader title="Who They Are" />
                    <div className="space-y-5">
                      {persona.expandedData.whoTheyAre.map((group) => (
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

                  {/* Brand Relationship */}
                  <div>
                    <SectionHeader title="Brand Relationship" />
                    <div className="space-y-5">
                      {persona.expandedData.brandRelationship.bulletGroups.map((group) => (
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
                      {persona.expandedData.brandRelationship.barGroups.map((group) => (
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

                  {/* Consumer Voices */}
                  <div>
                    <SectionHeader title="Consumer Voices" />
                    <div className="space-y-3">
                      {persona.expandedData.consumerVoices.map((quote, i) => (
                        <QuoteCard key={i} text={quote} />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default PersonaDrawer;
