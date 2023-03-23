import { Schema, model, Document } from 'mongoose';

export interface ITodo extends Document {
  description: string;
  isCompleted: boolean;
}

const todoSchema = new Schema<ITodo>({
  description: { type: String, required: true },
  isCompleted: { type: Boolean, required: true }
})

export const Todo = model<ITodo>('Todo', todoSchema);