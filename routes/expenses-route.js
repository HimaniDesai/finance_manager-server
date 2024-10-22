import express from "express";
const router = express.Router();

import {getExpensesByMonth} from '../controllers/expenses-controller.js'

router.route('/:user_id/:month/:year')
    .get(getExpensesByMonth)

export default router;