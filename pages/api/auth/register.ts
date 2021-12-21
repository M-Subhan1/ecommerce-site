import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

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

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("here");
    const { body } = req;
    console.log(body);
    const users: IUser[] =
      await prisma.$queryRaw`SELECT * FROM Account WHERE email = ${body.email};`;
    console.log(users);
    if (users.length)
      return res.status(409).json({
        status: "error",
        message: "User already exists",
      });

    const salt = bcrypt.genSaltSync();
    const hashed_password = bcrypt.hashSync(body.password, salt);
    console.log(hashed_password);
    const resp =
      await prisma.$queryRaw`INSERT INTO Account (email, first_name, last_name, password) VALUES (${body.email}, 'subhan', 'abbas', ${hashed_password});`;

    console.log(resp);
    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      error: err,
    });
  }
}
