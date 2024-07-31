'use client'

import { useState } from 'react';
import menus from '../../../../data/menu.json';

interface Menu {
    menu_id: string;
    menu_name: string;
    menu_order: number;
    upper_menu: string;
    menu_url: string;
    use_yn: string;
    menu_authorizaion: string;
  }

const PID04 = () => {
    
    
    // 클릭 상태 관리
    const [cliked, setCliked] = useState<{[key : string ]: boolean}>({});
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

    // 메뉴 클릭 시 상태 토글
    const toggleMenu = (menuId : string) => {
        setCliked(prevState => ({
            ...prevState,
            [menuId]: !prevState[menuId]
        }));

        const tmp = menus.find((menu) => menu.menu_id === menuId );
        
        if(tmp) {
            selectMenu(tmp);
        }
        

        console.log(cliked);
    };  
    
    // 메뉴 선택
    const selectMenu = (menu : Menu) => {
        setSelectedMenu(menu);
    };

    return (
        <div>
            <h4>PID04 메뉴관리 페이지</h4>
            <div className='container'>
                <div>
                    <h2>메뉴 목록</h2>
                    
                    <div>
                        {menus.map((menu) => (
                            menu.upper_menu == '' ? <li>
                                <span style={{cursor: 'pointer'}} onClick={() => toggleMenu(menu.menu_id)}>{menu.menu_name}</span>
                                    {cliked[menu.menu_id] &&<ul> {menus.filter(subMenu => subMenu.upper_menu === menu.menu_id).map(subMenu => (
                                        <li onClick={() => selectMenu(subMenu)}>&nbsp;{subMenu.menu_name}</li>
                                ))}
                            </ul>}
                            </li> : null
                        ))}    
                    </div>
                </div>
                <div>
                <div>
                    <label htmlFor="menu_id">메뉴 ID</label>     <input id="menu_id" value={selectedMenu?.menu_id || ''} readOnly/><br/>
                    <label htmlFor="menu_name">메뉴 이름</label> <input id="menu_name" value={selectedMenu?.menu_name || ''}/><br/>
                    <label htmlFor="menu_order">메뉴 순서</label> <input id="menu_order" value={selectedMenu?.menu_order || ''}/><br/>
                    <label htmlFor="upper_menu">상위메뉴ID</label><input id="upper_menu" value={selectedMenu?.upper_menu || ''}/> <br/>
                    <label htmlFor="menu_url">URL</label>       <input id="menu_url" value={selectedMenu?.menu_url || ''}/><br/>
                    <label htmlFor="use_yn">사용여부</label>  <input id="use_yn" value={selectedMenu?.use_yn || ''}/><br/>
                    <label htmlFor="menu_authorizaion">메뉴 권한</label> <input id="menu_authorizaion" value={selectedMenu?.menu_authorizaion || ''}/><br/>
                </div>
                <button>추가</button> &nbsp;
                <button>수정</button> &nbsp;
                <button>삭제</button> &nbsp;
                </div>
            </div>
        </div>

    )
};

export default PID04;