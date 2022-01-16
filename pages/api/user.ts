import { prisma } from "../../src/db";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

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
    const users: any =
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
    const users: any =
      await prisma.$queryRaw`SELECT * FROM Account LEFT JOIN Customer ON Account.user_id = Customer.user_id WHERE email = ${body.email};`;
    if (!users.length)
      return res.status(200).json({
        status: "error",
        message: "Invalid Credentials",
      });

    if (bcrypt.compareSync(body.password, users[0].password)) {
      const cart =
        await prisma.$queryRaw`SELECT * FROM Cart JOIN Cart_list ON Cart.user_id = Cart_list.user_id WHERE user_id = ${users[0].email};`;

      const data: any = {
        token: users[0].token_string,
        user: {
          email: users[0].email,
          first_name: users[0].first_name,
          last_name: users[0].last_name,
          account_type: users[0].account_type,
        },
      };

      if (users[0].street) {
        data.user.street = users[0].street;
        data.user.city = users[0].city;
        data.user.state = users[0].state;
        data.user.country = users[0].country;
      }

      return res.json({
        status: "success",
        data,
        cart,
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
