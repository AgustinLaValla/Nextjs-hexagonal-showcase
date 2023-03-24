import { Model } from 'mongoose';
import { Todo } from '@/domain/models';
import { ErrorWidthCode } from '@/domain/models/Error/Error.model';
import { ITodo } from '@/infrastucture/database/schemas';
import { MongoDocument } from '@/infrastucture/database/common/mongoDocument.interface';
import { TodosRepository } from '@/domain/services';
import { db } from '@/infrastucture/database';

type TodoDocument = MongoDocument<ITodo>

const mapToDomain = (todo: TodoDocument): Todo => ({
  description: todo.description,
  isCompleted: todo.isCompleted,
  id: todo._id,
  userId: todo.userId as string
})

export const todosServerRepository = (todoModel: Model<ITodo>): TodosRepository => ({
  getTodos: async () => {

    await db.connect();
    const todos = await todoModel.find();

    await db.disconnect();

    return todos.map(todo => mapToDomain(todo));

  },

  getTodoByID: async (id: string) => {

    await db.connect();
    const todo = await todoModel.findById(id);

    await db.disconnect();

    if (!todo) throw new ErrorWidthCode('Not found', 404);


    return mapToDomain(todo);
  },
  createTodo: async (todo: Omit<Todo, 'id'>) => {
    await db.connect();
    const newTodo = new todoModel(todo);
    await newTodo.save();
    await db.disconnect();
    return mapToDomain(newTodo);
  },

  updateTodo: async (todo: Todo) => {
    await db.connect();
    const todoToUpdate = await todoModel.findById(todo.id);

    if (!todoToUpdate) {
      await db.disconnect();
      throw new ErrorWidthCode('Not found', 404)
    };

    const updatedTodo = await todoModel.findByIdAndUpdate(todo.id, todo, { new: true }) as TodoDocument;
    await db.disconnect();

    return mapToDomain(updatedTodo);
  },
  deleteTodo: async (id: string) => {
    await db.connect();
    const todo = await todoModel.findByIdAndRemove(id)

    await db.disconnect();
    if (!todo) throw new ErrorWidthCode('Not found', 404);

    return mapToDomain(todo);
  }
})