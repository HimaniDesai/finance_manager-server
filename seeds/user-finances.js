/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
import userData from '../seed-data/users.js'
import expenseData from '../seed-data/expenses.js'
import incomeData from '../seed-data/incomes.js'
import portfolioData from '../seed-data/portfolios.js'

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('expenses').del();
  await knex('incomes').del();
  await knex('portfolios').del();
  await knex('users').del();

  //Inserts data int the tables from JSON files
  await knex('users').insert(userData);
  await knex('expenses').insert(expenseData);
  await knex('incomes').insert(incomeData);
  await knex('portfolios').insert(portfolioData);
};
