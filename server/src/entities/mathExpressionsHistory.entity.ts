import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user.entity';

interface IMathExpressionsHistory extends Document {
  userId: IUser['_id'];
  history: string[];
}

const mathExpressionsHistorySchema: Schema<IMathExpressionsHistory> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  history: [{ type: String }],
});

export const MathExpressionsHistory = mongoose.model<IMathExpressionsHistory>('MathExpressionsHistory', mathExpressionsHistorySchema);