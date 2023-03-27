import { TodosRepository } from "@/domain/services";
import { Todo } from "@/domain/models/Todo/Todo.model";
import { http } from "../../adapters";
import { todosApi } from "../../apis";

export const todosClientRepository: TodosRepository = {
  getTodos: () => http.get<Todo[]>(todosApi, ''),
  getTodoByID: (id: string) => http.get<Todo>(todosApi, `/${id}`),
  createTodo: (todo: Omit<Todo, 'id'>) => http.post<Todo>(todosApi, '', todo),
  updateTodo: (todo: Todo) => http.put<Todo>(todosApi, `/${todo.id}`, todo),
  deleteTodo: (id: string) => http.delete<Todo>(todosApi, `/${id}`)
} 