import { NextApiRequest, NextApiResponse } from "next";
import { login } from "../auth.controller";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(404).json('No route found')

  return login(req, res);
}