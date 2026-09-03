// Seed script — creates demo users and realistic domain records.
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const phones = ["(415) 555-0132", "(212) 555-0187", "(312) 555-0149", "(617) 555-0110"];
const cities = ["Chicago, IL", "Austin, TX", "Boston, MA", "Denver, CO", "Seattle, WA"];

function pick<T>(arr: T[], i: number): T { return arr[i % arr.length]; }
function amount(i: number, base = 1000): number { return Math.round((base + ((i * 7919) % 900) * base) * 100) / 100; }
function daysAgo(i: number, spread = 180): Date { return new Date(Date.now() - ((i * 37) % spread) * 86400000); }

async function main() {
  const passwordHash = await bcrypt.hash("Demo!23456", 12);
  const demoUsers: Array<[string, string, Role]> = [
    ["admin@ai-product-development-studio.local", "Demo Admin", "ADMIN"],
    ["manager@ai-product-development-studio.local", "Demo Manager", "MANAGER"],
    ["analyst@ai-product-development-studio.local", "Demo Analyst", "ANALYST"],
  ];
  for (const [email, name, role] of demoUsers) {
    await prisma.user.upsert({ where: { email }, update: {}, create: { email, name, role, passwordHash } });
  }

  const STATUSES_ProductArea = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.productArea.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.productArea.create({
      data: {
      name: `Name ${String(i + 1).padStart(3, "0")}`,
      owner: `Owner ${String(i + 1).padStart(3, "0")}`,
      sponsor: `Sponsor ${String(i + 1).padStart(3, "0")}`,
      metric: `Metric ${String(i + 1).padStart(3, "0")}`,
      northStar: `NorthStar ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_ProductArea, i)
      },
    });
  }

  const productAreaRefs = await prisma.productArea.findMany({ select: { id: true } });

  const STATUSES_CustomerProblem = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.customerProblem.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.customerProblem.create({
      data: {
      source: `Source ${String(i + 1).padStart(3, "0")}`,
      summary: `Summary ${String(i + 1).padStart(3, "0")}`,
      segment: `Segment ${String(i + 1).padStart(3, "0")}`,
      severity: `Severity ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_CustomerProblem, i),
      frequencyScore: amount(i, 250),
      area: { connect: { id: productAreaRefs[i % productAreaRefs.length].id } }
      },
    });
  }

  const STATUSES_ProductOpportunity = ["INTAKE", "TRIAGED", "SPEC", "BUILD", "SHIPPED"];
  await prisma.productOpportunity.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.productOpportunity.create({
      data: {
      title: `Title ${String(i + 1).padStart(3, "0")}`,
      hypothesis: `Hypothesis ${String(i + 1).padStart(3, "0")}`,
      impactScore: amount(i, 250),
      effortScore: amount(i, 250),
      status: pick(STATUSES_ProductOpportunity, i),
      owner: `Owner ${String(i + 1).padStart(3, "0")}`,
      area: { connect: { id: productAreaRefs[i % productAreaRefs.length].id } }
      },
    });
  }

  const STATUSES_Specification = ["DRAFT", "REVIEW", "APPROVED", "LOCKED"];
  await prisma.specification.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.specification.create({
      data: {
      title: `Title ${String(i + 1).padStart(3, "0")}`,
      problemRef: `ProblemRef ${String(i + 1).padStart(3, "0")}`,
      scope: `Scope ${String(i + 1).padStart(3, "0")}`,
      acceptanceCriteria: `AcceptanceCriteria ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_Specification, i),
      approvedAt: daysAgo(i),
      area: { connect: { id: productAreaRefs[i % productAreaRefs.length].id } }
      },
    });
  }

  const STATUSES_Prototype = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.prototype.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.prototype.create({
      data: {
      name: `Name ${String(i + 1).padStart(3, "0")}`,
      kind: `Kind ${String(i + 1).padStart(3, "0")}`,
      url: `Url ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_Prototype, i),
      feedbackSummary: `FeedbackSummary ${String(i + 1).padStart(3, "0")}`,
      createdOn: daysAgo(i),
      area: { connect: { id: productAreaRefs[i % productAreaRefs.length].id } }
      },
    });
  }

  const STATUSES_TestPlan = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.testPlan.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.testPlan.create({
      data: {
      specRef: `SpecRef ${String(i + 1).padStart(3, "0")}`,
      coveragesCenarios: `CoveragesCenarios ${String(i + 1).padStart(3, "0")}`,
      caseCount: 5 + ((i * 13) % 95),
      status: pick(STATUSES_TestPlan, i),
      owner: `Owner ${String(i + 1).padStart(3, "0")}`,
      executedAt: daysAgo(i),
      area: { connect: { id: productAreaRefs[i % productAreaRefs.length].id } }
      },
    });
  }

  const STATUSES_PullRequestDraft = ["DRAFTED", "REVIEW", "MERGED", "REJECTED"];
  await prisma.pullRequestDraft.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.pullRequestDraft.create({
      data: {
      specRef: `SpecRef ${String(i + 1).padStart(3, "0")}`,
      branch: `Branch ${String(i + 1).padStart(3, "0")}`,
      summary: `Summary ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_PullRequestDraft, i),
      filesChanged: 5 + ((i * 13) % 95),
      reviewee: `Reviewee ${String(i + 1).padStart(3, "0")}`,
      area: { connect: { id: productAreaRefs[i % productAreaRefs.length].id } }
      },
    });
  }

  const STATUSES_ApprovalGate = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.approvalGate.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.approvalGate.create({
      data: {
      gate: `Gate ${String(i + 1).padStart(3, "0")}`,
      artifact: `Artifact ${String(i + 1).padStart(3, "0")}`,
      approver: `Approver ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_ApprovalGate, i),
      decidedAt: daysAgo(i),
      rationale: `Rationale ${String(i + 1).padStart(3, "0")}`,
      area: { connect: { id: productAreaRefs[i % productAreaRefs.length].id } }
      },
    });
  }

  const STATUSES_FeedbackSignal = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.feedbackSignal.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.feedbackSignal.create({
      data: {
      source: `Source ${String(i + 1).padStart(3, "0")}`,
      content: `Content ${String(i + 1).padStart(3, "0")}`,
      sentiment: `Sentiment ${String(i + 1).padStart(3, "0")}`,
      linkedOpportunity: `LinkedOpportunity ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_FeedbackSignal, i),
      receivedAt: daysAgo(i),
      area: { connect: { id: productAreaRefs[i % productAreaRefs.length].id } }
      },
    });
  }

  const STATUSES_ReleaseCandidate = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.releaseCandidate.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.releaseCandidate.create({
      data: {
      version: `Version ${String(i + 1).padStart(3, "0")}`,
      scope: `Scope ${String(i + 1).padStart(3, "0")}`,
      readiness: `Readiness ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_ReleaseCandidate, i),
      targetDate: daysAgo(i),
      gatekeeper: `Gatekeeper ${String(i + 1).padStart(3, "0")}`,
      area: { connect: { id: productAreaRefs[i % productAreaRefs.length].id } }
      },
    });
  }

  const STATUSES_MetricMovement = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.metricMovement.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.metricMovement.create({
      data: {
      metric: `Metric ${String(i + 1).padStart(3, "0")}`,
      releaseRef: `ReleaseRef ${String(i + 1).padStart(3, "0")}`,
      before: amount(i, 250),
      after: amount(i, 250),
      deltaPct: amount(i, 250),
      status: pick(STATUSES_MetricMovement, i),
      area: { connect: { id: productAreaRefs[i % productAreaRefs.length].id } }
      },
    });
  }

  const STATUSES_DesignReview = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.designReview.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.designReview.create({
      data: {
      artifact: `Artifact ${String(i + 1).padStart(3, "0")}`,
      reviewer: `Reviewer ${String(i + 1).padStart(3, "0")}`,
      outcome: `Outcome ${String(i + 1).padStart(3, "0")}`,
      comments: `Comments ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_DesignReview, i),
      heldAt: daysAgo(i),
      area: { connect: { id: productAreaRefs[i % productAreaRefs.length].id } }
      },
    });
  }

  await prisma.auditLog.create({ data: { actorName: "Seeder", action: "SEED", entity: "system", detail: "Demo dataset created" } });

  console.log("Seeded demo users and domain records.");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
