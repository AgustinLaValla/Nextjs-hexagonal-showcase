import { NextApiRequest, NextApiResponse } from "next";
import { deleteTodo, getTodoByID } from "./todo.controller";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const responses = {
    'GET': () => getTodoByID(req, res),
    'DELETE': () => deleteTodo(req, res),
  }

  const response = responses[req.method as keyof typeof responses];

  if (!response) return res.status(404).json('No route found');

  return response();

}