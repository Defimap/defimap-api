import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateStrategy1680084776706 implements MigrationInterface {
  name = 'updateStrategy1680084776706'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "strategy" ADD "verify" boolean NOT NULL DEFAULT false`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "strategy" DROP COLUMN "verify"`)
  }
}
