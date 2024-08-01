import { GetStaticProps, NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import db from '../../../db/index.js';
import path from 'path';
import fs from 'fs'

const menu = db.models.menus;
const folderPath = path.join(process.cwd(), 'data');
const filePath = path.join(folderPath, 'menu.json');

export async function POST(req: Request, res : NextApiResponse) {
    
    const newMenu = await req.json();
    console.log('req.body =============', newMenu);

    try {
        // transaction 을 설정해 findAllmenu 에서 업데이트 되지않은 메뉴를 가져오지 않도록 한다.
        const result = await db.sequelize.transaction(async (t : any) => {
            const insertMenu = await menu.create(newMenu, {transaction : t});    
        });
        
        const findAllMenu = await menu.findAll();

        // db 에서 return 받은 정보를 menu.json 에 저장한 성공했다면 redux 에 menu 정보 저장
        if(!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        
        fs.writeFile(filePath, JSON.stringify(findAllMenu, null, 2), 'utf8', (err : any) => {
            if (err) {
              console.error(err);
              return ;
        }    

        return NextResponse.json({status : 200});
    });
    } catch (error) {
        console.error({message : 'error', error});
        return NextResponse.json({status : 300});
    }
};

const getStaticProps: GetStaticProps = async () => {
  const menus: Menu[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return { props: { menus } };
} 

console.error(getStaticProps);