import { MigrationInterface, QueryRunner } from 'typeorm';

export class usersAddSalesTotalAmount1655985256054 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users ADD COLUMN "salesTotalAmount" FLOAT8 DEFAULT 0;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users DROP COLUMN "salesTotalAmount";`);
  }
}
