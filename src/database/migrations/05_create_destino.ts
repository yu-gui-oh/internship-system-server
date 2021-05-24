import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('destinations', table => {
        table.increments('id').primary();
        table.string('destination').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('destinations');
}