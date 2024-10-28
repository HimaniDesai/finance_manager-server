import express from "express";
const router = express.Router();

import {getIncomesByMonth, getIncomesByYear, getIncomeById, edit, add} from '../controllers/incomes-controller.js'

router.route('/:user_id/:month/:year')
    .get(getIncomesByMonth)

router.route('/:user_id/:year')
    .get(getIncomesByYear)
router.route('/:id')
    .get(getIncomeById)
    .put(edit)
router.route('/')
    .post(add)
export default router;