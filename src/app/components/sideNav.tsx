'use client'
import Link from 'next/link';
import menus from '../../../data/menu.json'
import { useEffect, useState } from 'react';
import { VscChevronDown, VscChevronUp, VscHome, VscSignOut, VscStarFull } from "react-icons/vsc";
const SideNav = () => {

    const filteredMenus = menus.filter(menu => menu.upper_menu === "" && menu.use_yn === 'y');
    const [clicked, setClicked] = useState();
    // {menus.map((menu, i) => (
        // menu.upper_menu == '' ? <li ref={ (el) => {liRef.current[i] = el}} style={{cursor: 'pointer'}} key={menu.menu_id} onClick={e => toggleMenu(menu.menu_id, e)}>{menu.menu_name}
                {/* {cliked[menu.menu_id] && menus.filter(subMenu => subMenu.upper_menu === menu.menu_id).map((subMenu, si) => ( */}
                    // <li ref={(el) => {liRef.current[i*10+si] = el}} onClick={(e) => toggleMenu(subMenu.menu_id, e)} key={subMenu.menu_id}>&nbsp;{subMenu.menu_name}</li>
            // ))
        // }
        {/* </li> : null */}
    // ))}    

    const onClick = (e : any) => {
        const menuId = e.target.getAttribute('data-key');

        // 이미 클릭되어 있다면 toggle 시키고 아니라면 추가
        if (clicked) {
            setClicked(clicked === menuId ? null : menuId);
        } else {
            setClicked(menuId);
        }
    }

    useEffect(() => {

    }, [clicked])

    

    return (
        <div className='navbar'>
            <div className='row-container'>
                <Link href="/admin"><VscHome className='row-item'/></Link> <VscStarFull className='row-item'/> <VscSignOut className='row-item'/>
            </div>
        {filteredMenus.map((menu) => (
            <ul className="nav-menu">
                <li data-key={menu.menu_id}>
                    {menu.menu_url ? (
                        <Link href={`/${menu.menu_url}`}>{menu.menu_name} </Link>
                        // menu 에 연결된 url 에 없을 경우만 하위 메뉴를 알릴 수 있는 image 가 표출되게 함
                    ) : <a data-key={menu.menu_id} onClick={(e)=> onClick(e)}>{menu.menu_name}  {clicked === menu.menu_id ? <VscChevronDown/>: <VscChevronUp/>}</a>}
                        {clicked === menu.menu_id && <ul className='sub-menu'>
                        {menus.filter(subMenu => subMenu.upper_menu === menu.menu_id).map((subMenu) => (
                         <li className='depth-2' key={subMenu.menu_id}> <Link href={`/${subMenu.menu_url}`}>{subMenu.menu_name}</Link></li>
                        ))}
                    </ul>} 
                </li>
            </ul>
         ))}
         </div>
    )
}

export default SideNav;