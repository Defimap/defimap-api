import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateRiskAndVolatility1675239667558 implements MigrationInterface {
  name = 'updateRiskAndVolatility1675239667558'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "strategy_risk_and_volatility" ADD "date" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "strategy_risk_and_volatility" ADD "created_at" TIMESTAMP DEFAULT now()`)
    await queryRunner.query(`ALTER TABLE "strategy_risk_and_volatility" ADD "updated_at" TIMESTAMP DEFAULT now()`)
    await queryRunner.query(`ALTER TABLE "strategy_risk_and_volatility" ADD "deleted_at" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "index_risk_and_volatility" ADD "date" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "index_risk_and_volatility" ADD "created_at" TIMESTAMP DEFAULT now()`)
    await queryRunner.query(`ALTER TABLE "index_risk_and_volatility" ADD "updated_at" TIMESTAMP DEFAULT now()`)
    await queryRunner.query(`ALTER TABLE "index_risk_and_volatility" ADD "deleted_at" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "category_risk_and_volatility" ADD "created_at" TIMESTAMP DEFAULT now()`)
    await queryRunner.query(`ALTER TABLE "category_risk_and_volatility" ADD "updated_at" TIMESTAMP DEFAULT now()`)
    await queryRunner.query(`ALTER TABLE "category_risk_and_volatility" ADD "deleted_at" TIMESTAMP`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category_risk_and_volatility" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "category_risk_and_volatility" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "category_risk_and_volatility" DROP COLUMN "created_at"`)
    await queryRunner.query(`ALTER TABLE "index_risk_and_volatility" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "index_risk_and_volatility" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "index_risk_and_volatility" DROP COLUMN "created_at"`)
    await queryRunner.query(`ALTER TABLE "index_risk_and_volatility" DROP COLUMN "date"`)
    await queryRunner.query(`ALTER TABLE "strategy_risk_and_volatility" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "strategy_risk_and_volatility" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "strategy_risk_and_volatility" DROP COLUMN "created_at"`)
    await queryRunner.query(`ALTER TABLE "strategy_risk_and_volatility" DROP COLUMN "date"`)
  }
}
