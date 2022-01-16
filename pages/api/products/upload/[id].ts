import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "../../../../src/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

const patch = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  return form.parse(req, async (err, fields: any, files: any) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
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

        const id: any = req.query.id;
        const item: any =
          await prisma.$queryRaw`UPDATE Product SET stock = ${parseInt(
            fields.stock
          )}, price = ${parseInt(fields.price)}, discount = ${parseInt(
            fields.discount
          )}, image_url = ${result.url} WHERE product_id = ${parseInt(
            id
          )} RETURNING *`;

        return res.status(200).json({
          status: "success",
        });
      }
    );
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "PATCH":
      return patch(req, res);

    default: {
      return res.status(401).json({
        success: false,
        message: "Method not supported",
      });
    }
  }
};

export default handler;
