import { NextResponse } from "next/server";

import db from "../../../../../db/index.js";

const banner = db.models.banner;

export async function GET(req: Request, res: NextResponse) {
  // admin 인지 확인 이후

  const { searchParams } = new URL(req.url);

  const offset = searchParams.get("offset");
  const limit = searchParams.get("limit");

  try {
    const findBanner = await banner.findAll({ limit: limit, offset: offset });
    return NextResponse.json({ status: 200, data: findBanner });
  } catch (error) {
    return NextResponse.json({ status: 304, message: "find banner Error" });
  }
}
