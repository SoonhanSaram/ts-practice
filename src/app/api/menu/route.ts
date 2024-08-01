import { GetStaticProps, NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import db from '../../db/index.js';
import path from 'path';
import fs from 'fs'

const user = db.models.menus;
const folderPath = path.join(process.cwd(), 'data');
const filePath = path.join(folderPath, 'menu.json');

export async function GET(req: NextApiRequest, res : NextApiResponse) {
  const findAllMenu = await user.findAll();

 if(!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
 }

  fs.writeFile(filePath, JSON.stringify(findAllMenu, null, 2), 'utf8', (err : any) => {
    if (err) {
      console.error(err);
      return ;
    }    
    return NextResponse.json({ findAllMenu});
  });
 
  // db 에서 return 받은 정보를 menu.json 에 저장한 성공했다면 redux 에 menu 정보 저장
  
  
  return NextResponse.json({status : 200, payload : findAllMenu});
};

const getStaticProps: GetStaticProps = async () => {
  const menus: Menu[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return { props: { menus } };
} 

console.error(getStaticProps);