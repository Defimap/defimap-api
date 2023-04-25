import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateBetaUser1678961041509 implements MigrationInterface {
  name = 'updateBetaUser1678961041509'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "beta_user" ADD "pricingOption" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "beta_user" DROP COLUMN "pricingOption"`)
  }
}
