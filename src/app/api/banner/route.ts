import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
  const formData = await req.formData();

  console.log(formData);

  return NextResponse.json({ status: 200, message: "ok" });
}
