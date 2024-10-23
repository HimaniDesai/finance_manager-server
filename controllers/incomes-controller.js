import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const getIncomesByMonth = async(req, res) => {
    const {month} = req.params;
    const {year} = req.params;
    const {user_id} = req.params;
    try {
        const incomeItem = await knex('incomes')
        .whereRaw('Month(income_date) = ?', [month])
        .whereRaw('YEAR(income_date) = ?', [year])
        .andWhere({user_id : user_id});

        if (!incomeItem) {
            return res.status(404).json({ message: "Incomes for "+ month +" not found." });
        }

        res.status(200).json(incomeItem);
    }catch (error) {
    res.status(400).send(`Error getting income item: ${error}`);
  }
}

export const getIncomesByYear = async(req, res) => {
    const {year} = req.params;
    const {user_id} = req.params;
    try {
        const incomeItem = await knex('incomes')
        .whereRaw('YEAR(income_date) = ?', [year])
        .andWhere({user_id : user_id});

        if (!incomeItem) {
            return res.status(404).json({ message: "Incomes for "+ year +" not found." });
        }

        res.status(200).json(incomeItem);
    }catch (error) {
    res.status(400).send(`Error getting income item: ${error}`);
  }
}