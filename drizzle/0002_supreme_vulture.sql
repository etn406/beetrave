ALTER TYPE "script_execution_source" ADD VALUE 'manual';--> statement-breakpoint
ALTER TABLE "scripts" ALTER COLUMN "endTime" DROP NOT NULL;