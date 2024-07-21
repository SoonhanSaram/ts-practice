'use client';

import { useState } from "react";

export default function Page() {
 
    const [message, setMessage] = useState("");
   
    const alertMessage = (message : string) => {
        alert(message);
    }


    const onPressEnter = async (e : any) => {
        const key = e.key;

        if (key === "Enter") {
            // fetchoption
            const fecthOption = {
                method: "GET",               
            };
            // "Enter" 키를 눌렀을 때 API 호출
            const res = await fetch(`/api/hello`, fecthOption);
            if (!res.ok) {
              console.error('Network response was not ok');
              return;
            }
            const data = await res.json();
            console.log(data.message);
            

            if (data.message) {
                // setMessage(data.message);
                alertMessage(data.message);
            } else {
                setMessage('message 가 없습니다.'); // default
            }
            
        }       
        
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div>
                <h3>push alarm</h3>
                <p>{message}</p>
                <div>
                    <input className="border-2 border-gray-300" type="text" placeholder="보내고 싶은 메시지를 적어주세요" onKeyDown={(e) => onPressEnter(e)}/>
                </div>
            </div>
        </div>
    );
}

