import { MigrationInterface, QueryRunner } from "typeorm";

export class InitItems1721176458971 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "beets_item" (
                "path" character varying,
                "id" integer NOT NULL,
                "album_id" integer,
                "year" integer NOT NULL,
                "month" integer NOT NULL,
                "day" integer NOT NULL,
                "track" integer NOT NULL,
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
                "title" character varying NOT NULL,
                "artist" character varying NOT NULL,
                "artist_sort" character varying NOT NULL,
                "artist_credit" character varying NOT NULL,
                "albumname" character varying NOT NULL,
                "albumartist" character varying NOT NULL,
                "albumartist_sort" character varying NOT NULL,
                "albumartist_credit" character varying NOT NULL,
                "genre" character varying NOT NULL,
                "lyricist" character varying NOT NULL,
                "composer" character varying NOT NULL,
                "composer_sort" character varying NOT NULL,
                "arranger" character varying NOT NULL,
                "grouping" character varying NOT NULL,
                "lyrics" character varying NOT NULL,
                "comments" character varying NOT NULL,
                "mb_trackid" character varying,
                "mb_albumid" character varying,
                "mb_artistid" character varying,
                "mb_albumartistid" character varying,
                "mb_releasetrackid" character varying,
                "albumtype" character varying NOT NULL,
                "label" character varying NOT NULL,
                "acoustid_fingerprint" character varying,
                "acoustid_id" character varying,
                "mb_releasegroupid" character varying NOT NULL,
                "asin" character varying NOT NULL,
                "catalognum" character varying NOT NULL,
                "script" character varying NOT NULL,
                "language" character varying NOT NULL,
                "country" character varying NOT NULL,
                "albumstatus" character varying NOT NULL,
                "media" character varying NOT NULL,
                "albumdisambig" character varying NOT NULL,
                "releasegroupdisambig" character varying NOT NULL,
                "disctitle" character varying NOT NULL,
                "encoder" character varying NOT NULL,
                "initial_key" character varying,
                "format" character varying NOT NULL,
                "style" character varying,
                "work" character varying,
                "mb_workid" character varying,
                "work_disambig" character varying,
                "trackdisambig" character varying,
                "albumtypes" character varying,
                "isrc" character varying,
                "deleted" boolean DEFAULT false,
                CONSTRAINT "PK_4d45e50619c351d38307d8e1b8e" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "beets_item"
        `);
    }

}