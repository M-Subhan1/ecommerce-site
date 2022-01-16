import { prisma } from "../../../src/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    method === "GET"
      ? get(req, res)
      : res.json({
          status: "error",
          message: "Method not allowed",
        });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err,
    });
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products: any =
      await prisma.$queryRaw`SELECT product_id, stock, price, image_url, discount FROM Product WHERE brand = ${req.query.brand}`;
    return res.status(200).json({
      status: "success",
      products,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      error: err,
    });
  }
}
