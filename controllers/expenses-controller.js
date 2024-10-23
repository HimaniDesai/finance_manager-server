import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const getExpensesByMonth = async(req, res) => {
    const {month} = req.params;
    const {year} = req.params;
    const {user_id} = req.params;
    try {
        const expenseItem = await knex('expenses')
        .whereRaw('Month(expense_date) = ?', [month])
        .whereRaw('YEAR(expense_date) = ?', [year])
        .andWhere({user_id : user_id});

        if (!expenseItem) {
            return res.status(404).json({ message: "Expenses for "+ month +" not found." });
        }

        res.status(200).json(expenseItem);
    }catch (error) {
    res.status(400).send(`Error getting expense item: ${error}`);
  }
}

export const getExpensesByYear = async(req, res) => {
    const {year} = req.params;
    const {user_id} = req.params;
    try {
        const expenseItem = await knex('expenses')
        .whereRaw('YEAR(expense_date) = ?', [year])
        .andWhere({user_id : user_id});

        if (!expenseItem) {
            return res.status(404).json({ message: "Expenses for "+ year +" not found." });
        }

        res.status(200).json(expenseItem);
    }catch (error) {
    res.status(400).send(`Error getting expense item: ${error}`);
  }
}