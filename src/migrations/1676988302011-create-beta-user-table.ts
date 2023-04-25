import { MigrationInterface, QueryRunner } from 'typeorm'

export class createBetaUserTable1676988302011 implements MigrationInterface {
  name = 'createBetaUserTable1676988302011'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "beta_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, CONSTRAINT "UQ_7ba2e27ca8ecdb0bba1b976d61a" UNIQUE ("email"), CONSTRAINT "PK_6507d1d5b5d3594dd016d9966a4" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "beta_user"`)
  }
}
