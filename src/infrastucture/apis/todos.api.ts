import axios from "axios";

export const todosApi = axios.create({
  baseURL: 'http://localhost:3000/api/todos',
  headers: { 'Content-Type': 'application/json' }
});