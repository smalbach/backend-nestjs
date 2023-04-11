import {MigrationInterface, QueryRunner} from "typeorm";

export class changerelation1680986201993 implements MigrationInterface {
    name = 'changerelation1680986201993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventories" DROP CONSTRAINT "FK_bd0f7a488fdade63136688aea2a"`);
        await queryRunner.query(`ALTER TABLE "inventories" DROP CONSTRAINT "REL_bd0f7a488fdade63136688aea2"`);
        await queryRunner.query(`ALTER TABLE "inventories" ADD CONSTRAINT "FK_bd0f7a488fdade63136688aea2a" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventories" DROP CONSTRAINT "FK_bd0f7a488fdade63136688aea2a"`);
        await queryRunner.query(`ALTER TABLE "inventories" ADD CONSTRAINT "REL_bd0f7a488fdade63136688aea2" UNIQUE ("company_id")`);
        await queryRunner.query(`ALTER TABLE "inventories" ADD CONSTRAINT "FK_bd0f7a488fdade63136688aea2a" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
