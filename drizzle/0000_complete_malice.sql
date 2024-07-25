DO $$ BEGIN
 CREATE TYPE "public"."playlist_type_enum" AS ENUM('default', 'syncthing');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "album" (
	"id" integer PRIMARY KEY NOT NULL,
	"artpath" varchar,
	"added" real NOT NULL,
	"albumartist" varchar NOT NULL,
	"albumartist_sort" varchar NOT NULL,
	"albumartist_credit" varchar NOT NULL,
	"name" varchar NOT NULL,
	"genre" varchar NOT NULL,
	"year" integer NOT NULL,
	"month" integer NOT NULL,
	"day" integer NOT NULL,
	"disctotal" integer NOT NULL,
	"comp" integer NOT NULL,
	"mb_albumid" varchar NOT NULL,
	"mb_albumartistid" varchar NOT NULL,
	"albumtype" varchar NOT NULL,
	"label" varchar NOT NULL,
	"mb_releasegroupid" varchar NOT NULL,
	"asin" varchar NOT NULL,
	"catalognum" varchar NOT NULL,
	"script" varchar NOT NULL,
	"language" varchar NOT NULL,
	"country" varchar NOT NULL,
	"albumstatus" varchar NOT NULL,
	"albumdisambig" varchar NOT NULL,
	"releasegroupdisambig" varchar NOT NULL,
	"rg_album_gain" real,
	"rg_album_peak" real,
	"r128_album_gain" real,
	"original_year" integer NOT NULL,
	"original_month" integer NOT NULL,
	"original_day" integer NOT NULL,
	"style" varchar,
	"discogs_albumid" integer,
	"discogs_artistid" integer,
	"discogs_labelid" integer,
	"albumtypes" varchar,
	"deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "playlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"type" "playlist_type_enum" DEFAULT 'default' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "playlist_tracks" (
	"playlist_id" integer NOT NULL,
	"track_id" integer NOT NULL,
	"track_position" integer NOT NULL,
	CONSTRAINT "playlist_tracks_playlist_id_track_id_track_position_pk" PRIMARY KEY("playlist_id","track_id","track_position"),
	CONSTRAINT "unique_track_position_per_playlist" UNIQUE("playlist_id","track_position")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "track" (
	"path" varchar,
	"id" integer PRIMARY KEY NOT NULL,
	"album_id" integer,
	"year" integer NOT NULL,
	"month" integer NOT NULL,
	"day" integer NOT NULL,
	"trackindex" integer NOT NULL,
	"tracktotal" integer NOT NULL,
	"disc" integer NOT NULL,
	"disctotal" integer NOT NULL,
	"bpm" integer,
	"comp" integer NOT NULL,
	"r128_track_gain" integer,
	"r128_album_gain" integer,
	"original_year" integer NOT NULL,
	"original_month" integer NOT NULL,
	"original_day" integer NOT NULL,
	"bitrate" integer NOT NULL,
	"samplerate" integer NOT NULL,
	"bitdepth" integer NOT NULL,
	"channels" integer NOT NULL,
	"discogs_albumid" integer,
	"discogs_artistid" integer,
	"discogs_labelid" integer,
	"rg_track_gain" real,
	"rg_track_peak" real,
	"rg_album_gain" real,
	"rg_album_peak" real,
	"length" real NOT NULL,
	"mtime" real NOT NULL,
	"added" real NOT NULL,
	"title" varchar NOT NULL,
	"artist" varchar NOT NULL,
	"artist_sort" varchar NOT NULL,
	"artist_credit" varchar NOT NULL,
	"albumname" varchar NOT NULL,
	"albumartist" varchar NOT NULL,
	"albumartist_sort" varchar NOT NULL,
	"albumartist_credit" varchar NOT NULL,
	"genre" varchar NOT NULL,
	"lyricist" varchar NOT NULL,
	"composer" varchar NOT NULL,
	"composer_sort" varchar NOT NULL,
	"arranger" varchar NOT NULL,
	"grouping" varchar NOT NULL,
	"lyrics" varchar NOT NULL,
	"comments" varchar NOT NULL,
	"mb_trackid" varchar,
	"mb_albumid" varchar,
	"mb_artistid" varchar,
	"mb_albumartistid" varchar,
	"mb_releasetrackid" varchar,
	"albumtype" varchar NOT NULL,
	"label" varchar NOT NULL,
	"acoustid_fingerprint" varchar,
	"acoustid_id" varchar,
	"mb_releasegroupid" varchar NOT NULL,
	"asin" varchar NOT NULL,
	"catalognum" varchar NOT NULL,
	"script" varchar NOT NULL,
	"language" varchar NOT NULL,
	"country" varchar NOT NULL,
	"albumstatus" varchar NOT NULL,
	"media" varchar NOT NULL,
	"albumdisambig" varchar NOT NULL,
	"releasegroupdisambig" varchar NOT NULL,
	"disctitle" varchar NOT NULL,
	"encoder" varchar NOT NULL,
	"initial_key" varchar,
	"format" varchar NOT NULL,
	"style" varchar,
	"work" varchar,
	"mb_workid" varchar,
	"work_disambig" varchar,
	"trackdisambig" varchar,
	"albumtypes" varchar,
	"isrc" varchar,
	"deleted" boolean DEFAULT false
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlist_tracks" ADD CONSTRAINT "playlist_tracks_playlist_id_playlist_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlist"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlist_tracks" ADD CONSTRAINT "playlist_tracks_track_id_track_id_fk" FOREIGN KEY ("track_id") REFERENCES "public"."track"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "track" ADD CONSTRAINT "track_album_id_album_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."album"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "track" USING btree ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "added_idx" ON "track" USING btree ("added");