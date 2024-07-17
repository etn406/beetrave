import { MigrationInterface, QueryRunner } from "typeorm";

export class InitPlaylists1721176639122 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."playlist_ptype_enum" AS ENUM('syncthing', 'items')
        `);
        await queryRunner.query(`
            CREATE TABLE "playlist" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "ptype" "public"."playlist_ptype_enum" NOT NULL DEFAULT 'items',
                CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "playlist"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."playlist_ptype_enum"
        `);
    }

}
