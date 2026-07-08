import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1783477257689 implements MigrationInterface {
    name = 'InitMigration1783477257689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` (\`uuid\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`expenses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`amount\` decimal(10,2) NOT NULL, \`category\` enum ('Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Others') NOT NULL, \`expense_date\` date NOT NULL, \`user_id\` int NULL, UNIQUE INDEX \`IDX_cc8ea0027b8bf74019faa5b043\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`expenses\` ADD CONSTRAINT \`FK_49a0ca239d34e74fdc4e0625a78\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expenses\` DROP FOREIGN KEY \`FK_49a0ca239d34e74fdc4e0625a78\``);
        await queryRunner.query(`DROP INDEX \`IDX_cc8ea0027b8bf74019faa5b043\` ON \`expenses\``);
        await queryRunner.query(`DROP TABLE \`expenses\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
