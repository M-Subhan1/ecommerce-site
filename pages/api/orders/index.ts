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
      : method === "POST"
      ? post(req, res)
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
  const items: any =
    await prisma.$queryRaw`SELECT * FROM order_view WHERE EXISTS (SELECT * FROM Account WHERE token_string::text = ${req.headers.authorization} AND account_type = 'admin')`;

  if (items.length) {
    const orders: any = [];
    let check = false;

    for (let i = 0; i < items.length; i++) {
      check = false;
      for (let j = 0; j < orders.length; j++) {
        if (orders[j].order_id === items[i].order_id) {
          orders[j].products.push(items[i]);
          check = true;
        }
      }

      if (!check)
        orders.push({
          order_id: items[i].order_id,
          products: [
            {
              product_id: items[i].product_id,
              quantity: items[i].quantity,
              product_name: items[i].product_name,
              product_type: items[i].product_type,
              image_url: items[i].image_url,
              discount: items[i].discount,
              price: items[i].price,
            },
          ],
        });
    }

    return res.json({
      status: "success",
      data: orders,
    });
  }

  return res.json({
    status: "error",
    message: "Not authorized",
  });
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  // place order
  const { data, cart } = req.body.data;
  let query: any = [];

  const user: any =
    await prisma.$queryRaw`SELECT * FROM Account WHERE token_string::text = ${req.headers.authorization}`;

  if (!user.length)
    res.json({
      status: "error",
      message: "Log in to place an order",
    });

  const order: any =
    await prisma.$queryRaw`INSERT INTO Orders(email, street, city, state, country, phone_number) VALUES(${user[0].email}, ${data.street}, ${data.city}, ${data.state}, ${data.country}, ${data.phone_number}) RETURNING *`;

  const customer: any =
    await prisma.$queryRaw`INSERT INTO Customer (email, rating, street, city, state, country) VALUES (${
      user[0].email
    }, ${1}, ${data.street}, ${data.city}, ${data.state}, ${
      data.country
    }) ON CONFLICT (email) DO UPDATE SET rating = Customer.rating + ${parseInt(
      "1"
    )}, street = ${data.street}, city = ${data.city}, country = ${
      data.country
    }, state = ${data.state}`;

  cart.forEach((e: any) => {
    query.push(
      `(${parseInt(order[0].order_id)}, ${parseInt(e.product_id)}, ${parseInt(
        e.quantity
      )}, ${parseFloat(e.discount)}, ${parseFloat(e.price)})`
    );
  });

  await Promise.all([
    prisma.$executeRawUnsafe(
      `INSERT INTO Order_list(order_id, product_id, units, discount, price) VALUES ${query.join(
        ", "
      )} RETURNING *;`
    ),
    prisma.$queryRaw`DELETE FROM cart WHERE user_id = ${cart[0].user_id}`,
  ]);

  return res.json({
    status: "success",
  });
}

// get all orders, delete order
// add review
