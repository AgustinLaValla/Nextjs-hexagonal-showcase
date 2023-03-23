import { Model } from 'mongoose';
import { Todo } from '@/domain/models';
import { ErrorWidthCode } from '@/domain/models/Error/Error.model';
import { ITodo } from '@/infrastucture/database/schemas';
import { MongoDocument } from '@/infrastucture/database/common/mongoDocument.interface';
import { TodosRepository } from '@/domain/services';

type TodoDocument = MongoDocument<ITodo>

const mapToDomain = (todo: TodoDocument): Todo => ({
  description: todo.description,
  isCompleted: todo.isCompleted,
  id: todo._id
})

export const todosServerRepository = (todoModel: Model<ITodo>): TodosRepository => ({
  getTodos: async () => await (await todoModel.find()).map(todo => mapToDomain(todo)),

  getTodoByID: async (id: string) => {
    const todo = await todoModel.findById(id);

    if (!todo) throw new ErrorWidthCode('Not found', 404);

    return mapToDomain(todo);
  },
  createTodo: async (todo: Omit<Todo, 'id'>) => {
    const newTodo = new todoModel(todo);
    await newTodo.save();
    return mapToDomain(newTodo);
  },

  updateTodo: async (todo: Todo) => {
    const todoToUpdate = await todoModel.findById(todo.id);

    if (!todoToUpdate) throw new ErrorWidthCode('Not found', 404);

    const updatedTodo = await todoModel.findByIdAndUpdate(todo.id, todo, { new: true }) as TodoDocument;

    return mapToDomain(updatedTodo);
  },
  deleteTodo: async (id: string) => {
    const todo = await todoModel.findByIdAndRemove(id)

    if (!todo) throw new ErrorWidthCode('Not found', 404);

    return mapToDomain(todo);
  }
})