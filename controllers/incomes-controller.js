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

export const getIncomeById = async(req, res) => {
    const {id} = req.params;
    try {
        const incomeItem = await knex('incomes')
        .where({id : id});

        if (!incomeItem) {
            return res.status(404).json({ message: "Incomes for "+ id +" not found." });
        }

        res.status(200).json(incomeItem);
    }catch (error) {
    res.status(400).send(`Error getting income item: ${error}`);
  }
}

//PUT/UPDATE existing item in the inventories table
export const edit = async (req,res) => {
    const { income_date, refunds, returns, salary, prize_money, gifts} = req.body;
    let newDate = dateFormat(income_date)
   console.log(newDate)
    if (isNaN(refunds) || Number(refunds) < 0
        || isNaN(returns) || Number(returns) < 0
        || isNaN(prize_money) || Number(prize_money) < 0
        || isNaN(salary) || Number(salary) < 0
        || isNaN(gifts) || Number(gifts) < 0){
      return res.status(400).json({
        message: "Income values must be a number"
      })
    }
  
    try {
      const updatedIncome = await knex("incomes")
        .where({ id : req.params.id})
        .update({
            refunds,
            returns,
            prize_money,
            salary,
            gifts,
            income_date:newDate
        });
      
      if (!updatedIncome) {
        return res.status(404).json({
          message: `Could not find income: ${req.params.id}`
        });
      }
  
      const newItem = await knex("incomes")
        .where({ id: req.params.id })
        .first();
      
      res.status(200).json(newItem);
    } catch (error) {
      res.status(500).json({
        message: `Error updating income item: ${error}`
      });
    }
  };

  const dateFormat = function(newDate) {
    let d = new Date(newDate)
    return d.getFullYear() + '-'+(d.getMonth()+1)+'-'+d.getDate()
  }

  //POST new income item
  export const add = async (req, res) => {
    const { user_id, income_date, refunds, returns, salary, prize_money, gifts } = req.body;
    let newDate = dateFormat(income_date)
    if (isNaN(refunds) || Number(refunds) < 0
        || isNaN(returns) || Number(returns) < 0
        || isNaN(prize_money) || Number(prize_money) < 0
        || isNaN(salary) || Number(salary) < 0
        || isNaN(gifts) || Number(gifts) < 0) {
      return res.status(400).json({
        message: "Income value must be a valid number"
      });
    }
  
    try {
      const result = await knex("incomes").insert({
        id: null,
        user_id,
        refunds,
        returns,
        prize_money,
        salary,
        gifts,
        income_date:newDate
      });
  
      const [id] = result;
      const newRecord = await knex("incomes")
        .where({ id })
        .first();
  
      res.status(201).json(newRecord);
    } catch (error) {
      res.status(500).json({
        message: `Unable to create new income item: ${error}`
      });
    }
  };