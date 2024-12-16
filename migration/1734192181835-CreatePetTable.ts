import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePetTable1734192181835 implements MigrationInterface  {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'pet',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true
                },
                {
                    name: 'owner_id',
                    type: 'varchar',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'behaviour',
                    type: 'varchar',
                },
                {
                    name: 'info_about',
                    type: 'varchar',
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['owner_id'],
                    referencedTableName: 'owner',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE'
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('owner');
    }

}
