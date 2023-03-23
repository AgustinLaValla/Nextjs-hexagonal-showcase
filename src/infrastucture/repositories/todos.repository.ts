import { TodosRepository } from "@/domain/services";
import { Todo } from "@/domain/models/Todo/Todo.model";
import { http } from "../adapters";
import { todosApi } from "../apis";

export const todosRepository: TodosRepository = {
  getTodos: async () => await http.get<Todo[]>(todosApi, ''),
  getTodo: async (id: string) => await http.get<Todo>(todosApi, `/${id}`),
  createTodo: async (todo: Omit<Todo, 'id'>) => await http.post<Todo>(todosApi, '', todo),
  updateTodo: async (todo: Todo) => await http.put<Todo>(todosApi, `/${todo.id}`, todo),
  deleteTodo: async (id: string) => await http.delete<Todo>(todosApi, `/${id}`)
} 