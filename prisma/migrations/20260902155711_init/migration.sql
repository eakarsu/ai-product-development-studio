-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'ANALYST');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ANALYST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "actorName" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "sponsor" TEXT NOT NULL,
    "metric" TEXT NOT NULL,
    "northStar" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerProblem" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "segment" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "frequencyScore" DOUBLE PRECISION NOT NULL,
    "areaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOpportunity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "hypothesis" TEXT NOT NULL,
    "impactScore" DOUBLE PRECISION NOT NULL,
    "effortScore" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "areaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductOpportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "problemRef" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "acceptanceCriteria" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "approvedAt" TIMESTAMP(3),
    "areaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Specification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prototype" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "feedbackSummary" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3),
    "areaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prototype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestPlan" (
    "id" TEXT NOT NULL,
    "specRef" TEXT NOT NULL,
    "coveragesCenarios" TEXT NOT NULL,
    "caseCount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "executedAt" TIMESTAMP(3),
    "areaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PullRequestDraft" (
    "id" TEXT NOT NULL,
    "specRef" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "filesChanged" INTEGER NOT NULL,
    "reviewee" TEXT NOT NULL,
    "areaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PullRequestDraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApprovalGate" (
    "id" TEXT NOT NULL,
    "gate" TEXT NOT NULL,
    "artifact" TEXT NOT NULL,
    "approver" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "decidedAt" TIMESTAMP(3),
    "rationale" TEXT,
    "areaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApprovalGate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackSignal" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sentiment" TEXT NOT NULL,
    "linkedOpportunity" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "receivedAt" TIMESTAMP(3),
    "areaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedbackSignal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseCandidate" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "readiness" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "targetDate" TIMESTAMP(3),
    "gatekeeper" TEXT NOT NULL,
    "areaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReleaseCandidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricMovement" (
    "id" TEXT NOT NULL,
    "metric" TEXT NOT NULL,
    "releaseRef" TEXT NOT NULL,
    "before" DOUBLE PRECISION NOT NULL,
    "after" DOUBLE PRECISION NOT NULL,
    "deltaPct" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "areaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetricMovement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesignReview" (
    "id" TEXT NOT NULL,
    "artifact" TEXT NOT NULL,
    "reviewer" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "heldAt" TIMESTAMP(3),
    "areaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DesignReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CustomerProblem" ADD CONSTRAINT "CustomerProblem_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "ProductArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOpportunity" ADD CONSTRAINT "ProductOpportunity_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "ProductArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Specification" ADD CONSTRAINT "Specification_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "ProductArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prototype" ADD CONSTRAINT "Prototype_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "ProductArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPlan" ADD CONSTRAINT "TestPlan_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "ProductArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PullRequestDraft" ADD CONSTRAINT "PullRequestDraft_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "ProductArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalGate" ADD CONSTRAINT "ApprovalGate_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "ProductArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackSignal" ADD CONSTRAINT "FeedbackSignal_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "ProductArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseCandidate" ADD CONSTRAINT "ReleaseCandidate_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "ProductArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricMovement" ADD CONSTRAINT "MetricMovement_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "ProductArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignReview" ADD CONSTRAINT "DesignReview_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "ProductArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;
