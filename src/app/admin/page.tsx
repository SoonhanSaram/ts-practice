'use client'


import menus from '../../../data/menu.json';
import { useEffect } from 'react';


export default function Page() {

    // const onPressEnter = async (e : any) => {
    //     const key = e.key;

    //     if (key === "Enter") {
    //         // fetchoption
    //         const fecthOption = {
    //             method: "GET",               
    //         };
    //         // "Enter" 키를 눌렀을 때 API 호출
    //         const res = await fetch(`/api/hello`, fecthOption);
    //         if (!res.ok) {
    //           console.error('Network response was not ok');
    //           return;
    //         }
    //         const data = await res.json();
    //         console.log(data.message);
            

    //         if (data.message) {
    //             // setMessage(data.message);
    //             alertMessage(data.message);
    //         } else {
    //             setMessage('message 가 없습니다.'); // default
    //         }
            
    //     }       
        
    // }

    const menuFetch = async () => {
        const fecthOption = {
            method: "GET",               
        };
    const res = await fetch(`/api/menu`, fecthOption);
        if (!res.ok) {
          console.error('Network response was not ok');
          return;
        }
        const data = await res.json();
        console.log(data.message);
    }

    useEffect(() => {
        menuFetch();
    })


    const filteredMenus = menus.filter(menu => menu.menu_id.length == 4);

    return (
        <div className="warapper">            
            <div className="container">                
                <div>
                    {/* <input className="border-2 border-gray-300" type="text" placeholder="보내고 싶은 메시지를 적어주세요" onKeyDown={(e) => onPressEnter(e)}/> */}
                </div>

                <div>
                    <span></span>
                </div>
            </div>
        </div>
    );
}

