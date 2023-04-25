import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateSlugCategoryIndex1676973821445 implements MigrationInterface {
  name = 'updateSlugCategoryIndex1676973821445'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "index" ALTER COLUMN "slug" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "index" ADD CONSTRAINT "UQ_b892212b7966ccaa0ba7462da34" UNIQUE ("slug")`)
    await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "slug" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug")`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70"`)
    await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "slug" DROP NOT NULL`)
    await queryRunner.query(`ALTER TABLE "index" DROP CONSTRAINT "UQ_b892212b7966ccaa0ba7462da34"`)
    await queryRunner.query(`ALTER TABLE "index" ALTER COLUMN "slug" DROP NOT NULL`)
  }
}
