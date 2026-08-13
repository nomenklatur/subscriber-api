CREATE SCHEMA "subscribers";
--> statement-breakpoint
ALTER TABLE "public"."issues" SET SCHEMA "subscribers";
--> statement-breakpoint
ALTER TABLE "public"."subscribers" SET SCHEMA "subscribers";
