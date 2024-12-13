"use client";

import Header from "@/app/components/header";
import { PagiNation } from "@/app/components/pagination";
import Link from "next/link";
import { useEffect, useState } from "react";

const PID0301 = () => {
  const [banners, setBanners] = useState([]);

  const getBanners = async () => {
    const banners = await fetch("/api/banner", { method: "GET" });

    const result = await banners.json();

    setBanners(result.data);
    console.log("데이터 ", result);
  };

  const bannerList = () => {
    return banners.map((banner: Banner, i) => (
      <tr key={banner.banner_seq}>
        <td>{i + 1}</td>
        <td>{banner.banner_title}</td>
        <td></td>
        <td>{banner.banner_used}</td>
        <td>{banner.banner_location}</td>
        <td>{banner.banner_sdate}</td>
        <td>{banner.banner_edate}</td>
        <td>{banner.banner_registrant}</td>
        <td>{banner.banner_count}</td>
      </tr>
    ));
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
                <th>등록한 사용자</th>
                <th>클릭 수 통계</th>
              </tr>
            </thead>
            <tbody>
              {banners.length > 0 ? (
                bannerList()
              ) : (
                <tr>
                  <td colSpan={9}>등록된 배너가 없습니다.</td>
                </tr>
              )}
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
