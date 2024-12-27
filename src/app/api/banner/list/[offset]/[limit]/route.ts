import { NextResponse } from "next/server";

import db from "../../../../../db/index.js";

const banner = db.models.banner;

export async function GET(req: Request, res: NextResponse) {
  // admin 인지 확인 이후

  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page")!) || 1;
  const offset = parseInt(searchParams.get("offset")!) || 0;
  const limit = parseInt(searchParams.get("limit")!) || 10;

  const searchOffset = (page - 1) * offset === 0 ? offset : (page - 1) * offset;
  const serachLimit = limit * page;
  try {
    const length = await banner.count();
    const findBanner = await banner.findAll({
      limit: serachLimit,
      offset: searchOffset,
    });
    return NextResponse.json({ status: 200, data: findBanner, length: length });
  } catch (error) {
    return NextResponse.json({ status: 304, message: "find banner Error" });
  }
}
