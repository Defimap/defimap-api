import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateRiskAndVolatility1675240442048 implements MigrationInterface {
  name = 'updateRiskAndVolatility1675240442048'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category_risk_and_volatility" ADD "date" TIMESTAMP`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category_risk_and_volatility" DROP COLUMN "date"`)
  }
}
