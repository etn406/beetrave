DO $$ BEGIN
 CREATE TYPE "public"."script_execution_source" AS ENUM('cron', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."script_name" AS ENUM('beets-import');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scripts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "script_name" NOT NULL,
	"startTime" timestamp NOT NULL,
	"endTime" timestamp NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"success" boolean,
	"logs" text,
	"source" "script_execution_source" NOT NULL
);
