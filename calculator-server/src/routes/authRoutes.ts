import express from 'express';
import { signup, login, sessionActivity } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/session-activity', sessionActivity);

export default router;
