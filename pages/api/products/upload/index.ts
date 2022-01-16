import formidable from "formidable";
import { prisma } from "../../../../src/db";
import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.method === "POST"
    ? post(req, res)
    : res.status(404).json({
        success: false,
        message: "Invalid Request",
      });
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields: any, files: any) => {
    const user: any[] =
      await prisma.$queryRaw`SELECT * FROM Account WHERE token_string::text = ${fields.token} AND account_type = 'admin'`;

    if (!user.length)
      return res.json({
        status: "error",
        message: "Invalid Token",
      });

    if (!files.image) {
      return res.json({
        status: "error",
        message: "Invalid Image",
      });
    }

    cloudinary.uploader.upload(
      files.image.filepath,
      async (err: any, result: any) => {
        if (err) {
          return res.json({
            status: "error",
            message: "Invalid Image",
          });
        }

        const item: [] =
          await prisma.$queryRaw`INSERT INTO Product(product_name, product_description, product_type, brand, price, discount, stock, image_url) VALUES (${
            fields.name
          }, ${fields.description}, ${fields.product_type}, ${
            fields.brand
          }, ${parseFloat(fields.price)}, ${parseFloat(
            fields.discount
          )}, ${parseInt(fields.stock)}, ${result.url}) RETURNING *`;

        return res.status(201).json({
          success: true,
          message: "Item Created",
        });
      }
    );
  });
};
