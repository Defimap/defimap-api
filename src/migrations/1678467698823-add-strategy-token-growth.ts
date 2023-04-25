import { MigrationInterface, QueryRunner } from 'typeorm'

export class addStrategyTokenGrowth1678467698823 implements MigrationInterface {
  name = 'addStrategyTokenGrowth1678467698823'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "strategy_token_growth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token_id" uuid NOT NULL, "strategy_id" uuid NOT NULL, "date" TIMESTAMP NOT NULL, "profit" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_b62c20e3657903bf12e044a363e" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy_token_growth" ADD CONSTRAINT "FK_0d1047ce9009f3bede61bc43291" FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy_token_growth" ADD CONSTRAINT "FK_b8bd69fcae634d8c0cec32638a4" FOREIGN KEY ("strategy_id") REFERENCES "strategy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "strategy_token_growth" DROP CONSTRAINT "FK_b8bd69fcae634d8c0cec32638a4"`)
    await queryRunner.query(`ALTER TABLE "strategy_token_growth" DROP CONSTRAINT "FK_0d1047ce9009f3bede61bc43291"`)
    await queryRunner.query(`DROP TABLE "strategy_token_growth"`)
  }
}
