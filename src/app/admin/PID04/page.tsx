'use client'

import { useEffect, useState } from 'react';
import menus from '../../../../data/menu.json';
import AddMenu from './addMenu';

interface AddMenuProps {
    modal: () => void;
  } 

const PID04 = () => {
    
    const field : {id : keyof Menu, title: string} [] = [
        {id : "menu_id", title : "메뉴 ID"},
        {id : "menu_name", title : "메뉴 이름"},
        {id : "menu_order", title : "메뉴 순서"},
        {id : "upper_menu", title : "상위메뉴ID"},
        {id : "menu_url", title : "URL"},
        {id : "use_yn", title : "사용 여부"},
        {id : "menu_authorizaion", title : "메뉴 권한"},
    ]

    
    // 클릭 상태 관리
    const [cliked, setCliked] = useState<{[key : string ]: boolean}>({});
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
    const [showModal, setShowModal] = useState(false);


    // input state
    const [inputValue, setInputValue] = useState<any>("");

    // input state init
    const initInputValue = (menu? : Menu) => {
        if (!menu) {
            field.map((input) => {
                return setInputValue({[input.id] : ""})
            })
        } else {
            field.forEach(input => {
                setInputValue((prevValues: any)  => ({
                    ...prevValues,
                    [input.id] : menu[input.id]
                }))
            })
        }
    }

    // 메뉴 클릭 시 상태 토글
    const toggleMenu = async (menuId : string) => {
        setCliked(prevState => ({
            ...prevState,
            [menuId]: !prevState[menuId]
        }));

        const tmp = menus.find((menu) => menu.menu_id === menuId );
        
        if (tmp)  {
            selectMenu(tmp);
            
            initInputValue(tmp!);
        }
        

        console.log(cliked);
    };  
    
    // 메뉴 선택
    const selectMenu = (menu : Menu) => {
        setSelectedMenu(menu);        
        
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    useEffect(() => {
        initInputValue(selectedMenu!);
    }, [selectedMenu])
    

    const showDetail = () => {
        return  (
            selectedMenu ? 
        field.map((input) => {
            return (
                <>
                <label htmlFor={input.id}>{input.title}</label> <input id={input.id} value={inputValue[input.id]}/><br/>
                </>
            )
        }) : 
        field.map((input) => {
            return (
                <>
                <label htmlFor={input.id}>{input.title}</label> <input id={input.id} value={inputValue[input.id]}/><br/>
                </>
            )
        })
        )
    }



    return (
        <>
        <div>
            <h4>PID04 메뉴관리 페이지</h4>
            <div className='container'>
                <div>
                    <h2>메뉴 목록</h2>
                    
                    <div>
                        {menus.map((menu) => (
                            menu.upper_menu == '' ? <li>
                                <span style={{cursor: 'pointer'}} onClick={() => toggleMenu(menu.menu_id)}>{menu.menu_name}</span>
                                    {cliked[menu.menu_id] && <ul> {menus.filter(subMenu => subMenu.upper_menu === menu.menu_id).map(subMenu => (
                                        <li onClick={() => {selectMenu(subMenu); console.log(subMenu)}}>&nbsp;{subMenu.menu_name}</li>
                                ))}
                            </ul>}
                            </li> : null
                        ))}    
                    </div>
                </div>
                <div>
                <div>
                    {showDetail()}
                </div>
                <button onClick={toggleModal}>추가</button> &nbsp;
                <button>수정</button> &nbsp;
                <button>삭제</button> &nbsp;
                </div>
            </div>            
        </div>
        {showModal &&<AddMenu modal={toggleModal} />}
        </>
    )
};

export default PID04;