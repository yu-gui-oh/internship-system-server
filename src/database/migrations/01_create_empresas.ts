import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('company', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('address').notNullable();
        table.string('neighbourhood').notNullable();
        table.string('cep').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('statual_inscription').notNullable();
        table.string('cnpj').notNullable();
        table.string('phone').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('company');
}