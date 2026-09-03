export interface PageConfig {
  label: string;
  href: string;
  description: string;
  entities: string[];
  workflows: string[];
}

export interface EntityConfig {
  name: string;
  label: string;
  fields: Array<{ name: string; kind: "string" | "number" | "boolean" | "date" }>;
}

export interface WorkflowConfig {
  slug: string;
  title: string;
  description: string;
  prompt: string;
  fields: string[];
}

export const appConfig = {
  slug: "ai-product-development-studio",
  title: "AI Product Development Studio",
  tagline: "Customer problems to shipped pull requests",
  accent: "pink",
};

export const pages: PageConfig[] = [
  {
    label: "Discovery",
    href: "/discovery",
    description: "Customer problems and opportunities.",
    entities: ["CustomerProblem", "FeedbackSignal", "ProductOpportunity"],
    workflows: ["problem-cluster"],
  },
  {
    label: "Definition",
    href: "/definition",
    description: "Specs, prototypes, test plans.",
    entities: ["Specification", "Prototype", "TestPlan", "DesignReview"],
    workflows: ["spec-draft"],
  },
  {
    label: "Build",
    href: "/build",
    description: "PR drafts and approval gates.",
    entities: ["PullRequestDraft", "ApprovalGate"],
    workflows: ["pr-draft"],
  },
  {
    label: "Ship",
    href: "/ship",
    description: "Release candidates and metric movement.",
    entities: ["ReleaseCandidate", "MetricMovement", "ProductArea"],
    workflows: [],
  },
];

export const entities: Record<string, EntityConfig> = {
  ProductArea: {
    name: "ProductArea",
    label: "Product Area",
    fields: [{ name: "name", kind: "string" }, { name: "owner", kind: "string" }, { name: "sponsor", kind: "string" }, { name: "metric", kind: "string" }, { name: "northStar", kind: "string" }, { name: "status", kind: "string" }],
  },
  CustomerProblem: {
    name: "CustomerProblem",
    label: "Customer Problem",
    fields: [{ name: "source", kind: "string" }, { name: "summary", kind: "string" }, { name: "segment", kind: "string" }, { name: "severity", kind: "string" }, { name: "status", kind: "string" }, { name: "frequencyScore", kind: "number" }],
  },
  ProductOpportunity: {
    name: "ProductOpportunity",
    label: "Opportunity",
    fields: [{ name: "title", kind: "string" }, { name: "hypothesis", kind: "string" }, { name: "impactScore", kind: "number" }, { name: "effortScore", kind: "number" }, { name: "status", kind: "string" }, { name: "owner", kind: "string" }],
  },
  Specification: {
    name: "Specification",
    label: "Specification",
    fields: [{ name: "title", kind: "string" }, { name: "problemRef", kind: "string" }, { name: "scope", kind: "string" }, { name: "acceptanceCriteria", kind: "string" }, { name: "status", kind: "string" }, { name: "approvedAt", kind: "date" }],
  },
  Prototype: {
    name: "Prototype",
    label: "Prototype",
    fields: [{ name: "name", kind: "string" }, { name: "kind", kind: "string" }, { name: "url", kind: "string" }, { name: "status", kind: "string" }, { name: "feedbackSummary", kind: "string" }, { name: "createdOn", kind: "date" }],
  },
  TestPlan: {
    name: "TestPlan",
    label: "Test Plan",
    fields: [{ name: "specRef", kind: "string" }, { name: "coveragesCenarios", kind: "string" }, { name: "caseCount", kind: "number" }, { name: "status", kind: "string" }, { name: "owner", kind: "string" }, { name: "executedAt", kind: "date" }],
  },
  PullRequestDraft: {
    name: "PullRequestDraft",
    label: "PR Draft",
    fields: [{ name: "specRef", kind: "string" }, { name: "branch", kind: "string" }, { name: "summary", kind: "string" }, { name: "status", kind: "string" }, { name: "filesChanged", kind: "number" }, { name: "reviewee", kind: "string" }],
  },
  ApprovalGate: {
    name: "ApprovalGate",
    label: "Approval Gate",
    fields: [{ name: "gate", kind: "string" }, { name: "artifact", kind: "string" }, { name: "approver", kind: "string" }, { name: "status", kind: "string" }, { name: "decidedAt", kind: "date" }, { name: "rationale", kind: "string" }],
  },
  FeedbackSignal: {
    name: "FeedbackSignal",
    label: "Feedback Signal",
    fields: [{ name: "source", kind: "string" }, { name: "content", kind: "string" }, { name: "sentiment", kind: "string" }, { name: "linkedOpportunity", kind: "string" }, { name: "status", kind: "string" }, { name: "receivedAt", kind: "date" }],
  },
  ReleaseCandidate: {
    name: "ReleaseCandidate",
    label: "Release Candidate",
    fields: [{ name: "version", kind: "string" }, { name: "scope", kind: "string" }, { name: "readiness", kind: "string" }, { name: "status", kind: "string" }, { name: "targetDate", kind: "date" }, { name: "gatekeeper", kind: "string" }],
  },
  MetricMovement: {
    name: "MetricMovement",
    label: "Metric Movement",
    fields: [{ name: "metric", kind: "string" }, { name: "releaseRef", kind: "string" }, { name: "before", kind: "number" }, { name: "after", kind: "number" }, { name: "deltaPct", kind: "number" }, { name: "status", kind: "string" }],
  },
  DesignReview: {
    name: "DesignReview",
    label: "Design Review",
    fields: [{ name: "artifact", kind: "string" }, { name: "reviewer", kind: "string" }, { name: "outcome", kind: "string" }, { name: "comments", kind: "string" }, { name: "status", kind: "string" }, { name: "heldAt", kind: "date" }],
  },
};

export const workflows: WorkflowConfig[] = [
  {
    slug: "problem-cluster",
    title: "Problem Clustering",
    description: "Cluster customer problems into opportunities.",
    prompt: "You are a product discovery lead. Cluster the listed customer problems into opportunities with hypotheses, impact and effort estimates.",
    fields: ["problems", "segment", "currentMetric", "constraints"],
  },
  {
    slug: "spec-draft",
    title: "Spec Drafter",
    description: "Draft a product specification.",
    prompt: "You are a senior product manager. Draft a specification from the opportunity: scope, non-goals, acceptance criteria, telemetry, rollout plan.",
    fields: ["opportunity", "customerEvidence", "technicalConstraints", "successMetric"],
  },
  {
    slug: "pr-draft",
    title: "PR Drafter",
    description: "Draft a pull request plan from an approved spec.",
    prompt: "You are a staff engineer. From the approved spec, outline the PR plan: files touched, testing plan, migration and rollback notes.",
    fields: ["specSummary", "codebaseNotes", "riskAreas", "testPlan"],
  },
];

export function findPage(href: string): PageConfig | undefined {
  return pages.find((p) => p.href === href);
}
