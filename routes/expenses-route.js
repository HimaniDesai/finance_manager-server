import express from "express";
const router = express.Router();

import {getExpensesByMonth, getExpensesByYear, getExpenseById, edit, add} from '../controllers/expenses-controller.js'

router.route('/:user_id/:month/:year')
    .get(getExpensesByMonth)
router.route('/:user_id/:year')
    .get(getExpensesByYear)
router.route('/:id')
    .get(getExpenseById)
    .put(edit)
router.route('/')
    .post(add)


export default router;