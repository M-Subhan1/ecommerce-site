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
    const cart: any =
      await prisma.$queryRaw`SELECT Product.product_id, units, price, image_url, discount FROM cart JOIN cart_list ON cart.user_id = cart_list.user_id JOIN Product ON cart_list.product_id = Product.product_id WHERE cart.user_id = (SELECT email FROM Account WHERE token_string::text = ${req.headers.authorization})`;

    return res.status(200).json({
      status: "success",
      cart: cart.length ? cart : null,
    });
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
    const user: any =
      await prisma.$queryRaw`SELECT email FROM Account WHERE token_string::text = ${req.headers.authorization}`;

    if (!user.length) {
      return res.json({
        status: "error",
        message: "User not found",
      });
    }

    let cart: any =
      await prisma.$queryRaw`SELECT user_id FROM cart WHERE user_id = ${user[0].email}`;

    if (!cart.length) {
      cart =
        await prisma.$queryRaw`INSERT INTO cart (user_id) VALUES (${user[0].email}) RETURNING *`;
    }

    const { product_id, quantity } = req.body;
    await prisma.$queryRaw`INSERT INTO cart_list(user_id, product_id, units) VALUES (${
      cart[0].user_id
    } , ${parseInt(product_id)}, ${parseInt(
      quantity
    )}) ON CONFLICT (user_id, product_id) DO UPDATE SET units = cart_list.units + ${parseInt(
      quantity
    )} WHERE cart_list.user_id = ${cart[0].user_id}`;

    return res.status(201).json({
      status: "success",
      message: "Cart Updated",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: err,
    });
  }
}

// place order
// view order

// reviews
