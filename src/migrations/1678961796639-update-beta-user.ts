import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateBetaUser1678961796639 implements MigrationInterface {
  name = 'updateBetaUser1678961796639'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "beta_user" RENAME COLUMN "pricingOption" TO "pricing_option"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "beta_user" RENAME COLUMN "pricing_option" TO "pricingOption"`)
  }
}
