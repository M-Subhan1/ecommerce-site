import formidable from "formidable";
import { prisma } from "../../../../src/db";
import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const saveFile = async (file: any, fileName: string) => {
  cloudinary.uploader.upload(file, async (result: any) => {
    console.log(result);
  });
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
  form.parse(req, async (err, fields, files) => {
    const resu: any = fields;
    // const user: any[] =
    //   await prisma.$queryRaw`SELECT * FROM Account WHERE token_string::text = ${
    //     fields.token
    //   } AND account_type = ${"admin"}`;

    // if (!user.length)
    //   return res.json({
    //     status: "error",
    //     message: "Invalid Token",
    //   });

    // if (!(files.image instanceof Array)) {
    //   const fileName = `${fields.type}-${fields.title}-${fields.class}-${
    //     fields.medium
    //   }.${files.image.name.split(".")[1]}`.toLowerCase();
    // }
    console.log(fields);
    const item: [] =
      await prisma.$queryRaw`INSERT INTO Product(product_name, product_description, product_type, brand, price, stock) VALUES (${resu.name}, ${resu.description}, ${resu.product_type}, ${resu.brand}, ${resu.price}, 10) RETURNING *;`;

    // if (item.length) {
    //   return res.status(409).json({
    //     success: false,
    //     message: "A Product with same product Id already exists",
    //   });
    // }

    // await saveFile(files.image);
    // Creating an item
    console.log(fields);
    console.log(files);

    return res.json({
      success: true,
      message: "Item Created",
    });
  });
};
