import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message = 'Invalid Token' } = req.query;
  return res.status(401).json(message);
}