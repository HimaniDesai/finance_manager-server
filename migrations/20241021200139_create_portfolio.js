/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return await knex.schema.createTable('portfolios', (table) => {
        table.increments('id').primary();
        table.string('stock').notNullable();
        table.double('amount').notNullable().defaultTo(0.0000);
        table.dateTime('purchase_date').notNullable().defaultTo(knex.fn.now());
        table.dateTime('sell_date');
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
    return knex.schema.dropTable('portfolios');
};
