import { MigrationInterface, QueryRunner } from "typeorm";

export class mig1662814149094 implements MigrationInterface {
    name = 'mig1662814149094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expense\` ADD \`comments\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expense\` DROP COLUMN \`comments\``);
    }

}
