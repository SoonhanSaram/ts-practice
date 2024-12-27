"use client";

import Header from "@/app/components/header";
import { PagiNation } from "@/app/components/pagination";
import { AppDispatch, RootState } from "@/redux/store";
import { limit } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bbsitem, { setBbsItem } from "@/redux/bbsitem";

interface args {
  offset: number;
  limit: number;
  page: number;
}
const PID0301 = () => {
  const [banners, setBanners] = useState([]);
  // const [offset, setOffset] = useState(0);
  // const [limit, setLimit] = useState(10);
  // const [length, setLength] = useState(0);

  // redux 사용준비
  const dispatch: AppDispatch = useDispatch();

  const bbsItem = useSelector((state: RootState) => state.bbsItem.bbsItemList);
  const updateBbsItemList = (newBbsItemList?: []) => {
    dispatch(setBbsItem.setBbsItem(newBbsItemList!));
  };

  const getBanners = async (args?: args) => {
    console.log("offset, limit, page", args!.limit, args!.offset, args!.page);

    const { page, offset, limit } = args!;

    const banners = await fetch(`/api/banner/list/${page}/${offset}/${limit}`, {
      method: "GET",
    });

    const result = await banners.json();

    // 전체 리스트 개수
    return result;
  };

  useEffect(() => {}, [bbsItem]);

  const bannerList = () => {
    return bbsItem.map((banner: Banner, i) => (
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
              {bbsitem.length > 0 ? (
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
      <PagiNation
        limit={5}
        page={1}
        offset={5}
        route={() => getBanners()}
        dispatch={() => updateBbsItemList()}
      />
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
