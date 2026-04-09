import PersonaCard from "@/components/PersonaCard";
import { Heart, Shield, Star, TrendingUp } from "lucide-react";

const demoPersonas = [
  {
    name: "The Mindful Explorer",
    description:
      "Quality-driven urban millennials who value personal growth, seek meaningful experiences, and prioritize intentional consumption over impulse buying.",
    coreDimensions: ["Self-Driven", "Quality-First", "Experience-Led"] as [string, string, string],
    brandRelations: [
      { label: "Loyalty", value: "High — Core loyalist", icon: <Heart className="h-3.5 w-3.5" /> },
      { label: "Trust", value: "Brand value advocate", icon: <Shield className="h-3.5 w-3.5" /> },
    ],
    postsCount: 1243,
    expandedDetails: [
      { label: "Avg. Engagement", value: "8.7%" },
      { label: "Content Pref.", value: "Long-form" },
      { label: "Peak Hours", value: "8–11 PM" },
      { label: "Conversion", value: "★★★★★" },
    ],
  },
  {
    name: "The Social Connector",
    description:
      "Highly active sharers and opinion spreaders who thrive on community building and hold strong peer influence within their social circles.",
    coreDimensions: ["Socially-Driven", "High Shareability", "Peer Influence"] as [string, string, string],
    brandRelations: [
      { label: "Loyalty", value: "Medium — Occasional", icon: <Heart className="h-3.5 w-3.5" /> },
      { label: "Influence", value: "KOC potential", icon: <TrendingUp className="h-3.5 w-3.5" /> },
    ],
    postsCount: 3876,
    expandedDetails: [
      { label: "Avg. Engagement", value: "12.3%" },
      { label: "Content Pref.", value: "Short video" },
      { label: "Peak Hours", value: "All day" },
      { label: "Conversion", value: "★★★★☆" },
    ],
  },
  {
    name: "The Value Seeker",
    description:
      "Rational, research-heavy consumers driven by word-of-mouth and price sensitivity. They compare extensively before committing to a purchase.",
    coreDimensions: ["Rational", "WOM-Driven", "Price-Sensitive"] as [string, string, string],
    brandRelations: [
      { label: "Loyalty", value: "Low — Price-switcher", icon: <Heart className="h-3.5 w-3.5" /> },
      { label: "Retention", value: "Promo-activated", icon: <Star className="h-3.5 w-3.5" /> },
    ],
    postsCount: 892,
    expandedDetails: [
      { label: "Avg. Engagement", value: "4.2%" },
      { label: "Content Pref.", value: "Reviews" },
      { label: "Peak Hours", value: "12–2 PM" },
      { label: "Conversion", value: "★★★☆☆" },
    ],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Persona Gallery
          </h1>
          <p className="mt-2 text-muted-foreground">
            Click a card to expand and view detailed dimension analysis
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demoPersonas.map((persona) => (
            <PersonaCard key={persona.name} {...persona} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
