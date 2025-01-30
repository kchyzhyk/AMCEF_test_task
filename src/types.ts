export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  deadline: string;
  isCompleted: boolean;
  listId: string;
}

export interface TodoList {
  id: string;
  name: string;
  items: TodoItem[];
}

export enum FilterOptions {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed",
}

export interface FormData {
  title: string;
  description: string;
  deadline: string;
}

export interface AppContext {
  todoLists: TodoList[]; // All ToDo lists in the app
  addTodoList: (list: TodoList) => void; // Function to add a new list
  updateTodoItem: (listId: string, item: TodoItem) => void; // Update an item
  deleteTodoItem: (listId: string, itemId: string) => void; // Delete an item
}

export interface DeleteTodoItemPayload {
  listId: string;
  itemId: string;
}

export interface UpdateTodoItemPayload {
  listId: string;
  itemId: string;
  updates: Partial<TodoItem>; // Allows partial updates
}
