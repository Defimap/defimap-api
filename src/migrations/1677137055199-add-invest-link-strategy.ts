import { MigrationInterface, QueryRunner } from 'typeorm'

export class addInvestLinkStrategy1677137055199 implements MigrationInterface {
  name = 'addInvestLinkStrategy1677137055199'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "strategy" ADD "invest_link" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "strategy" DROP COLUMN "invest_link"`)
  }
}
