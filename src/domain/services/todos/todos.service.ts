import { Todo } from "@/domain/models";
import { TodosRepository } from "./TodosRepository.interface";

type TodoID = string;

export const todosService = (todosRepository: TodosRepository) => ({
  getTodos: (userId?: string) => todosRepository.getTodos(userId),
  getTodoByID: (id: TodoID) => todosRepository.getTodoByID(id),
  createTodo: (todo: Omit<Todo, 'id'>) => todosRepository.createTodo(todo),
  updateTodo: (todo: Todo) => todosRepository.updateTodo(todo),
  deleteTodo: (id: TodoID) => todosRepository.deleteTodo(id)
});
