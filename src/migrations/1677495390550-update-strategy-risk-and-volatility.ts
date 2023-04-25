import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateStrategyRiskAndVolatility1677495390550 implements MigrationInterface {
  name = 'updateStrategyRiskAndVolatility1677495390550'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "strategy_risk_and_volatility" ALTER COLUMN "risk_vs_category" DROP NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "strategy_risk_and_volatility" ALTER COLUMN "return_vs_category" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "strategy_risk_and_volatility" ALTER COLUMN "return_vs_category" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "strategy_risk_and_volatility" ALTER COLUMN "risk_vs_category" SET NOT NULL`)
  }
}
