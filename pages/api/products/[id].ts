import { prisma } from "../../../src/db";
import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { IItem } from "../../../src/actions";

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
  const id: any = req.query.id;

  if (!id) {
    return res.status(500).json({
      status: "error",
      message: "missing required parameter",
    });
  }

  const items: IItem[] =
    await prisma.$queryRaw`SELECT * FROM Product WHERE product_id = ${parseInt(
      id
    )}`;
  return res.json({
    status: "success",
    item: items.length ? items[0] : null,
  });
}

async function delete_method(req: NextApiRequest, res: NextApiResponse) {
  const id: any = req.query.id;
  console.log(id + "here");
  const matches: [] =
    await prisma.$queryRaw`SELECT * FROM Account, Product WHERE token_string::text = ${
      req.headers.authorization
    } AND account_type = 'admin' AND product_id = ${parseInt(id)}`;

  if (!matches.length) {
    return res.status(500).json({
      status: "error",
    });
  }

  await prisma.$queryRaw`DELETE FROM Product WHERE product_id = ${parseInt(
    id
  )}`;

  return res.json({
    status: "success",
  });
}
