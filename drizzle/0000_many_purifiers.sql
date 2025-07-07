-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations

CREATE TABLE IF NOT EXISTS "Category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Down" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(300),
	"downloaded" boolean,
	"date" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Video" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"uaid" varchar(5),
	"yid" varchar(11),
	"title" varchar(200),
	"description" text,
	"date" timestamp with time zone,
	"postDate" timestamp with time zone,
	"duration" time,
	"author" varchar(50),
	"viewes" bigint,
	"likes" integer,
	"categoryId" integer,
	"aspectRatioWidth" smallint,
	"aspectRatioHeight" smallint,
	"textType" smallint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VideoTag" (
	"idVideo" bigint DEFAULT '0' NOT NULL,
	"idTag" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "idx_16640_primary" PRIMARY KEY("idVideo","idTag")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Video" ADD CONSTRAINT "fk_categoria" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE restrict ON UPDATE restrict;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VideoTag" ADD CONSTRAINT "fk_tag" FOREIGN KEY ("idTag") REFERENCES "public"."Tag"("id") ON DELETE restrict ON UPDATE restrict;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VideoTag" ADD CONSTRAINT "fk_video" FOREIGN KEY ("idVideo") REFERENCES "public"."Video"("id") ON DELETE restrict ON UPDATE restrict;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_16619_uk_name" ON "Category" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_16624_url" ON "Down" USING btree ("url");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_16629_uk_name" ON "Tag" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_16634_fk_category" ON "Video" USING btree ("categoryId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_16634_idx_title" ON "Video" USING btree ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_16634_idx_uaid" ON "Video" USING btree ("uaid");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_16634_idx_yid" ON "Video" USING btree ("yid");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_16634_ui_yid" ON "Video" USING btree ("yid");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_16640_fk_tag" ON "VideoTag" USING btree ("idTag");

