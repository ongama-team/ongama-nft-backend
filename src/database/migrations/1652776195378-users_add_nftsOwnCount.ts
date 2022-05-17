import { MigrationInterface, QueryRunner } from 'typeorm';

export class usersAddNftsOwnCount1652776195378 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" ADD "nftsOwnCount" int4 DEFAULT 0;', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP "nftsOwnCount";', undefined);
  }
}
