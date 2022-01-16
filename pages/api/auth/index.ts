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
  account_type: string;
}

interface ICustomer extends IUser {
  street: string;
  state: string;
  city: string;
  country: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      post(req, res);
      break;
    case "PATCH":
      patch(req, res);
      break;
    default:
      res.status(404).json({
        status: "error",
        message: "Method not supported!",
      });
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req;

    const users: IUser[] =
      await prisma.$queryRaw`SELECT * FROM Account WHERE email = ${body.identifier} OR token_string::text = ${body.identifier};`;

    if (users.length) {
      let user: ICustomer[];
      if (
        body.password &&
        bcrypt.compareSync(body.password, users[0].password)
      ) {
        await prisma.$queryRaw`UPDATE Account SET token_string = uuid_generate_v1() WHERE email = ${body.identifier}`;
        user =
          await prisma.$queryRaw`SELECT Account.email, first_name, last_name, token_string, account_type, street, city, state, country FROM Account LEFT JOIN Customer ON Account.email = Customer.email WHERE token_string::text = ${body.identifier} OR Account.email = ${body.identifier};`;

        if (!user.length) throw new Error("Token not found");
      } else {
        user =
          await prisma.$queryRaw`SELECT Account.email, first_name, last_name, token_string, account_type, street, city, state, country FROM Account LEFT JOIN Customer ON Account.email = Customer.email WHERE token_string::text = ${body.identifier} OR Account.email = ${body.identifier};`;
      }

      if (user.length && user[0].token_string) {
        const cart =
          await prisma.$queryRaw`SELECT * FROM cart_view WHERE cart_view.user_id = ${users[0].email};`;

        const data: any = {
          email: user[0].email,
          first_name: user[0].first_name,
          last_name: user[0].last_name,
          account_type: user[0].account_type,
        };

        if (user[0].street) {
          data.street = user[0].street;
          data.state = user[0].state;
          data.city = user[0].city;
          data.country = user[0].country;
        }

        return res.status(200).json({
          status: "success",
          token: user[0].token_string,
          user: data,
          cart,
        });
      }

      return res.status(200).json({
        status: "error",
        message: "Invalid Credentials",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      error: err,
    });
  }
}

async function patch(req: NextApiRequest, res: NextApiResponse) {}
