import axios from "axios";
import { TodoItem } from "../types";
const MOCKAPI_SECRET = import.meta.env.VITE_MOCKAPI_SECRET;

const api = axios.create({
  baseURL: `https://${MOCKAPI_SECRET}.mockapi.io/api/v1`,
});

export const fetchLists = () => api.get("/lists");
export const fetchListItems = (listId: string) =>
  api.get(`/lists/${listId}/items`);
export const deleteList = (listId: string) => api.delete(`/lists/${listId}`);
export const createItem = (listId: string, data: Omit<TodoItem, "id">) =>
  api.post(`/lists/${listId}/items`, data);
export const deleteItem = (listId: string, itemId: string) =>
  api.delete(`/lists/${listId}/items/${itemId}`);
