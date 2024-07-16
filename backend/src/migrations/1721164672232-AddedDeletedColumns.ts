import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDeletedColumns1721164672232 implements MigrationInterface {
    name = 'AddedDeletedColumns1721164672232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "beets_album"
            ADD "deleted" boolean DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "beets_item"
            ADD "deleted" boolean DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "beets_item" DROP COLUMN "deleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "beets_album" DROP COLUMN "deleted"
        `);
    }

}
