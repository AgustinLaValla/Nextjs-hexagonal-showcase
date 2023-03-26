import { NextApiRequest, NextApiResponse } from "next";
import { register } from "@/infrastucture/adapters/controllers";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(404).json('No route found')

  return register(req, res);
}