import { MigrationInterface, QueryRunner } from "typeorm";

export class mig1662815985727 implements MigrationInterface {
    name = 'mig1662815985727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expense\` DROP COLUMN \`comments\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expense\` ADD \`comments\` varchar(255) NULL`);
    }

}
