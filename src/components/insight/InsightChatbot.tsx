import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "bot" | "user";
  text: string;
}

const welcomeMessage = `Hi! I can help you explore the analysis results. Try asking me about:

• A specific C dimension — "Tell me more about Cultural Tensions"
• Data sources — "Where did this insight come from?"
• Validation reasoning — "Why was the hypothesis Partially Supported?"
• Campaign direction logic — "Why is Direction 1 High priority?"`;

const mockResponses: Record<string, string> = {
  "Deep dive into Culture tensions":
    'The key cultural tension identified is the conflict between **Medical Authority and Community Wisdom**. In DACH markets, there\'s a growing "Evidence-Based Parenting" movement where mothers want scientifically grounded decisions — but they also increasingly rely on online peer communities for emotional validation.\n\nThis creates a dual-trust dynamic: mothers publicly cite their pediatrician as their primary source, but privately spend significant time reading forum threads on Netmoms.de and Urbia. The tension isn\'t about choosing one over the other — it\'s that both feel necessary, yet no brand currently speaks to both trust systems simultaneously.\n\nSources: Deutsche Hebammenzeitung (2024), Netmoms.de forum analysis',
  "Why is Direction 1 High priority?":
    'Direction 1 ("Bridge the Trust Gap") is rated High priority because it directly addresses the strongest tension identified across the analysis — the gap between medical authority trust and peer community validation.\n\nThree factors drive the High rating:\n1. **Multiple C convergence**: Consumer signals, Cultural trends, and Category whitespace all point to the same opportunity\n2. **No competitive occupancy**: No major DACH formula brand currently owns this positioning\n3. **Brand fit**: Aptamil\'s clinical research heritage (Pronutra+) gives it unique credibility to bridge this gap\n\nConfidence is also High because the supporting evidence comes from 3 independent C dimensions.',
};

const outOfScope = `I can help you explore the existing analysis. Try asking me about:
• A specific C dimension (e.g., "Tell me more about Cultural Tensions")
• Data sources (e.g., "Where did this insight come from?")
• Validation reasoning (e.g., "Why was the hypothesis Partially Supported?")
• Campaign direction logic (e.g., "Why is this direction High priority?")`;

const quickActions = [
  "Deep dive into Culture tensions",
  "Why is the hypothesis Partially Supported?",
  "Show me the original sources",
  "Compare Direction 1 and Direction 2",
];

const InsightChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: welcomeMessage },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    const botResponse = mockResponses[text.trim()] || outOfScope;
    setMessages((prev) => [...prev, userMsg, { role: "bot", text: botResponse }]);
    setInput("");
  };

  return (
    <>
      {/* FAB */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Panel */}
      {open && (
        <>
          {/* Backdrop (mobile) */}
          <div className="fixed inset-0 z-40 bg-black/20 md:hidden" onClick={() => setOpen(false)} />

          <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col border-l border-border bg-card shadow-xl animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
              <h3 className="text-sm font-semibold text-primary">Insight Assistant</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-3 text-[13px] leading-relaxed whitespace-pre-line ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 text-foreground/85"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="border-t border-border/40 px-5 py-3">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                Quick Actions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {quickActions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="rounded-full border border-primary/30 px-3 py-1 text-[11px] text-primary transition-colors hover:bg-primary/10"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-border/60 px-4 py-3">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  placeholder="Ask about the analysis..."
                  className="h-10 flex-1 text-sm"
                />
                <Button size="icon" className="h-10 w-10 shrink-0" onClick={() => sendMessage(input)}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default InsightChatbot;
