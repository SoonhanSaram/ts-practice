import db from '../../../db/index.js';
import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';

const menu = db.models.menus;
const folderPath = path.join(process.cwd(), 'data');
const filePath = path.join(folderPath, 'menu.json');

export async function DELETE (req: Request, res : NextResponse) {
    const deleteMenu = await req.json();

    try {
        const result = await db.sequelize.transaction(async (t : any) => {
            const destory = await menu.destroy({where : {menu_id : deleteMenu.menu_id}, transaction : t})
        })

        const findAllMenu = await menu.findAll();

        if(!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        // 사용 여부 확인
        // const filteredMenu = findAllMenu.filter((menu : any) => menu.use_yn === 'y');

        fs.writeFile(filePath, JSON.stringify(findAllMenu, null, 2), 'utf8', (err : any) => {
            if (err) {
                console.error(err);
                return;
            }
        });

        return NextResponse.json({status : 200, payload : "삭제 완료"});

    } catch (error) {
        console.error(error);
        return NextResponse.json({status : 300, payload : error});
    }
}