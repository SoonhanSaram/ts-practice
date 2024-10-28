import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import crypto from "crypto";
import mime from "mime";
import db from "../../db/index.js";

const banner = db.models.banner;

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

  try {
    await db.sequelize.transaction(async (t: any) => {
      await banner.create(
        {
          banner_title: title,
          banner_used: used,
          banner_sdate: startdate,
          banner_stime: starttime,
          banner_edate: enddate,
          banner_etime: endtime,
          banner_registrant: "관리자",
          banner_image: `${upload_banner}/${imageName!}`,
        },
        { transaction: t }
      );
    });

    return NextResponse.json({
      status: 200,
      message: "Banner created successfully",
    });
  } catch (Error) {
    console.log({ message: "error ", Error });
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}

export async function GET(req: Request, res: NextResponse) {
  // admin 인지 확인 이후

  try {
    const findBanner = await banner.findAll();
    return NextResponse.json({ status: 200, data: findBanner });
  } catch (error) {
    return NextResponse.json({ status: 304, message: "find banner Error" });
  }
}
