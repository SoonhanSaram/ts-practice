import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import crypto from "crypto";
import mime from "mime";

export async function POST(req: Request, res: NextResponse) {
  const upload_banner = path.resolve("public/uploads/banner");

  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.image as Blob) || null;
  const { title, use, location, startdate, starttime, enddate, endtime } = body;
  let imageName;
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!fs.existsSync(upload_banner)) {
      fs.mkdirSync(upload_banner, { recursive: true });
    }

    const fileType = (body.image as File).type;
    const fileExtension = mime.getExtension(fileType) || "";
    const random = crypto.randomBytes(16).toString("hex");
    imageName = `${random}.${fileExtension}`;
    fs.writeFileSync(path.resolve(upload_banner, imageName), buffer);
  }

  const used = use === "1" ? true : false;

  console.log(file);

  return NextResponse.json({ status: 200, message: "ok" });
}
