"use client";

import Header from "@/app/components/header";
import { PagiNation } from "@/app/components/pagination";
import Link from "next/link";
import { useEffect } from "react";

const PID0301 = () => {
  const getBanners = async () => {
    const banners = await fetch("/api/banner", { method: "GET" });

    const result = await banners.json();

    console.log(result.data);
  };

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="contents-box">
        <div className="item">
          <table className="table">
            <thead>
              <tr>
                <th>배너 ID</th>
                <th>배너 제목</th>
                <th>배너 이미지</th>
                <th>상태</th>
                <th>배너 위치</th>
                <th>시작일</th>
                <th>종료일</th>
                <th>등록일</th>
                <th>클릭 수 통계</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={9}>등록된 배너가 없습니다.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <PagiNation total={100000} limit={200} page={1} offset={5} />
      <div className="button-wrapper">
        {/* 등록 버튼을 누르면 PID0301/Insert?page=등록 으로 이동 */}
        <Link className="button" href="/admin/PID0301/Insert">
          배너 등록
        </Link>

        <button className="button">수정</button>
        <button className="button">삭제</button>
      </div>
    </div>
  );
};

export default PID0301;
