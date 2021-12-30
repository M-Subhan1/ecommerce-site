import { prisma } from "../../src/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    method === "GET"
      ? get(req, res)
      : method === "POST"
      ? post(req, res)
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
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      error: err,
    });
  }
}

async function delete_method(req: NextApiRequest, res: NextApiResponse) {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      error: err,
    });
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      error: err,
    });
  }
}
