import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateBetaUser1678355927460 implements MigrationInterface {
  name = 'updateBetaUser1678355927460'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "beta_user" ADD "feature" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "beta_user" DROP CONSTRAINT "UQ_7ba2e27ca8ecdb0bba1b976d61a"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "beta_user" ADD CONSTRAINT "UQ_7ba2e27ca8ecdb0bba1b976d61a" UNIQUE ("email")`)
    await queryRunner.query(`ALTER TABLE "beta_user" DROP COLUMN "feature"`)
  }
}
