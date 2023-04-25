import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateStrategy1680163844012 implements MigrationInterface {
  name = 'updateStrategy1680163844012'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "strategy" ADD "data_update" TIMESTAMP DEFAULT now()`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "strategy" DROP COLUMN "data_update"`)
  }
}
