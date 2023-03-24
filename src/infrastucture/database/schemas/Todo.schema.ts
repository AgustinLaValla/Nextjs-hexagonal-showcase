import { Schema, model, Document, models, Model } from 'mongoose';

export interface ITodo extends Document {
  description: string;
  isCompleted: boolean;
  userId?: string;
}

const todoSchema = new Schema<ITodo>({
  description: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

export const Todo = (models.Todo || model<ITodo>('Todo', todoSchema)) as Model<ITodo>;