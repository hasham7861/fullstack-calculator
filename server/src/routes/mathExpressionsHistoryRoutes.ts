import express from 'express';
import { addExpression, fetchHistory } from '../controllers/mathExpressionsHistoryController';

const router = express.Router();

router.get('/fetch-history', fetchHistory);
router.post('/add-expression', addExpression);

export default router;
