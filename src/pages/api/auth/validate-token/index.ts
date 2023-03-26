import { NextApiRequest, NextApiResponse } from "next";
import { checkToken } from "@/infrastucture/adapters/controllers";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    return res.status(404).json('No route found')

  return checkToken(req, res);
}