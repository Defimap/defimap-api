import { MigrationInterface, QueryRunner } from 'typeorm'

export class initialEntity1674635433532 implements MigrationInterface {
  name = 'initialEntity1674635433532'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."category_trailing_return_period_enum" AS ENUM('1d', '1m', '3m', '1y')`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."category_trailing_return_quartile_rank_enum" AS ENUM('Q1', 'Q2', 'Q3', 'Q4')`,
    )
    await queryRunner.query(
      `CREATE TABLE "category_trailing_return" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "period" "public"."category_trailing_return_period_enum" NOT NULL, "value" numeric NOT NULL, "quartile_rank" "public"."category_trailing_return_quartile_rank_enum" NOT NULL, "percentile_rank" numeric, "total_strategy_in_cat" numeric, "category_id" uuid NOT NULL, CONSTRAINT "PK_69052d381b212a67b3a28c8029f" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "category_growth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "start_day_investment" numeric NOT NULL, "end_day_investment" numeric NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_4ea174dd6a0278c75ae49127171" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "token_price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" numeric NOT NULL, "high" numeric, "low" numeric, "volume" numeric, "open" numeric, "timestamp" TIMESTAMP NOT NULL, "token_id" uuid NOT NULL, CONSTRAINT "PK_dcc681716689f0d6311c0498c61" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "reward_strategy_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "token_id" uuid, "strategy_id" uuid, CONSTRAINT "PK_684d930f059922ce411b031110f" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "supply_strategy_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "token_id" uuid NOT NULL, "strategy_id" uuid NOT NULL, CONSTRAINT "PK_2c075b69f12d2ef72542bb631c0" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "symbol" character varying NOT NULL, "address" character varying NOT NULL, "logo" character varying, "link" character varying, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "chain_id" uuid, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "chain" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "logo" character varying, "link" character varying, "description" character varying, "network_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_6e8ccbe06fcc9718b3ad7cf2317" UNIQUE ("network_id"), CONSTRAINT "PK_8e273aafae283b886672c952ecd" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "protocol" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "link" character varying, "logo" character varying, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_bae34901abddccbddda15ea000c" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."strategy_trailing_return_period_enum" AS ENUM('1d', '1m', '3m', '1y')`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."strategy_trailing_return_quartile_rank_enum" AS ENUM('Q1', 'Q2', 'Q3', 'Q4')`,
    )
    await queryRunner.query(
      `CREATE TABLE "strategy_trailing_return" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "period" "public"."strategy_trailing_return_period_enum" NOT NULL, "value" numeric NOT NULL, "quartile_rank" "public"."strategy_trailing_return_quartile_rank_enum" NOT NULL, "percentile_rank" numeric, "total_strategy_in_cat" numeric, "strategy_id" uuid NOT NULL, CONSTRAINT "PK_041243195fb7d2107f03f4ba26f" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."strategy_risk_and_volatility_period_enum" AS ENUM('1d', '1m', '3m', '1y')`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."strategy_risk_and_volatility_risk_vs_category_enum" AS ENUM('low', 'average', 'high')`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."strategy_risk_and_volatility_return_vs_category_enum" AS ENUM('low', 'average', 'high')`,
    )
    await queryRunner.query(
      `CREATE TABLE "strategy_risk_and_volatility" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "period" "public"."strategy_risk_and_volatility_period_enum" NOT NULL, "sd" numeric, "sharpe" numeric, "alpha" numeric, "beta" numeric, "r_square" numeric, "max_drawdown" numeric, "drawdown_peak_date" TIMESTAMP, "drawdown_valley_date" TIMESTAMP, "drawdown_duration" character varying, "risk_vs_category" "public"."strategy_risk_and_volatility_risk_vs_category_enum" NOT NULL, "return_vs_category" "public"."strategy_risk_and_volatility_return_vs_category_enum" NOT NULL, "strategy_id" uuid NOT NULL, CONSTRAINT "PK_d4ddbb68c0e54f75a25726e6f6f" PRIMARY KEY ("id")); COMMENT ON COLUMN "strategy_risk_and_volatility"."sd" IS 'Standard Deviation'; COMMENT ON COLUMN "strategy_risk_and_volatility"."sharpe" IS 'Sharpe Ratio'`,
    )
    await queryRunner.query(
      `CREATE TABLE "strategy_tvl" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "tvl" numeric NOT NULL, "change_tvl_daily" numeric NOT NULL, "change_tvl_monthly" numeric NOT NULL, "change_tvl_yearly" numeric NOT NULL, "percent_change" numeric NOT NULL, "strategy_id" uuid NOT NULL, CONSTRAINT "PK_1d6fb7ae105c2b9c565c9295895" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "strategy_apr" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "timestamp" TIMESTAMP NOT NULL, "value" numeric NOT NULL, "strategy_id" uuid NOT NULL, CONSTRAINT "PK_6e49f9fe6868b16f8e10416fbaf" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "index_growth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "start_day_investment" numeric NOT NULL, "end_day_investment" numeric NOT NULL, "index_id" uuid NOT NULL, CONSTRAINT "PK_dfe5acc8559922e9077bb503a2b" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."index_risk_and_volatility_period_enum" AS ENUM('1d', '1m', '3m', '1y')`,
    )
    await queryRunner.query(
      `CREATE TABLE "index_risk_and_volatility" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "period" "public"."index_risk_and_volatility_period_enum" NOT NULL, "sd" numeric, "sharpe" numeric, "alpha" numeric, "beta" numeric, "r_square" numeric, "max_drawdown" numeric, "drawdown_peak_date" TIMESTAMP, "drawdown_valley_date" TIMESTAMP, "drawdown_duration" character varying, "index_id" uuid NOT NULL, CONSTRAINT "PK_507760f18ad39f25a4c8e16b4c6" PRIMARY KEY ("id")); COMMENT ON COLUMN "index_risk_and_volatility"."sd" IS 'Standard Deviation'; COMMENT ON COLUMN "index_risk_and_volatility"."sharpe" IS 'Sharpe Ratio'`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."index_total_return_quartile_rank_enum" AS ENUM('Q1', 'Q2', 'Q3', 'Q4')`,
    )
    await queryRunner.query(
      `CREATE TABLE "index_total_return" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "value" numeric NOT NULL, "quartile_rank" "public"."index_total_return_quartile_rank_enum" NOT NULL, "percentile_rank" numeric, "index_id" uuid NOT NULL, CONSTRAINT "PK_dbd7da9592ed0abe44692f73dff" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`CREATE TYPE "public"."index_trailing_return_period_enum" AS ENUM('1d', '1m', '3m', '1y')`)
    await queryRunner.query(
      `CREATE TYPE "public"."index_trailing_return_quartile_rank_enum" AS ENUM('Q1', 'Q2', 'Q3', 'Q4')`,
    )
    await queryRunner.query(
      `CREATE TABLE "index_trailing_return" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "period" "public"."index_trailing_return_period_enum" NOT NULL, "value" numeric NOT NULL, "quartile_rank" "public"."index_trailing_return_quartile_rank_enum" NOT NULL, "percentile_rank" numeric, "total_strategy_in_cat" numeric, "index_id" uuid NOT NULL, CONSTRAINT "PK_1737cdf7db87523ebe60811f045" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "index" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_98ba637f525fb11d73ca4b1323b" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."strategy_total_return_quartile_rank_enum" AS ENUM('Q1', 'Q2', 'Q3', 'Q4')`,
    )
    await queryRunner.query(
      `CREATE TABLE "strategy_total_return" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "value" numeric NOT NULL, "quartile_rank" "public"."strategy_total_return_quartile_rank_enum" NOT NULL, "percentile_rank" numeric, "strategy_id" uuid NOT NULL, CONSTRAINT "PK_c2b29389b0b1de4fb02d80be058" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "strategy_growth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "start_day_investment" numeric NOT NULL, "end_day_investment" numeric NOT NULL, "strategy_id" uuid NOT NULL, CONSTRAINT "PK_4f416f98875924bf4fd1bcb90b7" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "strategy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "apr" numeric, "tvl" numeric, "publish" boolean NOT NULL, "category_id" uuid NOT NULL, "protocol_id" uuid NOT NULL, "chain_id" uuid NOT NULL, "index_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_acfd2f8ba7f776ae931260a7abd" UNIQUE ("slug"), CONSTRAINT "PK_733d2c3d4a73c020375b9b3581d" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."category_total_return_quartile_rank_enum" AS ENUM('Q1', 'Q2', 'Q3', 'Q4')`,
    )
    await queryRunner.query(
      `CREATE TABLE "category_total_return" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "value" numeric NOT NULL, "quartile_rank" "public"."category_total_return_quartile_rank_enum" NOT NULL, "percentile_rank" numeric, "category_id" uuid NOT NULL, CONSTRAINT "PK_2c33bd7e05863bd7e8f7371b77b" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."category_risk_and_volatility_period_enum" AS ENUM('1d', '1m', '3m', '1y')`,
    )
    await queryRunner.query(
      `CREATE TABLE "category_risk_and_volatility" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "period" "public"."category_risk_and_volatility_period_enum" NOT NULL, "sd" numeric, "sharpe" numeric, "alpha" numeric, "beta" numeric, "r_square" numeric, "max_drawdown" numeric, "drawdown_peak_date" TIMESTAMP, "drawdown_valley_date" TIMESTAMP, "drawdown_duration" character varying, "category_id" uuid NOT NULL, CONSTRAINT "PK_b9a8c1e224a486a5323a3ec4c95" PRIMARY KEY ("id")); COMMENT ON COLUMN "category_risk_and_volatility"."sd" IS 'Standard Deviation'; COMMENT ON COLUMN "category_risk_and_volatility"."sharpe" IS 'Sharpe Ratio'`,
    )
    await queryRunner.query(
      `CREATE TABLE "protocol_chain" ("protocol_id" uuid NOT NULL, "chain_id" uuid NOT NULL, CONSTRAINT "PK_f4f596df67af5fe067754e1cfb5" PRIMARY KEY ("protocol_id", "chain_id"))`,
    )
    await queryRunner.query(`CREATE INDEX "IDX_59b678de917d19dee870538358" ON "protocol_chain" ("protocol_id") `)
    await queryRunner.query(`CREATE INDEX "IDX_6d9cd1eb94173e8a5fc79b29ab" ON "protocol_chain" ("chain_id") `)
    await queryRunner.query(
      `ALTER TABLE "category_trailing_return" ADD CONSTRAINT "FK_ae9920156277a1d224b2deeacc7" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "category_growth" ADD CONSTRAINT "FK_c433c29dd481bf639aba2e1368d" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "token_price" ADD CONSTRAINT "FK_cd060cfc0599a02dc0700e974ad" FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "reward_strategy_token" ADD CONSTRAINT "FK_953843cfd6554d1689be3f3247d" FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "reward_strategy_token" ADD CONSTRAINT "FK_b2b382186d094c890351489b707" FOREIGN KEY ("strategy_id") REFERENCES "strategy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "supply_strategy_token" ADD CONSTRAINT "FK_61aab9df455bbaee8b64e42a8d3" FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "supply_strategy_token" ADD CONSTRAINT "FK_d919ffb22507135e7d6c22ed0c5" FOREIGN KEY ("strategy_id") REFERENCES "strategy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_de7e0d7203642a7985ad1e5bf97" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy_trailing_return" ADD CONSTRAINT "FK_bb5dc4a268269159ae01fdd1b23" FOREIGN KEY ("strategy_id") REFERENCES "strategy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy_risk_and_volatility" ADD CONSTRAINT "FK_435f54a5fdf030e0a25fb5d927c" FOREIGN KEY ("strategy_id") REFERENCES "strategy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy_tvl" ADD CONSTRAINT "FK_e03c752ccfae3e371afecdd0b7c" FOREIGN KEY ("strategy_id") REFERENCES "strategy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy_apr" ADD CONSTRAINT "FK_6d252afe3013aba340e3a0dc420" FOREIGN KEY ("strategy_id") REFERENCES "strategy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "index_growth" ADD CONSTRAINT "FK_d4e43099dd0bcacf135e5753203" FOREIGN KEY ("index_id") REFERENCES "index"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "index_risk_and_volatility" ADD CONSTRAINT "FK_f1ba6052949a8e1101fd5410027" FOREIGN KEY ("index_id") REFERENCES "index"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "index_total_return" ADD CONSTRAINT "FK_145320abcf08119a4d3675d08d5" FOREIGN KEY ("index_id") REFERENCES "index"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "index_trailing_return" ADD CONSTRAINT "FK_4f238863525bb126812413a9515" FOREIGN KEY ("index_id") REFERENCES "index"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy_total_return" ADD CONSTRAINT "FK_0eb68765c6573c5ee45addbb6d4" FOREIGN KEY ("strategy_id") REFERENCES "strategy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy_growth" ADD CONSTRAINT "FK_4c20a204a0be777d3be3960f722" FOREIGN KEY ("strategy_id") REFERENCES "strategy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy" ADD CONSTRAINT "FK_4345d7369dab8f18a0eeffbe17e" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy" ADD CONSTRAINT "FK_9adb40438a4107513cf873f1c15" FOREIGN KEY ("protocol_id") REFERENCES "protocol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy" ADD CONSTRAINT "FK_4bdd68f019375ddda4f0061b20a" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "strategy" ADD CONSTRAINT "FK_c6b1f3c01343c5f6ff969db0df0" FOREIGN KEY ("index_id") REFERENCES "index"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "category_total_return" ADD CONSTRAINT "FK_873676201734627474f093d2c8c" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "category_risk_and_volatility" ADD CONSTRAINT "FK_b1b1fe4dc1e5405ba6597135280" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "protocol_chain" ADD CONSTRAINT "FK_59b678de917d19dee8705383585" FOREIGN KEY ("protocol_id") REFERENCES "protocol"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "protocol_chain" ADD CONSTRAINT "FK_6d9cd1eb94173e8a5fc79b29abc" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "protocol_chain" DROP CONSTRAINT "FK_6d9cd1eb94173e8a5fc79b29abc"`)
    await queryRunner.query(`ALTER TABLE "protocol_chain" DROP CONSTRAINT "FK_59b678de917d19dee8705383585"`)
    await queryRunner.query(
      `ALTER TABLE "category_risk_and_volatility" DROP CONSTRAINT "FK_b1b1fe4dc1e5405ba6597135280"`,
    )
    await queryRunner.query(`ALTER TABLE "category_total_return" DROP CONSTRAINT "FK_873676201734627474f093d2c8c"`)
    await queryRunner.query(`ALTER TABLE "strategy" DROP CONSTRAINT "FK_c6b1f3c01343c5f6ff969db0df0"`)
    await queryRunner.query(`ALTER TABLE "strategy" DROP CONSTRAINT "FK_4bdd68f019375ddda4f0061b20a"`)
    await queryRunner.query(`ALTER TABLE "strategy" DROP CONSTRAINT "FK_9adb40438a4107513cf873f1c15"`)
    await queryRunner.query(`ALTER TABLE "strategy" DROP CONSTRAINT "FK_4345d7369dab8f18a0eeffbe17e"`)
    await queryRunner.query(`ALTER TABLE "strategy_growth" DROP CONSTRAINT "FK_4c20a204a0be777d3be3960f722"`)
    await queryRunner.query(`ALTER TABLE "strategy_total_return" DROP CONSTRAINT "FK_0eb68765c6573c5ee45addbb6d4"`)
    await queryRunner.query(`ALTER TABLE "index_trailing_return" DROP CONSTRAINT "FK_4f238863525bb126812413a9515"`)
    await queryRunner.query(`ALTER TABLE "index_total_return" DROP CONSTRAINT "FK_145320abcf08119a4d3675d08d5"`)
    await queryRunner.query(`ALTER TABLE "index_risk_and_volatility" DROP CONSTRAINT "FK_f1ba6052949a8e1101fd5410027"`)
    await queryRunner.query(`ALTER TABLE "index_growth" DROP CONSTRAINT "FK_d4e43099dd0bcacf135e5753203"`)
    await queryRunner.query(`ALTER TABLE "strategy_apr" DROP CONSTRAINT "FK_6d252afe3013aba340e3a0dc420"`)
    await queryRunner.query(`ALTER TABLE "strategy_tvl" DROP CONSTRAINT "FK_e03c752ccfae3e371afecdd0b7c"`)
    await queryRunner.query(
      `ALTER TABLE "strategy_risk_and_volatility" DROP CONSTRAINT "FK_435f54a5fdf030e0a25fb5d927c"`,
    )
    await queryRunner.query(`ALTER TABLE "strategy_trailing_return" DROP CONSTRAINT "FK_bb5dc4a268269159ae01fdd1b23"`)
    await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_de7e0d7203642a7985ad1e5bf97"`)
    await queryRunner.query(`ALTER TABLE "supply_strategy_token" DROP CONSTRAINT "FK_d919ffb22507135e7d6c22ed0c5"`)
    await queryRunner.query(`ALTER TABLE "supply_strategy_token" DROP CONSTRAINT "FK_61aab9df455bbaee8b64e42a8d3"`)
    await queryRunner.query(`ALTER TABLE "reward_strategy_token" DROP CONSTRAINT "FK_b2b382186d094c890351489b707"`)
    await queryRunner.query(`ALTER TABLE "reward_strategy_token" DROP CONSTRAINT "FK_953843cfd6554d1689be3f3247d"`)
    await queryRunner.query(`ALTER TABLE "token_price" DROP CONSTRAINT "FK_cd060cfc0599a02dc0700e974ad"`)
    await queryRunner.query(`ALTER TABLE "category_growth" DROP CONSTRAINT "FK_c433c29dd481bf639aba2e1368d"`)
    await queryRunner.query(`ALTER TABLE "category_trailing_return" DROP CONSTRAINT "FK_ae9920156277a1d224b2deeacc7"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_6d9cd1eb94173e8a5fc79b29ab"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_59b678de917d19dee870538358"`)
    await queryRunner.query(`DROP TABLE "protocol_chain"`)
    await queryRunner.query(`DROP TABLE "category_risk_and_volatility"`)
    await queryRunner.query(`DROP TYPE "public"."category_risk_and_volatility_period_enum"`)
    await queryRunner.query(`DROP TABLE "category"`)
    await queryRunner.query(`DROP TABLE "category_total_return"`)
    await queryRunner.query(`DROP TYPE "public"."category_total_return_quartile_rank_enum"`)
    await queryRunner.query(`DROP TABLE "strategy"`)
    await queryRunner.query(`DROP TABLE "strategy_growth"`)
    await queryRunner.query(`DROP TABLE "strategy_total_return"`)
    await queryRunner.query(`DROP TYPE "public"."strategy_total_return_quartile_rank_enum"`)
    await queryRunner.query(`DROP TABLE "index"`)
    await queryRunner.query(`DROP TABLE "index_trailing_return"`)
    await queryRunner.query(`DROP TYPE "public"."index_trailing_return_quartile_rank_enum"`)
    await queryRunner.query(`DROP TYPE "public"."index_trailing_return_period_enum"`)
    await queryRunner.query(`DROP TABLE "index_total_return"`)
    await queryRunner.query(`DROP TYPE "public"."index_total_return_quartile_rank_enum"`)
    await queryRunner.query(`DROP TABLE "index_risk_and_volatility"`)
    await queryRunner.query(`DROP TYPE "public"."index_risk_and_volatility_period_enum"`)
    await queryRunner.query(`DROP TABLE "index_growth"`)
    await queryRunner.query(`DROP TABLE "strategy_apr"`)
    await queryRunner.query(`DROP TABLE "strategy_tvl"`)
    await queryRunner.query(`DROP TABLE "strategy_risk_and_volatility"`)
    await queryRunner.query(`DROP TYPE "public"."strategy_risk_and_volatility_return_vs_category_enum"`)
    await queryRunner.query(`DROP TYPE "public"."strategy_risk_and_volatility_risk_vs_category_enum"`)
    await queryRunner.query(`DROP TYPE "public"."strategy_risk_and_volatility_period_enum"`)
    await queryRunner.query(`DROP TABLE "strategy_trailing_return"`)
    await queryRunner.query(`DROP TYPE "public"."strategy_trailing_return_quartile_rank_enum"`)
    await queryRunner.query(`DROP TYPE "public"."strategy_trailing_return_period_enum"`)
    await queryRunner.query(`DROP TABLE "protocol"`)
    await queryRunner.query(`DROP TABLE "chain"`)
    await queryRunner.query(`DROP TABLE "token"`)
    await queryRunner.query(`DROP TABLE "supply_strategy_token"`)
    await queryRunner.query(`DROP TABLE "reward_strategy_token"`)
    await queryRunner.query(`DROP TABLE "token_price"`)
    await queryRunner.query(`DROP TABLE "category_growth"`)
    await queryRunner.query(`DROP TABLE "category_trailing_return"`)
    await queryRunner.query(`DROP TYPE "public"."category_trailing_return_quartile_rank_enum"`)
    await queryRunner.query(`DROP TYPE "public"."category_trailing_return_period_enum"`)
  }
}
