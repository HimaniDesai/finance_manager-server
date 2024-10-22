import express from "express";
const router = express.Router();

import {getIncomesByMonth} from '../controllers/incomes-controller.js'

router.route('/:user_id/:month/:year')
    .get(getIncomesByMonth)

export default router;