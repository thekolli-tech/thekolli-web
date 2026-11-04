export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  focusAreas: string[];
  technicalAnnotation: string;
}

export const capabilitiesData: CapabilityItem[] = [
  {
    id: "ai",
    number: "01",
    title: "Artificial Intelligence",
    headline: "Intelligent systems built on deterministic foundations.",
    description:
      "We design and integrate machine intelligence models tailored for contextual enterprise decision-making, predictive data analysis, and domain-specific automation, ensuring transparency, mathematical rigor, and observable outcomes.",
    focusAreas: [
      "Contextual Machine Learning Models",
      "Agentic Workflow Automation",
      "Algorithmic Data Transformation",
      "Evaluated Reasoning Pipelines",
    ],
    technicalAnnotation: "Deterministic execution / probabilistic reasoning",
  },
  {
    id: "software",
    number: "02",
    title: "Software Engineering",
    headline: "Resilient architectures engineered for sustained durability.",
    description:
      "Our software engineering practice develops mission-critical web applications, distributed backend services, and modular application layers that prioritize type-safety, maintainability, and clean computational boundaries.",
    focusAreas: [
      "Distributed Cloud Architecture",
      "Type-Safe Modular Applications",
      "Event-Driven API Ecosystems",
      "Automated Continuous Verification",
    ],
    technicalAnnotation: "Layered decoupling / zero-leak abstractions",
  },
  {
    id: "systems",
    number: "03",
    title: "Systems Engineering",
    headline: "Cohesive integration of computational and operational stacks.",
    description:
      "We bridge disparate technical infrastructures through unified data highways, robust fault-tolerant pipelines, and synchronized system integration, allowing complex organizations to operate as a single coordinated organism.",
    focusAreas: [
      "Enterprise Data Pipelines",
      "Fault-Tolerant System Orchestration",
      "Unified Inter-service Messaging",
      "High-Throughput State Synchronization",
    ],
    technicalAnnotation: "High-concurrency / persistent state cohesion",
  },
  {
    id: "innovation",
    number: "04",
    title: "Digital Innovation",
    headline: "Systematic translation of technological frontiers into real solutions.",
    description:
      "Bridging the chasm between theoretical computer science and pragmatic commercial utility. We incubate breakthrough software paradigms and deploy intelligent interfaces that redefine digital interaction paradigms.",
    focusAreas: [
      "Next-Generation Interaction Design",
      "Experimental Prototyping Systems",
      "Architectural Blueprinting",
      "Emerging Compute Integrations",
    ],
    technicalAnnotation: "Exploratory rigor / applied validation",
  },
];
