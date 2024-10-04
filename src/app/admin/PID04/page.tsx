"use client";

import { useEffect, useRef, useState } from "react";
import menus from "../../../../data/menu.json";
import AddMenu from "./addMenu";
import styles from "../../css/list.module.css";
import Header from "@/app/components/header";

const PID04 = () => {
  const field: { id: keyof Menu; title: string }[] = [
    { id: "menu_id", title: "메뉴 ID" },
    { id: "menu_name", title: "메뉴 이름" },
    { id: "menu_order", title: "메뉴 순서" },
    { id: "upper_menu", title: "상위메뉴ID" },
    { id: "menu_url", title: "URL" },
    { id: "use_yn", title: "사용 여부" },
    { id: "menu_authorizaion", title: "메뉴 권한" },
  ];

  // 클릭 상태 관리
  const [cliked, setCliked] = useState<{ [key: string]: boolean }>({});
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [showModal, setShowModal] = useState(false);

  // li useRef
  const liRef = useRef<null[] | HTMLLIElement[]>([]);

  // input state
  const [inputValue, setInputValue] = useState<any>("");

  // menu update api
  const updateMenu = async () => {
    // console.log("input value====================================", JSON.stringify(inputValue));

    confirm("메뉴를 수정하시겠습니까?");
    {
      const fetchOption = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue),
      };
      const res = await fetch("/api/menu/updateMenu", fetchOption);
    }
    return;
  };

  // menu delete api
  const deleteMenu = async () => {
    confirm("메뉴를 삭제하시겠습니까?");
    {
      const fetchOption = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedMenu),
      };
      const res = await fetch("/api/menu/deleteMenu", fetchOption);
    }
    return;
  };

  // input state init
  const initInputValue = (menu?: Menu) => {
    if (!menu) {
      field.map((input) => {
        return setInputValue({ [input.id]: "" });
      });
    } else {
      field.forEach((input) => {
        setInputValue((prevValues: any) => ({
          ...prevValues,
          [input.id]: menu[input.id],
        }));
      });
    }
  };

  // 메뉴 클릭 시 상태 토글
  const toggleMenu = async (menuId: string, e: any) => {
    // 이벤트 전파 방지
    e.stopPropagation();

    const tmp = menus.find((menu) => menu.menu_id === menuId);

    // console.log("tmp =========================", menuId.length);
    // console.log("클릭된 메뉴 ==========================", cliked);
    if (tmp?.menu_id.length === 4) {
      setCliked((prevState) => ({
        ...prevState,
        [menuId]: !prevState[menuId],
      }));
    }
    const activeMenu = (e: any) => {
      // dataset 의 key 값 가져오기
      const menuKey = e.currentTarget.getAttribute("key");

      console.log("menuId =========================", menuKey);

      // console.log("위치확인 =========================")
      // 모든 li classlist 를 순회해서 클릭되지 않은 li 의 "clicked" 클래스 삭제
      liRef.current.forEach((li) => {
        li?.classList.remove("clicked");
      });
      // console.log("위치확인2 =========================")
      e.target.getAttribute("key") === menuKey
        ? e.target.classList.add("clicked")
        : null;
    };

    activeMenu(e);

    if (tmp) {
      selectMenu(tmp);
      initInputValue(tmp!);
    }

    console.log(cliked);
  };

  // 메뉴 선택
  const selectMenu = (menu: Menu) => {
    setSelectedMenu(menu);
  };

  const toggleModal = (e?: any) => {
    const className = e.target.className;

    className === "" ||
    className === "modal-content" ||
    className === "button-wrapper"
      ? null
      : setShowModal(!showModal);
  };

  useEffect(() => {
    fetch("/api/menu");
    initInputValue(selectedMenu!);
    // console.log("menus", menus);
    // console.log("ref 확인========================", liRef.current);
  }, [selectedMenu, liRef]);

  //  클릭된 menu의 detail 정보 가져오기
  const showDetail = () => {
    return selectedMenu
      ? field.map((input) => {
          return (
            <div className="dust-class">
              <label htmlFor={input.id}>{input.title}</label>{" "}
              <input
                onChange={(e) => {
                  setInputValue((prevValues: any) => ({
                    ...prevValues,
                    [input.id]: e.target.value,
                  }));
                }}
                id={input.id}
                value={inputValue[input.id]}
                key={input.id}
              />
              <br />
            </div>
          );
        })
      : field.map((input) => {
          return (
            <div className="dust-class">
              <label htmlFor={input.id}>{input.title}</label>{" "}
              <input
                id={input.id}
                value={inputValue[input.id]}
                key={input.id}
              />
              <br />
            </div>
          );
        });
  };

  return (
    <div className="container">
      {showModal && (
        <div className="modal" onClick={(e) => toggleModal(e)}>
          <AddMenu modal={toggleModal} />
        </div>
      )}
      <Header />
      <div className="contents-box">
        <div className="item">
          <h2 className="menu-title">메뉴 목록</h2>
          <ul className={styles.list}>
            {menus.map((menu, i) =>
              menu.upper_menu === "" ? (
                <>
                  <li
                    className={styles.listItem}
                    key={menu.menu_id}
                    ref={(el) => {
                      // console.log("el 이 뭐야 ========================", el),
                      liRef.current[i] = el;
                    }}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => toggleMenu(menu.menu_id, e)}
                  >
                    {menu.menu_name}
                  </li>
                  {cliked[menu.menu_id] &&
                    menus
                      .filter((subMenu) => subMenu.upper_menu === menu.menu_id)
                      .map((subMenu, si) => (
                        <ul className={styles.list} key={subMenu.menu_id}>
                          <li
                            className={styles.listItem}
                            ref={(el) => {
                              liRef.current[(i + 1) * 10 + si] = el;
                            }}
                            onClick={(e) => toggleMenu(subMenu.menu_id, e)}
                          >
                            &nbsp;{subMenu.menu_name}
                          </li>
                        </ul>
                      ))}
                </>
              ) : null
            )}
          </ul>
        </div>
        <div className="item">
          {showDetail()}
          <div className="button-wrapper">
            <button className="button" onClick={toggleModal}>
              추가
            </button>{" "}
            &nbsp;
            <button className="button" onClick={updateMenu}>
              수정
            </button>{" "}
            &nbsp;
            <button className="button" onClick={deleteMenu}>
              삭제
            </button>{" "}
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  );
};

export default PID04;
