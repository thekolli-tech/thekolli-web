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
    name: "Business First",
    lead: "We start with the business outcome, not a favorite technology.",
    description:
      "Every system must make operations clearer, faster, and more valuable. We analyze core organizational workflows, economic constraints, and operational bottlenecks before formulating computational architectures.",
    graphiteSketchType: "precision",
    handwrittenNote: "Outcome precedes technology.",
  },
  {
    number: "02",
    name: "Visible Progress",
    lead: "Working software grounded in measurable reality from day one.",
    description:
      "Clear milestones, direct communication, and demonstrably working software keep decisions grounded in reality. We avoid black-box delays and align stakeholder feedback at every iterative release.",
    graphiteSketchType: "engineering",
    handwrittenNote: "Clear milestones, zero black boxes.",
  },
  {
    number: "03",
    name: "Built to Last",
    lead: "Engineering integrity and permanent structural durability.",
    description:
      "We write clean, modular, and maintainable software designed to withstand real production pressures. No fragile shortcuts, no unmaintained dependencies, and zero technical debt passed to our partners.",
    graphiteSketchType: "evolution",
    handwrittenNote: "Architected for generational scale.",
  },
  {
    number: "04",
    name: "Product Mindset",
    lead: "Treating every engagement with founder-level ownership.",
    description:
      "We don't view software as isolated billable tickets. A senior engineering team stays close to the problem from first principles through production deployment and continuous operational evolution.",
    graphiteSketchType: "intelligence",
    handwrittenNote: "Engineer-to-engineer accountability.",
  },
];
