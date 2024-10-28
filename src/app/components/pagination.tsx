import { useEffect, useState } from "react";

interface Props {
  total: number;
  limit: number;
  page: number;
  offset: number;
}

export const PagiNation = (
  { total, limit, page, offset }: Props,
  route: any
) => {
  const pages = Math.ceil(total / offset);
  const [start, setStart] = useState(1);

  console.log(pages);

  const paging = () => {
    const groupSize = 5;
    // 현재 페이지가 속한 그룹의 시작 페이지와 끝 페이지 계산
    const startPage = Math.floor((start - 1) / groupSize) * groupSize + 1;
    const endPage = Math.min(startPage + groupSize - 1, pages);

    // 페이지 리스트 생성
    const filteredPages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    return (
      <ul>
        {filteredPages.map((item: any, i: number) => (
          <li
            key={item}
            className={i + 1 === start ? "clicked" : "none"}
            onClick={() => setStart(item)}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <ul>
      {start !== 1 ? (
        <li>
          <span onClick={() => setStart(1)}> &#60;&#60;</span>
          <span onClick={() => setStart(start - 1)}> &#60;</span>
        </li>
      ) : null}
      {paging()}
      {start !== pages ? (
        <li>
          <span onClick={() => setStart(start + 1)}> &#62;</span>
          <span onClick={() => setStart(pages)}> &#62;&#62;</span>
        </li>
      ) : null}
    </ul>
  );
};
