import axios from "axios";
import { TodoItem, TodoList } from "../types";
const MOCKAPI_SECRET = import.meta.env.VITE_MOCKAPI_SECRET;

const api = axios.create({
  baseURL: `https://${MOCKAPI_SECRET}.mockapi.io/api/v1`,
});

export const fetchLists = () => api.get("/lists");
export const fetchListItems = (listId: string) =>
  api.get(`/lists/${listId}/items`);
export const deleteList = (listId: string) => api.delete(`/lists/${listId}`);
export const createItem = (listId: string, data: TodoItem) =>
  api.post(`/lists/${listId}/items`, data);
export const createList = (data: Partial<TodoList>) => api.post(`/lists`, data);
export const deleteItem = (listId: string, itemId: string) =>
  api.delete(`/lists/${listId}/items/${itemId}`);
export const updateList = (listId: string, updates: Partial<TodoList>) =>
  api
    .put(`/lists/${listId}`, updates)
    .then((response) => console.log(response));

export const updateListItem = (
  listId: string,
  itemId: string,
  updates: TodoItem,
) => api.put(`/lists/${listId}/items/${itemId}`, updates);
