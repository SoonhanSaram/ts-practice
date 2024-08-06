import { getStaticProps } from "next/dist/build/templates/pages";
import { useState } from "react";
interface AddMenuProps {
  modal: () => void;
}

const AddMenu = ({ modal }: AddMenuProps) => {
  const [inputValue, setInputValue] = useState<any>({});

  const field: { id: keyof Menu; title: string }[] = [
    { id: "menu_id", title: "메뉴 ID" },
    { id: "menu_name", title: "메뉴 이름" },
    { id: "menu_order", title: "메뉴 순서" },
    { id: "upper_menu", title: "상위메뉴ID" },
    { id: "menu_url", title: "URL" },
    { id: "use_yn", title: "사용 여부" },
    { id: "menu_authorizaion", title: "메뉴 권한" },
  ];

  // insert api 호출
  const addMenu = async () => {
    console.log(JSON.stringify(inputValue));

    inputValue["upper_url"] === null
      ? setInputValue((prevValues: any) => ({ ...prevValues, upper_url: "" }))
      : setInputValue(inputValue);

    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValue),
    };
    const res = await fetch("/api/menu/insertMenu", fetchOption);

    console.log(await res.json());

    modal();
  };

  // 인풋 밸류 함수
  const onChangeValue = (e: any) => {
    const { id, value } = e.target;
    setInputValue((prevValues: any) => ({
      ...prevValues,
      [id]: value,
    }));

    console.log(inputValue);
  };

  return (
      <div className="modal-content">
        <h1 className="menu-title">메뉴 추가</h1>
        <div>
          {field.map((input) => {
            return (
              <div className="dust-class">
                <label htmlFor={input.id}>{input.title}</label>{" "}
                <input
                  id={input.id}
                  onChange={(e) => onChangeValue(e)}
                  value={inputValue[input.id]}
                />{" "}
                {input.title == "메뉴 권한" && (
                  <p>'admin', 'user' 만 사용가능</p>
                )}
                <br />
              </div>
            );
          })}
        </div>
        <div className="button-wrapper">
          <button className="button" onClick={addMenu}>메뉴 추가</button>
          <button className="button" onClick={modal}>취 소</button>
        </div>
      </div>
  );
};

export default AddMenu;
