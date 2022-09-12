import { MigrationInterface, QueryRunner } from "typeorm";

export class mig1662813934885 implements MigrationInterface {
    name = 'mig1662813934885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`income\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL, \`comments\` varchar(255) NULL, \`user_id\` int NOT NULL, \`receivedOn\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reminder\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`startfrom\` datetime NOT NULL, \`occur\` varchar(255) NOT NULL, \`notes\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`isactive\` tinyint NOT NULL DEFAULT 1, \`avator\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`expense\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`amount\` int NOT NULL, \`notes\` varchar(255) NULL, \`user_id\` int NOT NULL, \`category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`expense_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`isactive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`income\` ADD CONSTRAINT \`FK_934ccd95e5557152309f111df82\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reminder\` ADD CONSTRAINT \`FK_df1c02b9f9866d6e08c3ee2f348\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`expense\` ADD CONSTRAINT \`FK_8aed1abe692b31639ccde1b0416\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`expense\` ADD CONSTRAINT \`FK_478b68a9314d8787fb3763a2298\` FOREIGN KEY (\`category_id\`) REFERENCES \`expense_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`expense_category\` ADD CONSTRAINT \`FK_c994a4a00b9cd3913cd99a48e03\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expense_category\` DROP FOREIGN KEY \`FK_c994a4a00b9cd3913cd99a48e03\``);
        await queryRunner.query(`ALTER TABLE \`expense\` DROP FOREIGN KEY \`FK_478b68a9314d8787fb3763a2298\``);
        await queryRunner.query(`ALTER TABLE \`expense\` DROP FOREIGN KEY \`FK_8aed1abe692b31639ccde1b0416\``);
        await queryRunner.query(`ALTER TABLE \`reminder\` DROP FOREIGN KEY \`FK_df1c02b9f9866d6e08c3ee2f348\``);
        await queryRunner.query(`ALTER TABLE \`income\` DROP FOREIGN KEY \`FK_934ccd95e5557152309f111df82\``);
        await queryRunner.query(`DROP TABLE \`expense_category\``);
        await queryRunner.query(`DROP TABLE \`expense\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`reminder\``);
        await queryRunner.query(`DROP TABLE \`income\``);
    }

}
