import db from '../../../db/index.js';
import path from "path";
import fs from 'fs';
import { NextResponse } from "next/server.js";
const menu = db.models.menus;
const folderPath = path.join(process.cwd(), 'data');
const filePath = path.join(folderPath, 'menu.json');

export async function PUT (req: Request, res : NextResponse) {

    const updateMenu = await req.json();
    
    try {
     const result = await db.sequelize.transaction(async (t : any) => {
         const update = await menu.update(updateMenu, {where : {menu_id : updateMenu.menu_id}, transaction : t})
     });

     const findAllMenu = await menu.findAll();

     if(!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
     }

     // 사용 여부 확인
    //  const filteredMenu = findAllMenu.filter((menu : any) => menu.use_yn === 'y');
     fs.writeFile(filePath, JSON.stringify(findAllMenu, null, 2), 'utf8', (err : any) => {
        if (err) {
          console.error(err);
          return;
        }        
      });

      return NextResponse.json({status : 200, payload : "업데이트 완료"});

    } catch (error) {
        console.error(error);
        return NextResponse.json({status : 300, payload : error});
    }
}

