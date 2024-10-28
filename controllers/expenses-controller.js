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

export const getExpenseById = async(req, res) => {
    const {id} = req.params;
    try {
        const expenseItem = await knex('expenses')
        .where({id : id});

        if (!expenseItem) {
            return res.status(404).json({ message: "Expenses for "+ id +" not found." });
        }

        res.status(200).json(expenseItem);
    }catch (error) {
    res.status(400).send(`Error getting expense item: ${error}`);
  }
}

//PUT/UPDATE existing item in the expenses table
export const edit = async (req,res) => {
    const { expense_date, bills_and_utilities, grocery_and_food, insurances, tax, investments, other_purchases} = req.body;
    let newDate = dateFormat(expense_date)
    console.log(newDate)
    
   
    if (isNaN(bills_and_utilities) || Number(bills_and_utilities) < 0
        || isNaN(grocery_and_food) || Number(grocery_and_food) < 0
        || isNaN(insurances) || Number(insurances) < 0
        || isNaN(tax) || Number(tax) < 0
        || isNaN(investments) || Number(investments) < 0
        || isNaN(other_purchases) || Number(other_purchases) < 0){
      return res.status(400).json({
        message: "Expense values must be a number"
      })
    }
  
    try {
      const updatedExpense = await knex("expenses")
        .where({ id : req.params.id})
        .update({
            bills_and_utilities,
            grocery_and_food,
            insurances,
            tax,
            investments,
            other_purchases,
            expense_date:newDate
        });
      
      if (!updatedExpense) {
        return res.status(404).json({
          message: `Could not find expense: ${req.params.id}`
        });
      }
  
      const newItem = await knex("expenses")
        .where({ id: req.params.id })
        .first();
      
      res.status(200).json(newItem);
    } catch (error) {
      res.status(500).json({
        message: `Error updating expense item: ${error}`
      });
    }
  };

  const dateFormat = function(newDate) {
    let d = new Date(newDate)
    return d.getFullYear() + '-'+(d.getMonth()+1)+'-'+d.getDate()
  }

  //POST new expense item
export const add = async (req, res) => {
    const { user_id, expense_date, bills_and_utilities, grocery_and_food, insurances, tax, investments, other_purchases } = req.body;
    let newDate = dateFormat(expense_date)
    if (isNaN(bills_and_utilities) || Number(bills_and_utilities) < 0
        || isNaN(grocery_and_food) || Number(grocery_and_food) < 0
        || isNaN(insurances) || Number(insurances) < 0
        || isNaN(tax) || Number(tax) < 0
        || isNaN(investments) || Number(investments) < 0
        || isNaN(other_purchases) || Number(other_purchases) < 0) {
      return res.status(400).json({
        message: "Expense value must be a valid number"
      });
    }
  
    try {
      const result = await knex("expenses").insert({
        id: null,
        user_id,
        bills_and_utilities,
        grocery_and_food,
        insurances,
        tax,
        investments,
        other_purchases,
        expense_date:newDate
      });
  
      const [id] = result;
      const newRecord = await knex("expenses")
        .where({ id })
        .first();
  
      res.status(201).json(newRecord);
    } catch (error) {
      res.status(500).json({
        message: `Unable to create new expense item: ${error}`
      });
    }
  };

//deleting an item from incomes
export const deleteExpense = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedCount = await knex("expenses")
        .where({ id })
        .delete();
  
      if (deletedCount === 0) {
        return res.status(404).json({
          message: "Item not found"
        });
      }
  
      res.status(200).json({
        message: "Item deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting expenses item:", error);
      res.status(500).json({
        message: "Error deleting expenses item"
      });
    }
  };
  