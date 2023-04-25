import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateRewardStrategyToken1675419851216 implements MigrationInterface {
  name = 'updateRewardStrategyToken1675419851216'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reward_strategy_token" DROP CONSTRAINT "FK_953843cfd6554d1689be3f3247d"`)
    await queryRunner.query(`ALTER TABLE "reward_strategy_token" DROP CONSTRAINT "FK_b2b382186d094c890351489b707"`)
    await queryRunner.query(`ALTER TABLE "reward_strategy_token" ALTER COLUMN "token_id" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "reward_strategy_token" ALTER COLUMN "strategy_id" SET NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "reward_strategy_token" ADD CONSTRAINT "FK_953843cfd6554d1689be3f3247d" FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "reward_strategy_token" ADD CONSTRAINT "FK_b2b382186d094c890351489b707" FOREIGN KEY ("strategy_id") REFERENCES "strategy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reward_strategy_token" DROP CONSTRAINT "FK_b2b382186d094c890351489b707"`)
    await queryRunner.query(`ALTER TABLE "reward_strategy_token" DROP CONSTRAINT "FK_953843cfd6554d1689be3f3247d"`)
    await queryRunner.query(`ALTER TABLE "reward_strategy_token" ALTER COLUMN "strategy_id" DROP NOT NULL`)
    await queryRunner.query(`ALTER TABLE "reward_strategy_token" ALTER COLUMN "token_id" DROP NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "reward_strategy_token" ADD CONSTRAINT "FK_b2b382186d094c890351489b707" FOREIGN KEY ("strategy_id") REFERENCES "strategy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "reward_strategy_token" ADD CONSTRAINT "FK_953843cfd6554d1689be3f3247d" FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
