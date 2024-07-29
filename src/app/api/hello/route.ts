import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

type Data = {
  name: string
};

export async function GET(req: NextApiRequest, res: NextResponse) {    
    
  return NextResponse.json({ message: 'Jonh doe' }, { status: 200 })


  // typescript 에서 res 보내기
 
}