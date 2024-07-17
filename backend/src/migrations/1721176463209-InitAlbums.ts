import { MigrationInterface, QueryRunner } from "typeorm";

export class InitAlbums1721176463209 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "beets_album" (
                "id" integer NOT NULL,
                "artpath" character varying,
                "added" real NOT NULL,
                "albumartist" character varying NOT NULL,
                "albumartist_sort" character varying NOT NULL,
                "albumartist_credit" character varying NOT NULL,
                "name" character varying NOT NULL,
                "genre" character varying NOT NULL,
                "year" integer NOT NULL,
                "month" integer NOT NULL,
                "day" integer NOT NULL,
                "disctotal" integer NOT NULL,
                "comp" integer NOT NULL,
                "mb_albumid" character varying NOT NULL,
                "mb_albumartistid" character varying NOT NULL,
                "albumtype" character varying NOT NULL,
                "label" character varying NOT NULL,
                "mb_releasegroupid" character varying NOT NULL,
                "asin" character varying NOT NULL,
                "catalognum" character varying NOT NULL,
                "script" character varying NOT NULL,
                "language" character varying NOT NULL,
                "country" character varying NOT NULL,
                "albumstatus" character varying NOT NULL,
                "albumdisambig" character varying NOT NULL,
                "releasegroupdisambig" character varying NOT NULL,
                "rg_album_gain" real,
                "rg_album_peak" real,
                "r128_album_gain" real,
                "original_year" integer NOT NULL,
                "original_month" integer NOT NULL,
                "original_day" integer NOT NULL,
                "style" character varying,
                "discogs_albumid" integer,
                "discogs_artistid" integer,
                "discogs_labelid" integer,
                "albumtypes" character varying,
                "deleted" boolean DEFAULT false,
                CONSTRAINT "PK_4c152f275336b95c269d8c3245e" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            ALTER TABLE "beets_item"
            ADD CONSTRAINT "FK_0a34857b13cdb302956c304a7ee" FOREIGN KEY ("album_id") REFERENCES "beets_album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "beets_item"
            DROP CONSTRAINT "FK_0a34857b13cdb302956c304a7ee"
        `);
        await queryRunner.query(`
            DROP TABLE "beets_album"
        `);
    }

}
