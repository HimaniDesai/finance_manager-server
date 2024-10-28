/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return await knex.schema.createTable('expenses', (table) => {
        table.increments('id').primary();
        table.double('bills_and_utilities').notNullable().defaultTo(0.0000);
        table.double('grocery_and_food').notNullable().defaultTo(0.0000);
        table.double('insurances').notNullable().defaultTo(0.0000);
        table.double('tax').notNullable().defaultTo(0.0000);
        table.double('investments').notNullable().defaultTo(0.0000);
        table.double('other_purchases').notNullable().defaultTo(0.0000);
        table.timestamp('expense_date').notNullable().defaultTo(knex.fn.now());
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
    return knex.schema.dropTable('expenses');
};
