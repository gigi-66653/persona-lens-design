

## Step 2 → Step 3 Navigation + Validation Output Page

### Overview
1. Wire "Start Validation" button on Step 2 to navigate to `/validation`
2. Create Step 3 (Validation Output) page with all sections from the screenshots, translated to English
3. Add route in App.tsx

### Sections in Step 3 Page (from screenshots)

Based on the uploaded screenshots, the page has these sections (all translated to English):

1. **TopNav + StepIndicator** (currentStep=3, steps 1&2 show checkmarks)
2. **Back button + Persona info + "New Validation" button** (top-right)
3. **Collapsible "View Reasoning Process"** — e.g. "23 steps · 37s"
4. **Verdict Card** — green accent, "Hypothesis Confirmed", confidence score 87/100, summary text, detail paragraph (light green tinted explanation)
5. **Reasoning Scores** — 6 horizontal progress bars in 2-column grid:
   - Emotional Resonance: 92, Stage Match: 85, Risk Sensitivity: 94, Behavioral Readiness: 88, Conversion Risk: 81, Ingredient Trust: 96
6. **Key Barriers** — red/orange dot list with severity & source percentage
7. **Counterfactual Signals** — "What signals would change the verdict?" — arrow bullet points
8. **Unexpected Findings** — lightbulb icon, discovery bullet points
9. **Hypothesis Refinement** — "Track A" badge, numbered refined hypothesis with explanation
10. **Campaign Recommendations** — "Track B" badge, action cards with red "Priority: High" badges and data evidence text

### Design Style
- Same rounded-2xl cards with `border-border/60 bg-card shadow-sm`
- Section headers with colored icons (CheckCircle green, BarChart3, Shield red, AlertCircle amber, Sparkles purple, PenLine blue, Send coral)
- All English text, mock/placeholder data
- Magazine-style typography consistent with existing pages

### File Changes

**`src/pages/HypothesisInput.tsx`**:
- Add `onClick` to Start Validation button: `navigate("/validation", { state: { personaName, hypothesis } })`

**`src/pages/ValidationOutput.tsx`** (new):
- Full page with all 10 sections above
- Hardcoded mock data
- Uses TopNav, StepIndicator (step 3), same layout patterns

**`src/App.tsx`**:
- Add route: `<Route path="/validation" element={<ValidationOutput />} />`

### Technical Notes
- Progress bars: simple `div` with percentage width + colored background
- Collapsible section: use native `<details>` or a simple toggle state
- All content is static placeholder — no API calls
- Consistent with existing card/container styling from Step 2

