
import express from 'express'

const router = express.Router()


router.get('/', (req, res) => {
  res.json({ status: 'healthy' });
});

export default router;