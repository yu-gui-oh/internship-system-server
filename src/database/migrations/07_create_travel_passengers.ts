import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('travel_passengers', table => {
        table.increments('id').primary();
        table.integer('travel_id')
            .notNullable()
            .references('id')
            .inTable('travels');
        table.integer('passenger_id')
            .notNullable()
            .references('id')
            .inTable('passengers');
        table.boolean('companion').defaultTo(false);
        table.string('destination').notNullable();
        table.string('observation');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('travel_passengers');
}