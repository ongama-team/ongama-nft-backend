import { MigrationInterface, QueryRunner } from 'typeorm';

export class nftsAddDropId1653603128214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE nfts ADD COLUMN "dropId" int8;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE nfts DROP COLUMN "dropId";
  `);
  }
}
