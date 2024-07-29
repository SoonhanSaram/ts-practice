import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import db from '../../db/index.js';

const user = db.models.menus;

export async function GET(req: NextApiRequest, res : NextResponse) {
  const findAllMenu = await user.findAll();

  console.log(findAllMenu);  

  return NextResponse.json(findAllMenu);
};