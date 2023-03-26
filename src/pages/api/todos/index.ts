import { NextApiRequest, NextApiResponse } from "next";
import { createTodo, getTodos } from "@/infrastucture/adapters/controllers";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const responses = {
    'GET': () => getTodos(req, res),
    'POST': () => createTodo(req, res),
  }

  const response = responses[req.method as keyof typeof responses];

  if (!response) return res.status(404).json('No route found');

  return response();

}