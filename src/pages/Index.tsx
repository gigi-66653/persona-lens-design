import { useState } from "react";
import PersonaCard from "@/components/PersonaCard";
import PersonaDrawer from "@/components/PersonaDrawer";
import TopNav from "@/components/TopNav";
import StepIndicator from "@/components/StepIndicator";
import type { PersonaData } from "@/components/PersonaCard";
import { Target, Shield } from "lucide-react";

const demoPersonas: PersonaData[] = [
  {
    name: "The Mindful Explorer",
    description:
      "Quality-driven urban millennials who value personal growth, seek meaningful experiences, and prioritize intentional consumption over impulse buying.",
    coreDimensions: ["Self-Driven", "Quality-First", "Experience-Led"],
    brandRelations: [
      { label: "Driver", value: "Values-aligned quality", icon: <Target className="h-3.5 w-3.5" /> },
      { label: "Trust", value: "Brand philosophy advocate", icon: <Shield className="h-3.5 w-3.5" /> },
    ],
    postsCount: 1243,
    expandedData: {
      whoTheyAre: [
        { title: "Anxiety Level", items: [{ label: "High", value: 62 }, { label: "Moderate", value: 28 }, { label: "Low", value: 10 }] },
        { title: "Trigger Event", items: [{ label: "Life transitions", value: 45 }, { label: "Peer recommendation", value: 35 }, { label: "Self-discovery", value: 20 }] },
      ],
      brandRelationship: {
        bulletGroups: [
          { title: "Top Purchase Drivers", items: [{ label: "Brand values alignment", value: 72 }, { label: "Product quality", value: 65 }, { label: "Sustainability", value: 58 }] },
        ],
        barGroups: [
          { title: "Switching Status", items: [{ label: "Loyal stayer", value: 78 }, { label: "Open to switch", value: 15 }, { label: "Actively exploring", value: 7 }] },
        ],
      },
      consumerVoices: [
        "I don't just buy products — I invest in brands that reflect who I want to become.",
        "Quality over quantity, always. I'd rather have three perfect items than thirty mediocre ones.",
      ],
    },
  },
  {
    name: "The Social Connector",
    description:
      "Highly active sharers and opinion spreaders who thrive on community building and hold strong peer influence within their social circles.",
    coreDimensions: ["Socially-Driven", "High Shareability", "Peer Influence"],
    brandRelations: [
      { label: "Driver", value: "Peer validation & trends", icon: <Target className="h-3.5 w-3.5" /> },
      { label: "Trust", value: "Community-endorsed", icon: <Shield className="h-3.5 w-3.5" /> },
    ],
    postsCount: 3876,
    expandedData: {
      whoTheyAre: [
        { title: "Social Activity", items: [{ label: "Daily poster", value: 55 }, { label: "Weekly sharer", value: 30 }, { label: "Occasional", value: 15 }] },
        { title: "Content Type", items: [{ label: "UGC reviews", value: 48 }, { label: "Lifestyle posts", value: 32 }, { label: "Tutorials", value: 20 }] },
      ],
      brandRelationship: {
        bulletGroups: [
          { title: "Top Purchase Drivers", items: [{ label: "Peer recommendations", value: 80 }, { label: "Visual appeal", value: 60 }, { label: "Trending status", value: 55 }] },
        ],
        barGroups: [
          { title: "Engagement Pattern", items: [{ label: "Comments & replies", value: 70 }, { label: "Shares & reposts", value: 85 }, { label: "Direct purchases", value: 35 }] },
        ],
      },
      consumerVoices: [
        "If I love something, everyone in my circle is going to know about it within the hour.",
        "My friends trust my recommendations more than any ad — that's real influence.",
        "I only share what I genuinely believe in. My credibility is everything.",
      ],
    },
  },
  {
    name: "The Value Seeker",
    description:
      "Rational, research-heavy consumers driven by word-of-mouth and price sensitivity. They compare extensively before committing to a purchase.",
    coreDimensions: ["Rational", "WOM-Driven", "Price-Sensitive"],
    brandRelations: [
      { label: "Driver", value: "Price-performance ratio", icon: <Target className="h-3.5 w-3.5" /> },
      { label: "Trust", value: "Data & reviews backed", icon: <Shield className="h-3.5 w-3.5" /> },
    ],
    postsCount: 892,
    expandedData: {
      whoTheyAre: [
        { title: "Research Depth", items: [{ label: "Heavy researcher", value: 70 }, { label: "Moderate", value: 22 }, { label: "Impulse", value: 8 }] },
        { title: "Decision Timeline", items: [{ label: "1-2 weeks", value: 50 }, { label: "3-7 days", value: 35 }, { label: "Same day", value: 15 }] },
      ],
      brandRelationship: {
        bulletGroups: [
          { title: "Top Purchase Drivers", items: [{ label: "Price competitiveness", value: 88 }, { label: "Reviews & ratings", value: 75 }, { label: "Promotions", value: 68 }] },
        ],
        barGroups: [
          { title: "Switching Status", items: [{ label: "Price-driven switcher", value: 65 }, { label: "Conditionally loyal", value: 25 }, { label: "Brand-locked", value: 10 }] },
        ],
      },
      consumerVoices: [
        "I never buy on impulse. I compare at least five options before I commit.",
        "A good deal isn't just about price — it's about getting the best value for every dollar.",
      ],
    },
  },
  {
    name: "The Trend Chaser",
    description:
      "Early adopters obsessed with what's next. They follow cultural shifts closely and are first to try new products, driven by novelty and status.",
    coreDimensions: ["Trend-Forward", "Status-Seeking", "Early Adopter"],
    brandRelations: [
      { label: "Driver", value: "Novelty & exclusivity", icon: <Target className="h-3.5 w-3.5" /> },
      { label: "Trust", value: "KOL-validated", icon: <Shield className="h-3.5 w-3.5" /> },
    ],
    postsCount: 2104,
    expandedData: {
      whoTheyAre: [
        { title: "Adoption Speed", items: [{ label: "First-day adopter", value: 42 }, { label: "Early majority", value: 38 }, { label: "Wait & see", value: 20 }] },
        { title: "Influence Source", items: [{ label: "Social media trends", value: 60 }, { label: "Celebrity / KOL", value: 28 }, { label: "Brand campaigns", value: 12 }] },
      ],
      brandRelationship: {
        bulletGroups: [
          { title: "Top Purchase Drivers", items: [{ label: "Novelty & exclusivity", value: 82 }, { label: "Social status", value: 70 }, { label: "Visual aesthetics", value: 62 }] },
        ],
        barGroups: [
          { title: "Switching Status", items: [{ label: "Always exploring", value: 72 }, { label: "Seasonal switcher", value: 20 }, { label: "Loyal to few", value: 8 }] },
        ],
      },
      consumerVoices: [
        "If it's not new, it's not for me. I live for the thrill of being first.",
        "My feed is my portfolio — every product I share says something about who I am.",
      ],
    },
  },
  {
    name: "The Quiet Loyalist",
    description:
      "Low-profile but deeply committed consumers who rarely post but purchase consistently. Their lifetime value far exceeds their social visibility.",
    coreDimensions: ["High LTV", "Low Visibility", "Brand-Committed"],
    brandRelations: [
      { label: "Driver", value: "Consistency & habit", icon: <Target className="h-3.5 w-3.5" /> },
      { label: "Trust", value: "Deep experience-based", icon: <Shield className="h-3.5 w-3.5" /> },
    ],
    postsCount: 187,
    expandedData: {
      whoTheyAre: [
        { title: "Purchase Frequency", items: [{ label: "Monthly repeat", value: 58 }, { label: "Quarterly", value: 30 }, { label: "Occasional", value: 12 }] },
        { title: "Trust Anchor", items: [{ label: "Past experience", value: 75 }, { label: "Brand reputation", value: 18 }, { label: "Word of mouth", value: 7 }] },
      ],
      brandRelationship: {
        bulletGroups: [
          { title: "Top Purchase Drivers", items: [{ label: "Consistent quality", value: 90 }, { label: "Familiarity & habit", value: 72 }, { label: "Loyalty rewards", value: 45 }] },
        ],
        barGroups: [
          { title: "Switching Status", items: [{ label: "Deeply loyal", value: 82 }, { label: "Passively loyal", value: 13 }, { label: "Open to switch", value: 5 }] },
        ],
      },
      consumerVoices: [
        "I don't need to post about it. I just keep buying because it works.",
        "Loyalty isn't about excitement — it's about trust built over years of consistency.",
      ],
    },
  },
];

const Index = () => {
  const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <StepIndicator currentStep={1} />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-10">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(() => {
            const remainder = demoPersonas.length % 3;
            const placeholders = remainder === 0 ? 0 : 3 - remainder;
            const items: React.ReactNode[] = [];
            const insertAt = demoPersonas.length - remainder;
            demoPersonas.forEach((persona, i) => {
              if (remainder > 0 && i === insertAt) {
                for (let p = 0; p < placeholders; p++) {
                  items.push(<div key={`placeholder-${p}`} className="hidden lg:block" />);
                }
              }
              items.push(
                <PersonaCard
                  key={persona.name}
                  {...persona}
                  onSelect={setSelectedPersona}
                />
              );
            });
            return items;
          })()}
        </div>
      </div>

      <PersonaDrawer
        persona={selectedPersona}
        open={!!selectedPersona}
        onClose={() => setSelectedPersona(null)}
      />
    </div>
  );
};

export default Index;
