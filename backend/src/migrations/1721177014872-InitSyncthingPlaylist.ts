import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSyncthingPlaylist1721177014872 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO playlist ("name", ptype)
                VALUES ('syncthing', 'syncthing'::public.playlist_ptype_enum);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM playlist
                WHERE ptype='syncthing';
        `);
    }

}
