import { Todo } from "@/domain/models";

type TodoID = string;

export interface TodosRepository {
  getTodos: (userId?: string) => Promise<Todo[]>;
  getTodoByID: (id: TodoID) => Promise<Todo>;
  createTodo: (todo: Omit<Todo, 'id'>) => Promise<Todo>;
  updateTodo: (todo: Todo) => Promise<Todo>;
  deleteTodo: (id: TodoID) => Promise<Todo>;
}