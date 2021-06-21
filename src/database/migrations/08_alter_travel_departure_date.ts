import { Knex } from 'knex';

export async function up(knex: Knex) {
    await knex.schema.table('travels', function(table) {
        table.dropColumn('departure_date')
    })

    await knex.schema.table('travels', function(table) {
        table.string('departure_date')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('travels');
}