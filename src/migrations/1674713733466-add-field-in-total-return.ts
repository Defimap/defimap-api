import { MigrationInterface, QueryRunner } from 'typeorm'

export class addFieldInTotalReturn1674713733466 implements MigrationInterface {
  name = 'addFieldInTotalReturn1674713733466'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "index_total_return" ADD "total_strategy_in_cat" numeric`)
    await queryRunner.query(`ALTER TABLE "strategy_total_return" ADD "total_strategy_in_cat" numeric`)
    await queryRunner.query(`ALTER TABLE "category_total_return" ADD "total_strategy_in_cat" numeric`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category_total_return" DROP COLUMN "total_strategy_in_cat"`)
    await queryRunner.query(`ALTER TABLE "strategy_total_return" DROP COLUMN "total_strategy_in_cat"`)
    await queryRunner.query(`ALTER TABLE "index_total_return" DROP COLUMN "total_strategy_in_cat"`)
  }
}
