import { MigrationInterface, QueryRunner } from "typeorm";

export class FixedRelation1721178784655 implements MigrationInterface {
    name = 'FixedRelation1721178784655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "playlist_items_beets_item" (
                "playlistId" integer NOT NULL,
                "beetsItemId" integer NOT NULL,
                CONSTRAINT "PK_0a05fd70d672f820e2f03aad747" PRIMARY KEY ("playlistId", "beetsItemId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_83115e3d9b685e24284d50f177" ON "playlist_items_beets_item" ("playlistId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_358b3955bb73eae6e4ec82cec0" ON "playlist_items_beets_item" ("beetsItemId")
        `);
        await queryRunner.query(`
            ALTER TABLE "playlist_items_beets_item"
            ADD CONSTRAINT "FK_83115e3d9b685e24284d50f1778" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "playlist_items_beets_item"
            ADD CONSTRAINT "FK_358b3955bb73eae6e4ec82cec05" FOREIGN KEY ("beetsItemId") REFERENCES "beets_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "playlist_items_beets_item" DROP CONSTRAINT "FK_358b3955bb73eae6e4ec82cec05"
        `);
        await queryRunner.query(`
            ALTER TABLE "playlist_items_beets_item" DROP CONSTRAINT "FK_83115e3d9b685e24284d50f1778"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_358b3955bb73eae6e4ec82cec0"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_83115e3d9b685e24284d50f177"
        `);
        await queryRunner.query(`
            DROP TABLE "playlist_items_beets_item"
        `);
    }

}
