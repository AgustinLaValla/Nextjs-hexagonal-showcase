import { NextApiRequest, NextApiResponse } from "next";
import { ErrorWidthCode } from "@/domain/models/Error/Error.model";
import { todosServerService } from "../../../domain/services/todos/todosServer.service";
import { todosServerRepository } from "../../../infrastucture/repositories/todosServer.repository";
import { Todo } from "@/infrastucture/database/schemas";
import { throw500Error } from "@/infrastucture/utils";

const todosService = todosServerService(todosServerRepository(Todo));

export const getTodos = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const todos = await todosService.getTodos();
    return res.status(200).json(todos);
  } catch (error) {
    if (error instanceof ErrorWidthCode) {
      return res.status(error.code).json(error.message);
    }
    return throw500Error(res);
  }
}

export const createTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const todo = await todosService.createTodo(req.body);
    return res.status(201).json(todo);
  } catch (error) {
    if (error instanceof ErrorWidthCode) {
      return res.status(error.code).json(error.message);
    }
    return throw500Error(res);
  }
}

export const updateTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const todo = await todosService.updateTodo(req.body);
    return res.status(200).json(todo);
  } catch (error) {
    if (error instanceof ErrorWidthCode) {
      return res.status(error.code).json(error.message);
    }
    return throw500Error(res);
  }
}

