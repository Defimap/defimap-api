import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateBetaUser1678962155499 implements MigrationInterface {
  name = 'updateBetaUser1678962155499'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "beta_user" ALTER COLUMN "feature" DROP NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "beta_user" ALTER COLUMN "feature" SET NOT NULL`)
  }
}
