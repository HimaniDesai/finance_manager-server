import express from "express";
const router = express.Router();

import {getIncomesByMonth, getIncomesByYear} from '../controllers/incomes-controller.js'

router.route('/:user_id/:month/:year')
    .get(getIncomesByMonth)

router.route('/:user_id/:year')
    .get(getIncomesByYear)

export default router;