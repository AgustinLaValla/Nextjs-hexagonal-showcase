import { Todo, User } from "@/domain/models";
import { db } from "@/infrastucture/database";
import { MongoDocument } from "@/infrastucture/database/common/mongoDocument.interface";
import { User as UserModel, Todo as TodoModel, IUser } from "@/infrastucture/database/schemas";
import { NextApiRequest, NextApiResponse } from "next"

const seedData: { users: Omit<User, 'id'>[], todos: Omit<Todo, 'id' | 'userId'>[] } = {
  users: [
    {
      email: 'test@email.com',
      password: 'test@123',
      name: 'Test',
    }
  ],
  todos: [
    {
      description: 'Test the app',
      isCompleted: true,
    },
    {
      description: 'Go to the gym',
      isCompleted: false
    }
  ]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if(req.method !== 'POST') return res.status(404).json('No route found');

  await db.connect();

  let testUser: MongoDocument<IUser> =
    await UserModel.findOne({ email: seedData.users[0].email }) ||
    new UserModel(seedData.users[0]);

  await testUser.save();


  seedData.todos.forEach(async todo => {
    const todoExist = await TodoModel.findOne({ description: todo.description });
    if (todoExist) return;

    const newTodo = new TodoModel({ ...todo, userId: testUser?._id })
    await newTodo.save();
  });

  await db.disconnect();
  return res.status(201).json('Success');

}