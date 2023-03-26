import { NextApiRequest, NextApiResponse } from "next";
import { ErrorWidthCode } from "@/domain/models";
import { todosServerRepository } from "../../../repositories";
import { Todo } from "@/infrastucture/database/schemas";
import { throw500Error } from "@/infrastucture/utils";
import { todosService as todosServerService } from "@/domain/services";

const todosService = todosServerService(todosServerRepository(Todo));

export const getTodos = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const todos = await todosService.getTodos();
    return res.status(200).json(todos);
  } catch (error) {
    console.log(error)
    if (error instanceof ErrorWidthCode) {
      return res.status(error.code).json(error.message);
    }
    return throw500Error(res);
  }
}

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
