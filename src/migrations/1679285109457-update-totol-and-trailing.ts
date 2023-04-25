import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateTotolAndTrailing1679285109457 implements MigrationInterface {
  name = 'updateTotolAndTrailing1679285109457'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "index_total_return" DROP COLUMN "quartile_rank"`)
    await queryRunner.query(`DROP TYPE "public"."index_total_return_quartile_rank_enum"`)
    await queryRunner.query(`ALTER TABLE "index_total_return" DROP COLUMN "percentile_rank"`)
    await queryRunner.query(`ALTER TABLE "index_total_return" DROP COLUMN "total_strategy_in_cat"`)
    await queryRunner.query(`ALTER TABLE "index_trailing_return" DROP COLUMN "quartile_rank"`)
    await queryRunner.query(`DROP TYPE "public"."index_trailing_return_quartile_rank_enum"`)
    await queryRunner.query(`ALTER TABLE "index_trailing_return" DROP COLUMN "percentile_rank"`)
    await queryRunner.query(`ALTER TABLE "index_trailing_return" DROP COLUMN "total_strategy_in_cat"`)
    await queryRunner.query(`ALTER TABLE "category_trailing_return" DROP COLUMN "quartile_rank"`)
    await queryRunner.query(`DROP TYPE "public"."category_trailing_return_quartile_rank_enum"`)
    await queryRunner.query(`ALTER TABLE "category_trailing_return" DROP COLUMN "percentile_rank"`)
    await queryRunner.query(`ALTER TABLE "category_total_return" DROP COLUMN "quartile_rank"`)
    await queryRunner.query(`DROP TYPE "public"."category_total_return_quartile_rank_enum"`)
    await queryRunner.query(`ALTER TABLE "category_total_return" DROP COLUMN "percentile_rank"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category_total_return" ADD "percentile_rank" numeric`)
    await queryRunner.query(
      `CREATE TYPE "public"."category_total_return_quartile_rank_enum" AS ENUM('Q1', 'Q2', 'Q3', 'Q4')`,
    )
    await queryRunner.query(
      `ALTER TABLE "category_total_return" ADD "quartile_rank" "public"."category_total_return_quartile_rank_enum" NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "category_trailing_return" ADD "percentile_rank" numeric`)
    await queryRunner.query(
      `CREATE TYPE "public"."category_trailing_return_quartile_rank_enum" AS ENUM('Q1', 'Q2', 'Q3', 'Q4')`,
    )
    await queryRunner.query(
      `ALTER TABLE "category_trailing_return" ADD "quartile_rank" "public"."category_trailing_return_quartile_rank_enum" NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "index_trailing_return" ADD "total_strategy_in_cat" numeric`)
    await queryRunner.query(`ALTER TABLE "index_trailing_return" ADD "percentile_rank" numeric`)
    await queryRunner.query(
      `CREATE TYPE "public"."index_trailing_return_quartile_rank_enum" AS ENUM('Q1', 'Q2', 'Q3', 'Q4')`,
    )
    await queryRunner.query(
      `ALTER TABLE "index_trailing_return" ADD "quartile_rank" "public"."index_trailing_return_quartile_rank_enum" NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "index_total_return" ADD "total_strategy_in_cat" numeric`)
    await queryRunner.query(`ALTER TABLE "index_total_return" ADD "percentile_rank" numeric`)
    await queryRunner.query(
      `CREATE TYPE "public"."index_total_return_quartile_rank_enum" AS ENUM('Q1', 'Q2', 'Q3', 'Q4')`,
    )
    await queryRunner.query(
      `ALTER TABLE "index_total_return" ADD "quartile_rank" "public"."index_total_return_quartile_rank_enum" NOT NULL`,
    )
  }
}
