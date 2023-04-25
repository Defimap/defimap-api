import { MigrationInterface, QueryRunner } from 'typeorm'

export class addEnumPeriod1674797439444 implements MigrationInterface {
  name = 'addEnumPeriod1674797439444'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."category_risk_and_volatility_period_enum" RENAME TO "category_risk_and_volatility_period_enum_old"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."category_risk_and_volatility_period_enum" AS ENUM('1d', '1m', '3m', '6m', '1y', 'ytd')`,
    )
    await queryRunner.query(
      `ALTER TABLE "category_risk_and_volatility" ALTER COLUMN "period" TYPE "public"."category_risk_and_volatility_period_enum" USING "period"::"text"::"public"."category_risk_and_volatility_period_enum"`,
    )
    await queryRunner.query(`DROP TYPE "public"."category_risk_and_volatility_period_enum_old"`)
    await queryRunner.query(
      `ALTER TYPE "public"."strategy_trailing_return_period_enum" RENAME TO "strategy_trailing_return_period_enum_old"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."strategy_trailing_return_period_enum" AS ENUM('1d', '1m', '3m', '6m', '1y', 'ytd')`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy_trailing_return" ALTER COLUMN "period" TYPE "public"."strategy_trailing_return_period_enum" USING "period"::"text"::"public"."strategy_trailing_return_period_enum"`,
    )
    await queryRunner.query(`DROP TYPE "public"."strategy_trailing_return_period_enum_old"`)
    await queryRunner.query(
      `ALTER TYPE "public"."strategy_risk_and_volatility_period_enum" RENAME TO "strategy_risk_and_volatility_period_enum_old"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."strategy_risk_and_volatility_period_enum" AS ENUM('1d', '1m', '3m', '6m', '1y', 'ytd')`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy_risk_and_volatility" ALTER COLUMN "period" TYPE "public"."strategy_risk_and_volatility_period_enum" USING "period"::"text"::"public"."strategy_risk_and_volatility_period_enum"`,
    )
    await queryRunner.query(`DROP TYPE "public"."strategy_risk_and_volatility_period_enum_old"`)
    await queryRunner.query(
      `ALTER TYPE "public"."index_risk_and_volatility_period_enum" RENAME TO "index_risk_and_volatility_period_enum_old"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."index_risk_and_volatility_period_enum" AS ENUM('1d', '1m', '3m', '6m', '1y', 'ytd')`,
    )
    await queryRunner.query(
      `ALTER TABLE "index_risk_and_volatility" ALTER COLUMN "period" TYPE "public"."index_risk_and_volatility_period_enum" USING "period"::"text"::"public"."index_risk_and_volatility_period_enum"`,
    )
    await queryRunner.query(`DROP TYPE "public"."index_risk_and_volatility_period_enum_old"`)
    await queryRunner.query(
      `ALTER TYPE "public"."index_trailing_return_period_enum" RENAME TO "index_trailing_return_period_enum_old"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."index_trailing_return_period_enum" AS ENUM('1d', '1m', '3m', '6m', '1y', 'ytd')`,
    )
    await queryRunner.query(
      `ALTER TABLE "index_trailing_return" ALTER COLUMN "period" TYPE "public"."index_trailing_return_period_enum" USING "period"::"text"::"public"."index_trailing_return_period_enum"`,
    )
    await queryRunner.query(`DROP TYPE "public"."index_trailing_return_period_enum_old"`)
    await queryRunner.query(
      `ALTER TYPE "public"."category_trailing_return_period_enum" RENAME TO "category_trailing_return_period_enum_old"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."category_trailing_return_period_enum" AS ENUM('1d', '1m', '3m', '6m', '1y', 'ytd')`,
    )
    await queryRunner.query(
      `ALTER TABLE "category_trailing_return" ALTER COLUMN "period" TYPE "public"."category_trailing_return_period_enum" USING "period"::"text"::"public"."category_trailing_return_period_enum"`,
    )
    await queryRunner.query(`DROP TYPE "public"."category_trailing_return_period_enum_old"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."category_trailing_return_period_enum_old" AS ENUM('1d', '1m', '3m', '1y', 'ytd')`,
    )
    await queryRunner.query(
      `ALTER TABLE "category_trailing_return" ALTER COLUMN "period" TYPE "public"."category_trailing_return_period_enum_old" USING "period"::"text"::"public"."category_trailing_return_period_enum_old"`,
    )
    await queryRunner.query(`DROP TYPE "public"."category_trailing_return_period_enum"`)
    await queryRunner.query(
      `ALTER TYPE "public"."category_trailing_return_period_enum_old" RENAME TO "category_trailing_return_period_enum"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."index_trailing_return_period_enum_old" AS ENUM('1d', '1m', '3m', '1y', 'ytd')`,
    )
    await queryRunner.query(
      `ALTER TABLE "index_trailing_return" ALTER COLUMN "period" TYPE "public"."index_trailing_return_period_enum_old" USING "period"::"text"::"public"."index_trailing_return_period_enum_old"`,
    )
    await queryRunner.query(`DROP TYPE "public"."index_trailing_return_period_enum"`)
    await queryRunner.query(
      `ALTER TYPE "public"."index_trailing_return_period_enum_old" RENAME TO "index_trailing_return_period_enum"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."index_risk_and_volatility_period_enum_old" AS ENUM('1d', '1m', '3m', '1y', 'ytd')`,
    )
    await queryRunner.query(
      `ALTER TABLE "index_risk_and_volatility" ALTER COLUMN "period" TYPE "public"."index_risk_and_volatility_period_enum_old" USING "period"::"text"::"public"."index_risk_and_volatility_period_enum_old"`,
    )
    await queryRunner.query(`DROP TYPE "public"."index_risk_and_volatility_period_enum"`)
    await queryRunner.query(
      `ALTER TYPE "public"."index_risk_and_volatility_period_enum_old" RENAME TO "index_risk_and_volatility_period_enum"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."strategy_risk_and_volatility_period_enum_old" AS ENUM('1d', '1m', '3m', '1y', 'ytd')`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy_risk_and_volatility" ALTER COLUMN "period" TYPE "public"."strategy_risk_and_volatility_period_enum_old" USING "period"::"text"::"public"."strategy_risk_and_volatility_period_enum_old"`,
    )
    await queryRunner.query(`DROP TYPE "public"."strategy_risk_and_volatility_period_enum"`)
    await queryRunner.query(
      `ALTER TYPE "public"."strategy_risk_and_volatility_period_enum_old" RENAME TO "strategy_risk_and_volatility_period_enum"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."strategy_trailing_return_period_enum_old" AS ENUM('1d', '1m', '3m', '1y', 'ytd')`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy_trailing_return" ALTER COLUMN "period" TYPE "public"."strategy_trailing_return_period_enum_old" USING "period"::"text"::"public"."strategy_trailing_return_period_enum_old"`,
    )
    await queryRunner.query(`DROP TYPE "public"."strategy_trailing_return_period_enum"`)
    await queryRunner.query(
      `ALTER TYPE "public"."strategy_trailing_return_period_enum_old" RENAME TO "strategy_trailing_return_period_enum"`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."category_risk_and_volatility_period_enum_old" AS ENUM('1d', '1m', '3m', '1y', 'ytd')`,
    )
    await queryRunner.query(
      `ALTER TABLE "category_risk_and_volatility" ALTER COLUMN "period" TYPE "public"."category_risk_and_volatility_period_enum_old" USING "period"::"text"::"public"."category_risk_and_volatility_period_enum_old"`,
    )
    await queryRunner.query(`DROP TYPE "public"."category_risk_and_volatility_period_enum"`)
    await queryRunner.query(
      `ALTER TYPE "public"."category_risk_and_volatility_period_enum_old" RENAME TO "category_risk_and_volatility_period_enum"`,
    )
  }
}
