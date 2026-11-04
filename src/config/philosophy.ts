export interface PhilosophyPrinciple {
  number: string;
  name: string;
  lead: string;
  description: string;
  graphiteSketchType: "precision" | "intelligence" | "engineering" | "evolution";
  handwrittenNote: string;
}

export const engineeringPrinciples: PhilosophyPrinciple[] = [
  {
    number: "01",
    name: "Precision",
    lead: "Exactitude before execution.",
    description:
      "Every architecture begins with unyielding scrutiny. We believe ambiguous requirements produce fragile software; rigorous definitions, explicit invariants, and mathematical clarity create software that withstands time.",
    graphiteSketchType: "precision",
    handwrittenNote: "Measure twice, verify continuous.",
  },
  {
    number: "02",
    name: "Intelligence",
    lead: "Purposeful computation over novelty.",
    description:
      "We treat artificial intelligence not as marketing sheen, but as an advanced cognitive instrument. Models must serve defined operational needs with verifiable boundaries and explainable mechanisms.",
    graphiteSketchType: "intelligence",
    handwrittenNote: "Cognition rooted in structure.",
  },
  {
    number: "03",
    name: "Engineering",
    lead: "Craftsmanship governed by physical discipline.",
    description:
      "True engineering respects constraints, minimizes complexity, and eliminates unnecessary dependencies. We design systems to be transparent, debuggable, and maintainable across long lifecycles.",
    graphiteSketchType: "engineering",
    handwrittenNote: "Simplicity is an engineered triumph.",
  },
  {
    number: "04",
    name: "Evolution",
    lead: "Adaptive systems built to endure flux.",
    description:
      "Technology horizons shift continuously. We build modular foundations that absorb technological change without architectural collapse, letting organizations evolve gracefully alongside modern computing.",
    graphiteSketchType: "evolution",
    handwrittenNote: "Designed for perpetual renewal.",
  },
];
