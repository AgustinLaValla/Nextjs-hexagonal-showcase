import { Todo } from "@/domain/models";

type TodoID = string;

export interface TodosRepository {
  getTodos: () => Promise<Todo[]>;
  getTodo: (id: TodoID) => Promise<Todo>;
  createTodo: (todo: Omit<Todo, 'id'>) => Promise<Todo>;
  updateTodo: (todo: Todo) => Promise<Todo>;
  deleteTodo: (id: TodoID) => Promise<Todo>;
}