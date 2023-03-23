import { NextApiResponse } from "next";

export const throw500Error = (res: NextApiResponse) =>
  res.status(500).json('Internal Server Error');