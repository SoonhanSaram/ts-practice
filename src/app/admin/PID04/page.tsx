'use client'

import { useEffect, useRef, useState } from 'react';
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
 
    // li useRef
    const liRef = useRef<null[] | HTMLLIElement[]>([]);

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
    const toggleMenu = async (menuId : string, e : any) => {

        // 이벤트 전파 방지
        e.stopPropagation();

        const tmp = menus.find((menu) => menu.menu_id === menuId );

        // console.log("tmp =========================", menuId.length);
        // console.log("클릭된 메뉴 ==========================", cliked);
        if (tmp?.menu_id.length === 4) {
            setCliked(prevState => ({
                ...prevState,
                [menuId]: !prevState[menuId]
            }));
        }
        const activeMenu = (e : any) => {
            // console.log("위치확인 =========================")
            // 모든 li classlist 를 순회해서 클릭되지 않은 li 의 "clicked" 클래스 삭제
            liRef.current.forEach((li) => {                
                li?.classList.remove("clicked");
            })
            // console.log("위치확인2 =========================")
            e.target.classList.add("clicked");
        }

        activeMenu(e);

        console.log('ref 확인========================' , liRef.current);
        
        
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
                <label htmlFor={input.id}>{input.title}</label> <input id={input.id} value={inputValue[input.id]} key={input.id}/><br/>
                </>
            )
        }) : 
        field.map((input) => {
            return (
                <>
                <label htmlFor={input.id}>{input.title}</label> <input id={input.id} value={inputValue[input.id]} key={input.id}/><br/>
                </>
            )
        })
        )
    }



    return (
        
            <div>
                <h4>PID04 메뉴관리 페이지</h4>
                <div className='container'>
                    <div>
                        <h2>메뉴 목록</h2>
                        <div>
                            {menus.map((menu, i) => (
                                menu.upper_menu == '' ? <li ref={ (el) => {liRef.current[i] = el}} style={{cursor: 'pointer'}} key={menu.menu_id} onClick={e => toggleMenu(menu.menu_id, e)}>{menu.menu_name}
                                        {cliked[menu.menu_id] && menus.filter(subMenu => subMenu.upper_menu === menu.menu_id).map((subMenu, si) => (
                                            <li ref={(el) => {liRef.current[i*10+si] = el}} onClick={(e) => toggleMenu(subMenu.menu_id, e)} key={subMenu.menu_id}>&nbsp;{subMenu.menu_name}</li>
                                    ))
                                }
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
                {showModal &&<AddMenu modal={toggleModal} />}
            </div>
        
        
    )
};

export default PID04;