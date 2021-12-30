import { prisma } from "../../../src/db";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

interface IUser {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_verified: Boolean;
  token_string: String;
  token_updated_at: Date;
  token_is_valid: Boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      get(req, res);
      break;
    case "PATCH":
      patch(req, res);
      break;
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

async function patch(req: NextApiRequest, res: NextApiResponse) {}
