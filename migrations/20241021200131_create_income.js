/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return await knex.schema.createTable('incomes', (table) => {
        table.increments('id').primary();
        table.double('refunds').notNullable().defaultTo(0.0000);
        table.double('salary').notNullable().defaultTo(0.0000);
        table.double('prize_money').notNullable().defaultTo(0.0000);
        table.double('returns').notNullable().defaultTo(0.0000);
        table.double('gifts').notNullable().defaultTo(0.0000);
        table.dateTime('income_date').notNullable().defaultTo(knex.fn.now());
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.integer('user_id').unsigned().references('id').inTable('users');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('incomes');
};
