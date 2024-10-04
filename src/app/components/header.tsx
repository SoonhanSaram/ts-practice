"use client";

import { usePathname, useSearchParams } from "next/navigation";
import menus from "../../../data/menu.json";
import { useEffect, useState } from "react";

const Header = () => {
  const [title, setTitle] = useState("");
  const pathname = usePathname().substring(1);
  const params = useSearchParams();
  const extraPage = params.get("page");
  // 초기버전
  useEffect(() => {
    // const start = window.performance.now();
    // console.log('pathname ========================', pathname);
    const currentMenu = menus.filter((menu) => menu.menu_url === pathname)[0];
    if (currentMenu.upper_menu !== "") {
      const depth2 = menus.filter(
        (menu) => menu.menu_id === currentMenu.upper_menu
      )[0];
      const depth1 =
        depth2.upper_menu !== ""
          ? menus.filter((menu) => menu.menu_id === depth2.upper_menu)[0]
          : null;
      depth2 && !depth1
        ? setTitle(`${depth2.menu_name} > ${currentMenu.menu_name}`)
        : depth2 && depth1
        ? setTitle(
            `${depth1.menu_name} > ${depth2.menu_name} > ${currentMenu.menu_name}`
          )
        : null;
    } else {
      setTitle(currentMenu.menu_name);
    }

    // const end = window.performance.now();
    // console.log('time =================================', end - start);
  }, [pathname, extraPage]);

  return (
    <>
      <h4>{title}</h4>
    </>
  );
};

export default Header;
