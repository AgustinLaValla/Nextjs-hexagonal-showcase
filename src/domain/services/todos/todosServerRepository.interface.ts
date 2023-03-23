import { Todo } from "@/domain/models";

export interface TodosServerRepository {
  getTodos: () => Promise<Todo[]>;
  getTodoByID: (id: string) => Promise<Todo | null>;
  createTodo: (todo: Omit<Todo, 'id'>) => Promise<Todo>;
  updateTodo: (todo: Todo) => Promise<Todo>;
  deleteTodo: (id: string) => Promise<Todo | null>
}
