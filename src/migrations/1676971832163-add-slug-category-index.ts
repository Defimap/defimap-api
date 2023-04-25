import { MigrationInterface, QueryRunner } from 'typeorm'

export class addSlugCategoryIndex1676971832163 implements MigrationInterface {
  name = 'addSlugCategoryIndex1676971832163'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "index" ADD "slug" character varying`)
    await queryRunner.query(`ALTER TABLE "category" ADD "slug" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "slug"`)
    await queryRunner.query(`ALTER TABLE "index" DROP COLUMN "slug"`)
  }
}
