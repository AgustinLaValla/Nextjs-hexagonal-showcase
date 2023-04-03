import { Todo } from "@/domain/models";
import { TodosRepository, todosService } from "@/domain/services"

describe('Todos Service', () => {

  let service: ReturnType<typeof todosService>;
  let mockRepository: TodosRepository;

  beforeEach(() => {
    mockRepository = {
      getTodos: jest.fn(),
      getTodoByID: jest.fn(),
      createTodo: jest.fn(),
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
    }

    service = todosService(mockRepository);
  });

  test('Create Todo', async () => {
    const todoData: Omit<Todo, 'id'> = { description: 'Test Domain Layer', isCompleted: false, userId: '0123456789' };
    const todo: Todo = {
      ...todoData,
      id: 'todo-123456789'
    };

    (mockRepository.createTodo as jest.Mock).mockReturnValue(todo);
    const createdTodo = await service.createTodo(todoData);

    expect(mockRepository.createTodo).toHaveBeenCalledWith(todoData);
    expect(createdTodo).toEqual(todo);
  });

  test('Update Todo', async () => {
    const todoData: Todo = { description: 'Test Domain Layer', isCompleted: false, userId: '0123456789', id: 'todo-123456789' };
    const todo: Todo = { ...todoData, isCompleted: true };

    (mockRepository.updateTodo as jest.Mock).mockReturnValue(todo);
    const updatedTodo = await service.updateTodo(todoData);

    expect(mockRepository.updateTodo).toHaveBeenCalledWith(todoData);
    expect(updatedTodo).toEqual(todo);
  });

  test('Get Todo List', async () => {
    const userId = '0123456789';
    const todoList: Todo[] = [
      { description: 'Test Domain Layer', isCompleted: true, userId, id: 'todo-123456789' },
      { description: 'Test Presentation Layer', isCompleted: false, userId, id: 'todo-4321' }
    ];

    (mockRepository.getTodos as jest.Mock).mockReturnValue(todoList);
    const todos = await service.getTodos(userId);

    expect(mockRepository.getTodos).toHaveBeenCalledWith(userId);
    expect(todos[0].userId).toEqual(userId);
    expect(todos).toEqual(todoList);
  });

  test('Get todo by ID', async () => {
    const todoID = 'todo-123456789';
    const todo = {
      description: 'Test Domain Layer',
      isCompleted: true,
      userId: '0123456789',
      id: todoID
    };

    (mockRepository.getTodoByID as jest.Mock).mockReturnValue(todo);

    const foundTodo = await service.getTodoByID(todoID);

    expect(mockRepository.getTodoByID).toHaveBeenCalledWith(todoID);
    expect(foundTodo).toEqual(todo);

  });

  test('Delete todo and return deleted todo', async () => {

    const todoID = 'todo-123456789';
    const todo = {
      description: 'Test Domain Layer',
      isCompleted: true,
      userId: '0123456789',
      id: todoID
    };

    (mockRepository.deleteTodo as jest.Mock).mockReturnValue(todo);
    const deletedTodo = await service.deleteTodo(todoID);

    expect(mockRepository.deleteTodo).toHaveBeenCalledWith(todoID);
    expect(deletedTodo).toEqual(todo);
  })
})