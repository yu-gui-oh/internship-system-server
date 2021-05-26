import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('passengers', table => {
        table.increments('id').primary();
        table.dateTime('registration_date').defaultTo(knex.fn.now()).notNullable();
        table.string('name').notNullable();
        table.string('cpf').notNullable();
        table.string('rg').notNullable();
        table.string('issuing_body').notNullable();
        table.date('birth_date').notNullable();
        table.string('cep').notNullable();
        table.string('address').notNullable();
        table.string('number').notNullable();
        table.string('neighbourhood').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('complement');
        table.string('phone');
        table.string('cell_phone').notNullable();
        table.string('observation');
        table.boolean('status').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('passengers');
}