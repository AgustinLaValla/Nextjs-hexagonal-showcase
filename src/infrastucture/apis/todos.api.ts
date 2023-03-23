import axios from "axios";

export const todosApi = axios.create({
  baseURL: '/api/todos',
  headers: { 'Content-Type': 'application/json' }
});