import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('travels', table => {
        table.increments('id').primary();
        table.date('departure_date');
        table.time('departure_hour');
        table.string('destination')
            .notNullable()
            .references('id')
            .inTable('destinations');
        table.string('vehicle')
            .notNullable()
            .references('id')
            .inTable('vehicles');
        table.string('driver')
            .notNullable()
            .references('id')
            .inTable('drivers');
        table.date('return_date');
        table.time('return_hour');
        table.integer('daily_payout').notNullable();
        table.integer('absent_hours').notNullable();
        table.string('status').notNullable();
        table.string('observation');
        table.integer('total_seats').defaultTo(0);
        table.integer('booked_seats').defaultTo(0);
        table.integer('vacant_seats').defaultTo(0);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('travels');
}