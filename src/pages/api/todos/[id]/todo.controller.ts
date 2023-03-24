import { NextApiRequest, NextApiResponse } from "next";
import { ErrorWidthCode } from "@/domain/models";
import { Todo } from "@/infrastucture/database/schemas";
import { todosService as todosServerService } from "@/domain/services";
import { todosServerRepository } from "../../../../infrastucture/repositories/todos/todosServer.repository";
import { throw500Error } from "@/infrastucture/utils";

const todosService = todosServerService(todosServerRepository(Todo));

export const getTodoByID = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query?.id as string;
    const todo = await todosService.getTodoByID(id);
    return res.status(200).json(todo);
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

export const deleteTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query?.id as string;
    const todo = await todosService.deleteTodo(id);
    return res.status(200).json(todo);
  } catch (error) {
    if (error instanceof ErrorWidthCode) {
      return res.status(error.code).json(error.message);
    }
    return throw500Error(res);
  }
}
