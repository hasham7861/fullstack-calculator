import express from 'express';
import { signup, login, sessionActivity, logout } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/session-activity', sessionActivity);
router.post('/logout', logout);

export default router;
