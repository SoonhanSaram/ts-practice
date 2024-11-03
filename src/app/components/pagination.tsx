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
  const [filteredPages, setFilteredPages] = useState<number[]>([]);
  console.log(pages);

  const paging = () => {
    const groupSize = 5;
    // 현재 페이지가 속한 그룹의 시작 페이지와 끝 페이지 계산
    const startPage = Math.floor((start - 1) / groupSize) * groupSize + 1;
    console.log(startPage);
    const endPage = Math.min(startPage + groupSize - 1, pages);

    // 페이지 리스트 생성
    const filtered = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    setFilteredPages(filtered);
  };

  const pagination = () => {
    console.log(filteredPages);
    return (
      <>
        {filteredPages.map((item: any) => (
          <li
            key={item}
            className={item === start ? "clicked" : "none"}
            onClick={() => setStart(item)}
          >
            {item}
          </li>
        ))}
      </>
    );
  };

  useEffect(() => {
    paging();
  }, [start, pages]);

  return (
    <ul className="pagination">
      {start !== 1 ? (
        <>
          <li onClick={() => setStart(1)}> &#60;&#60;</li>
          <li onClick={() => setStart(start - 1)}> &#60;</li>
        </>
      ) : null}
      {pagination()}
      {start !== pages ? (
        <>
          <li onClick={() => setStart(start + 1)}> &#62;</li>
          <li onClick={() => setStart(pages)}> &#62;&#62;</li>
        </>
      ) : null}
    </ul>
  );
};
