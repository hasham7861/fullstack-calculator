import { Request, Response } from 'express';
import { MathExpressionsHistory } from '../entities/mathExpressionsHistory.entity'
import { Types } from 'mongoose';

export const fetchHistory = async (req: Request, res: Response) => {
  
  const userId = req.session.userId;

  if(!userId) return res.status(401).json({ message: 'Unauthorized.' });

  try {
    const userHistory = await MathExpressionsHistory.findOne({ userId });
  
    if (!userHistory) {
      res.status(404).json({ message: 'User history not found.' });
    } else {
      res.status(200).json(userHistory.history);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching history.' });
  }
}


export const addExpression = async (req: Request, res: Response) => {
  const userId = req.session.userId;
  const newExpression = req.body.expression;

  try {
    const userIdObjectId = new Types.ObjectId(userId);
    let userHistory = await MathExpressionsHistory.findOne({ userId: userIdObjectId });

    if (!userHistory) {
      await MathExpressionsHistory.create({ userId: userId, history: [newExpression] });
    } else {

      const updatedHistory = [...userHistory.history, newExpression];
      await MathExpressionsHistory.updateOne({ userId: userId }, { history: updatedHistory });
    }

    return res.status(200).json({ message: 'Expression added successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while adding the expression.' });
  }
};
