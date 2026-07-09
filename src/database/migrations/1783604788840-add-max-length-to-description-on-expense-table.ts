import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMaxLengthToDescriptionOnExpenseTable1783604788840 implements MigrationInterface {
    name = 'AddMaxLengthToDescriptionOnExpenseTable1783604788840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expenses\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`expenses\` ADD \`description\` varchar(500) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expenses\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`expenses\` ADD \`description\` text NULL`);
    }

}
