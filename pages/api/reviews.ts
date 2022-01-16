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
    const user: any =
      await prisma.$queryRaw`SELECT email FROM Account WHERE token_string::text = ${req.headers.authorization}`;

    if (!user.length)
      return res.json({
        status: "error",
        message: "Not authorized",
      });

    if (user[0].account_type == "admin") {
      const reviews = await prisma.$queryRaw`SELECT * FROM Review`;
      return res.json({
        status: "success",
        data: reviews,
      });
    } else if (!req.body.product_id) {
      const reviews: any =
        await prisma.$queryRaw`SELECT * FROM Review WHERE email = ${user[0].email}`;

      return res.json({
        status: "success",
        data: reviews,
      });
    } else {
      const reviews: any =
        await prisma.$queryRaw`SELECT * FROM Review WHERE email = ${
          user[0].email
        } AND product_id = ${parseInt(req.body.product_id)}`;

      return res.json({
        status: "success",
        data: reviews,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: err,
    });
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    // product_id, rating, review, user_id
    if (
      req.body.product_id &&
      req.body.rating &&
      req.body.review &&
      req.headers.authorization
    ) {
      const user_id: any =
        await prisma.$queryRaw`SELECT email FROM Account WHERE token_string::text = ${req.headers.authorization}`;

      const history: any =
        await prisma.$queryRaw`SELECT * FROM Orders JOIN Order_list ON Orders.order_id = Order_list.order_id WHERE email = ${
          user_id[0].email
        } AND Order_list.product_id = ${parseInt(req.body.product_id)}`;

      if (!history.length)
        return res.json({
          status: "error",
          message: "You have not bought this product yet",
        });

      if (user_id.length) {
        const review: any =
          await prisma.$queryRaw`SELECT * FROM Review WHERE email = ${
            user_id[0].email
          } AND product_id = ${parseInt(req.body.product_id)}`;

        if (review.length) {
          return res.status(400).json({
            status: "error",
            message: "You have already reviewed this product",
          });
        } else {
          await prisma.$queryRaw`INSERT INTO Review (product_id, rating, text, user_id) VALUES (${parseInt(
            req.body.product_id
          )}, ${parseFloat(req.body.rating)}, ${req.body.review}, ${
            user_id[0].email
          })`;

          return res.status(200).json({
            status: "success",
            message: "Review submitted",
          });
        }
      } else {
        return res.status(400).json({
          status: "error",
          message: "Invalid product id",
        });
      }
    } else
      return res.json({
        status: "error",
        message: "Missing required fields",
      });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      error: err,
    });
  }
}
