import { Todo } from "@/domain/models"
import { TodosServerRepository } from "./todosServerRepository.interface"

export const todosServerService = (todosServerRepository: TodosServerRepository) => ({
  getTodos: () => todosServerRepository.getTodos(),
  getTodoByID: (id: string) => todosServerRepository.getTodoByID(id),
  createTodo: (todo: Omit<Todo, 'id'>) => todosServerRepository.createTodo(todo),
  updateTodo: (todo: Todo) => todosServerRepository.updateTodo(todo),
  deleteTodo: (id: string) => todosServerRepository.deleteTodo(id)
})