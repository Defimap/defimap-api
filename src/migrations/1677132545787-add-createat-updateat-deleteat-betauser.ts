import { MigrationInterface, QueryRunner } from 'typeorm'

export class addCreateatUpdateatDeleteatBetauser1677132545787 implements MigrationInterface {
  name = 'addCreateatUpdateatDeleteatBetauser1677132545787'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "beta_user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`)
    await queryRunner.query(`ALTER TABLE "beta_user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`)
    await queryRunner.query(`ALTER TABLE "beta_user" ADD "deleted_at" TIMESTAMP`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "beta_user" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "beta_user" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "beta_user" DROP COLUMN "created_at"`)
  }
}
