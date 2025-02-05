import { createContext, useContext, useEffect, useState } from "react";
import { TodoItem, TodoList } from "../types";
import {
  createItem,
  createList,
  deleteItem,
  fetchListItems,
  fetchLists,
  updateList,
  updateListItem,
} from "../services/api";
import { v4 as uuidv4 } from "uuid";

interface TodoContextType {
  todoLists: TodoList[];
  editTodoList: (listId: string, item: string) => void;
  editTodoListItem: (listId: string, itemId: string, item: TodoItem) => void;
  addTodoList: (name: string) => void;
  removeTodoList: (id: string) => void;
  addTodoItem: (listId: string, item: TodoItem) => void;
  toggleTodoItem: (listId: string, itemId: string) => void;
  deleteTodoItem: (listId: string, itemId: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);

  // Load lists data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchLists();
        const lists = response.data;

        const updatedLists = await Promise.all(
          lists.map(async (list: TodoList) => await setListItems(list)),
        );

        setTodoLists(updatedLists);
      } catch (error) {
        console.error("Error fetching todo lists:", error);
      }
    };

    fetchData();
  }, []);

  const setListItems = async (list: TodoList) => {
    try {
      const response = await fetchListItems(list.id);
      return { ...list, items: response.data ? response.data : [] };
    } catch (error) {
      console.log("Error fetching todos:", error);
      return { ...list, items: [] }; // Return empty items on failure
    }
  };

  // Save data to API
  const saveData = (newData: TodoList[]) => {
    setTodoLists(newData);
  };

  // Add new ToDo List
  const addTodoList = (name: string) => {
    const newList: TodoList = { id: uuidv4(), name, items: [] };
    createList(newList);
    saveData([...todoLists, newList]);
  };

  // Edit ToDo List
  const editTodoList = (listId: string, name: string) => {
    updateList(listId, { name });

    const updatedLists = todoLists.map((list) =>
      list.id === listId ? { ...list, name } : list,
    );
    saveData(updatedLists);
  };

  const editTodoListItem = (listId: string, itemId: string, item: TodoItem) => {
    updateListItem(listId, itemId, item);
  };

  // Remove ToDo List
  const removeTodoList = (id: string) => {
    saveData(todoLists.filter((list) => list.id !== id));
  };

  // Add new ToDo Item
  const addTodoItem = (listId: string, item: TodoItem) => {
    createItem(listId, item);
    const updatedLists = todoLists.map((list) =>
      list.id === listId
        ? {
            ...list,
            items: [...list.items, { ...item, isCompleted: false }],
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
        editTodoListItem,
        addTodoList,
        editTodoList,
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
