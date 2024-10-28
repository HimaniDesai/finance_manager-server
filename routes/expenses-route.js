import express from "express";
const router = express.Router();

import {getExpensesByMonth, getExpensesByYear, getExpenseById, edit} from '../controllers/expenses-controller.js'

router.route('/:user_id/:month/:year')
    .get(getExpensesByMonth)
router.route('/:user_id/:year')
    .get(getExpensesByYear)
router.route('/:id')
    .get(getExpenseById)
    .put(edit)


export default router;