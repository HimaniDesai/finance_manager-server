import express from "express";
const router = express.Router();

import {getExpensesByMonth, getExpensesByYear} from '../controllers/expenses-controller.js'

router.route('/:user_id/:month/:year')
    .get(getExpensesByMonth)
router.route('/:user_id/:year')
    .get(getExpensesByYear)

export default router;