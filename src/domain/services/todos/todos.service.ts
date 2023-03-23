import { Todo } from "@/domain/models";
import { TodosRepository } from "./TodosRepository.interface";

type TodoID = string;

export const todosService = (todosRepository: TodosRepository) => ({
  getTodos: () => todosRepository.getTodos(),
  getTodoByID: (id: TodoID) => todosRepository.getTodoByID(id),
  createTodo: (todo: Omit<Todo, '_id'>) => todosRepository.createTodo(todo),
  updateTodo: (todo: Todo) => todosRepository.updateTodo(todo),
  deleteTodo: (id: TodoID) => todosRepository.deleteTodo(id)
});
