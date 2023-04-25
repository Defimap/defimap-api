import { MigrationInterface, QueryRunner } from 'typeorm'

export class addIsActive1676361080038 implements MigrationInterface {
  name = 'addIsActive1676361080038'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chain" ADD "is_active" boolean NOT NULL DEFAULT true`)
    await queryRunner.query(`ALTER TABLE "protocol" ADD "is_active" boolean NOT NULL DEFAULT true`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "protocol" DROP COLUMN "is_active"`)
    await queryRunner.query(`ALTER TABLE "chain" DROP COLUMN "is_active"`)
  }
}
