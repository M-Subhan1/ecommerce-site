import { prisma } from "../../../src/db";
import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    method === "GET"
      ? get(req, res)
      : method === "DELETE"
      ? delete_method(req, res)
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

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const items =
    await prisma.$queryRaw`SELECT * FROM Product WHERE product_id = ${id}`;
  return res.json({
    status: "success",
    data: items,
  });
}

async function delete_method(req: NextApiRequest, res: NextApiResponse) {
  return res.status(500).json({
    status: "error",
  });
}
