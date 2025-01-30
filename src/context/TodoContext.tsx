import { createContext, useContext, useEffect, useState } from "react";
import { TodoItem, TodoList } from "../types";
import {
  createItem,
  deleteItem,
  fetchListItems,
  fetchLists,
} from "../services/api";
import { v4 as uuidv4 } from "uuid";

interface TodoContextType {
  todoLists: TodoList[];
  todoListsItems: TodoItem[];
  addTodoList: (name: string) => void;
  removeTodoList: (id: string) => void;
  addTodoItem: (listId: string, item: Omit<TodoItem, "id">) => void;
  toggleTodoItem: (listId: string, itemId: string) => void;
  deleteTodoItem: (listId: string, itemId: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  // const [todoListsItems, setTodoListsItems] = useState<TodoItem[]>([]);

  // Load lists data from API or local storage
  useEffect(() => {
    fetchLists()
      .then((response) => setTodoLists(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  // Save data to API or local storage (mocked with `console.log`)
  const saveData = (newData: TodoList[]) => {
    setTodoLists(newData);
  };

  // Add new ToDo List
  const addTodoList = (name: string) => {
    const newList: TodoList = { id: uuidv4(), name, items: [] };
    saveData([...todoLists, newList]);
  };

  // Remove ToDo List
  const removeTodoList = (id: string) => {
    saveData(todoLists.filter((list) => list.id !== id));
  };

  // Add new ToDo Item
  const addTodoItem = (listId: string, item: Omit<TodoItem, "id">) => {
    createItem(listId, item);
    const updatedLists = todoLists.map((list) =>
      list.id === listId
        ? {
            ...list,
            items: [
              ...list.items,
              { id: uuidv4(), ...item, isCompleted: false },
            ],
          }
        : list,
    );
    saveData(updatedLists);
  };

  // Toggle ToDo Item Completion
  const toggleTodoItem = (listId: string, itemId: string) => {
    const updatedLists = todoLists.map((list) =>
      list.id === listId
        ? {
            ...list,
            items: list.items.map((item) =>
              item.id === itemId
                ? { ...item, isCompleted: !item.isCompleted }
                : item,
            ),
          }
        : list,
    );
    saveData(updatedLists);
  };

  const deleteTodoItem = (listId: string, itemId: string) => {
    deleteItem(listId, itemId);
    const updatedLists = todoLists.map((list) =>
      list.id === listId
        ? { ...list, items: list.items.filter((item) => item.id !== itemId) }
        : list,
    );
    saveData(updatedLists);
  };
  return (
    <TodoContext.Provider
      value={{
        todoLists,
        addTodoList,
        removeTodoList,
        addTodoItem,
        toggleTodoItem,
        deleteTodoItem,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
