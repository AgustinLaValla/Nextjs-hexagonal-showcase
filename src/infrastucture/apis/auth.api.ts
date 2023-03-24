import axios from "axios";

export const authApi = axios.create({
  baseURL: '/api/auth',
  headers: { 'Content-Type': 'application/json' }
})