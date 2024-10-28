import express from "express";
const router = express.Router();

import {getIncomesByMonth, getIncomesByYear, getIncomeById, edit, add, deleteIncome} from '../controllers/incomes-controller.js'

router.route('/:user_id/:month/:year')
    .get(getIncomesByMonth)

router.route('/:user_id/:year')
    .get(getIncomesByYear)
router.route('/:id')
    .get(getIncomeById)
    .put(edit)
    .delete(deleteIncome)
router.route('/')
    .post(add)
export default router;