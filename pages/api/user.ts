import { prisma } from "../../src/db";
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
  account_type: string;
}

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      post(req, res);
      break;
    case "GET":
      get(req, res);
      break;
    default:
      return res.json({
        status: "error",
        message: "Method not supported!",
      });
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req;
    console.log(body);
    const users: IUser[] =
      await prisma.$queryRaw`SELECT * FROM Account WHERE email = ${body.email};`;

    console.log(users);

    if (users.length)
      return res.status(200).json({
        status: "error",
        message: "User already exists",
      });

    const salt = bcrypt.genSaltSync();
    const hashed_password = bcrypt.hashSync(body.password, salt);
    const resp =
      await prisma.$queryRaw`INSERT INTO Account (email, first_name, last_name, password) VALUES (${body.email.toLowerCase()}, ${body.first_name.toLowerCase()}, ${body.last_name.toLowerCase()}, ${hashed_password});`;

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

async function get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req;
    const users: IUser[] =
      await prisma.$queryRaw`SELECT * FROM Account WHERE email = ${body.email};`;
    if (!users.length)
      return res.status(200).json({
        status: "error",
        message: "Invalid Credentials",
      });

    if (bcrypt.compareSync(body.password, users[0].password))
      return res.json({
        status: "success",
        data: {
          token: users[0].token_string,
          user: {
            email: users[0].email,
            first_name: users[0].first_name,
            last_name: users[0].last_name,
            account_type: users[0].account_type,
          },
        },
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      error: err,
    });
  }
}
