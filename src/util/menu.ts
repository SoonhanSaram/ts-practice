import { GetStaticProps } from "next";
import path from "path";
import fs from 'fs';

const folderPath = path.join(process.cwd(), 'data');
const filePath = path.join(folderPath, 'menu.json');

export const fetchMenus = async () : Promise<Menu[]> => {
  const menus: Menu[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return menus;
} 
