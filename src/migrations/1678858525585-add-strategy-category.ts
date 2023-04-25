import { MigrationInterface, QueryRunner } from 'typeorm'

export class addStrategyCategory1678858525585 implements MigrationInterface {
  name = 'addStrategyCategory1678858525585'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "strategy_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "strategy_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_4345d7369dab8f18a0eeffbe17e" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy_category" ADD CONSTRAINT "FK_c061783cb21304c98a7fa8ed651" FOREIGN KEY ("strategy_id") REFERENCES "strategy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy_category" ADD CONSTRAINT "FK_c0845fd7e926cb33e1ee21f15d5" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "strategy_category" DROP CONSTRAINT "FK_c0845fd7e926cb33e1ee21f15d5"`)
    await queryRunner.query(`ALTER TABLE "strategy_category" DROP CONSTRAINT "FK_c061783cb21304c98a7fa8ed651"`)
    await queryRunner.query(`DROP TABLE "strategy_category"`)
  }
}
