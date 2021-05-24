import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('vehicles', table => {
        table.increments('id').primary();
        table.string('plate').notNullable();
        table.string('vehicle').notNullable();
        table.string('type').notNullable();
        table.date('due_date').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('vehicles');
}