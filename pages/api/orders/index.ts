import { prisma } from "../../../src/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    method === "GET"
      ? post(req, res)
      : res.status(401).json({
          status: "error",
          message: "Method not supported",
        });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err,
    });
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const items = await prisma.$queryRaw`SELECT * FROM Product`;

  return res.json({
    status: "success",
    data: items,
  });
}
