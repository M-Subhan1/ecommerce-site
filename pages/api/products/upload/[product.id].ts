import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { saveFile } from "./index";

export const config = {
  api: {
    bodyParser: false,
  },
};

const patch = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  return form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }

    console.log(fields, files);
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
