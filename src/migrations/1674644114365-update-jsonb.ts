import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateJsonb1674644114365 implements MigrationInterface {
  name = 'updateJsonb1674644114365'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "description"`)
    await queryRunner.query(`ALTER TABLE "token" ADD "description" jsonb NOT NULL DEFAULT '[]'`)
    await queryRunner.query(`ALTER TABLE "chain" DROP COLUMN "description"`)
    await queryRunner.query(`ALTER TABLE "chain" ADD "description" jsonb NOT NULL DEFAULT '[]'`)
    await queryRunner.query(`ALTER TABLE "protocol" DROP COLUMN "description"`)
    await queryRunner.query(`ALTER TABLE "protocol" ADD "description" jsonb NOT NULL DEFAULT '[]'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "protocol" DROP COLUMN "description"`)
    await queryRunner.query(`ALTER TABLE "protocol" ADD "description" character varying`)
    await queryRunner.query(`ALTER TABLE "chain" DROP COLUMN "description"`)
    await queryRunner.query(`ALTER TABLE "chain" ADD "description" character varying`)
    await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "description"`)
    await queryRunner.query(`ALTER TABLE "token" ADD "description" character varying`)
  }
}
