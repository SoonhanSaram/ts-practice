'use client';

export default function Page() {

    const onPressEnter = async (e : any) => {
        const key = e.key;
        
        if (key === "Enter") {
            // "Enter" 키를 눌렀을 때 API 호출
            const res = await fetch(`/api/route`);
            if (!res.ok) {
              console.error('Network response was not ok');
              return;
            }
            const data = await res.json();
            console.log(data);
          }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div>
                <h3>push alarm</h3>
                <div>
                    <input className="border-2 border-gray-300" type="text" placeholder="보내고 싶은 메시지를 적어주세요" onKeyDown={(e) => onPressEnter(e)}/>
                </div>
            </div>
        </div>
    );
}

