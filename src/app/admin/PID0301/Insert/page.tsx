"use client";
import Header from "@/app/components/header";
import { set } from "firebase/database";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

/**
 * 배너 등록 페이지
 * @returns 배너 등록 페이지
 */
const Insert = () => {
  const [selected, setSelected] = useState("option1");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [previewURL, setPreviewURL] = useState("");

  const defaultImage = (e: any) => {
    e.target.src = null;
  };

  const selectImage = (e: any) => {
    const file = e.target.files[0];

    const getURL = URL.createObjectURL(file);
    setPreviewURL(getURL);

    console.log(file);
  };

  //  사용자가 입력할 때의 처리
  const handleChange = (e: any, setTime: any) => {
    let input = e.target.value.replace(/\D/g, ""); // 숫자가 아닌 모든 문자 제거

    console.log(input);

    if (input.length === 0) {
      setTime("");
      return;
    }

    // 최대 4자리 숫자로 제한
    if (input.length > 4) {
      input = input.substring(0, 4);
    }

    // let hour = input.length >= 2 ? parseInt(input.substring(0, 2)) : null;
    // let minute = input.length === 4 ? parseInt(input.substring(2, 4)) : null;

    let hour = parseInt(input.substring(0, 2));
    let minute = input.length >= 3 ? parseInt(input.substring(2, 4)) : null;

    if (hour !== null && hour > 23) {
      hour = 23;
    }

    if (minute !== null && minute > 59) {
      minute = 59;
    }

    // 시간 또는 분이 null일 경우 빈 문자열 처리
    const formattedHour = hour !== null ? hour.toString().padStart(2, "") : "";
    const formattedMinute =
      minute !== null ? minute.toString().padStart(2, "") : "";

    // 완전한 시간이 입력되었을 경우 HH:MM 형식으로 표시, 아니라면 시간만 표시
    const formattedTime = formattedMinute
      ? `${formattedHour}:${formattedMinute}`
      : formattedHour;

    setTime(formattedTime);
  };

  return (
    <div className="container">
      <h4>배너 등록</h4>
      <div className="contents-box">
        <div className="item">
          <div className="dust-class">
            <label htmlFor="bannerTitle">배너 제목</label>
            <input id="bannerTitle" type="text" />
          </div>
          <div>
            <h4>이미지 미리보기</h4>
            <div
              style={{
                width: "150px",
                height: "180px",
                border: "1px solid black",
              }}
            >
              <img
                src={previewURL}
                alt="preview img"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                onError={(e) => defaultImage(e)}
              />
            </div>
          </div>
          <div className="dust-class">
            <span>배너 사용여부</span>
            <div className="toggle-group">
              <input
                type="radio"
                id="option1"
                name="toggle"
                checked={selected === "option1"}
                onChange={() => setSelected("option1")}
              />
              <label htmlFor="option1">사용</label>

              <input
                type="radio"
                id="option2"
                name="toggle"
                checked={selected === "option2"}
                onChange={() => setSelected("option2")}
              />
              <label htmlFor="option2">미사용</label>

              <div className={`slider ${selected}`}></div>
            </div>
          </div>
          <div className="dust-class">
            <label>배너 위치 </label>
            <input type="number" />
          </div>
          <div className="dust-class">
            <label>시작일</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="dust-class">
            <label>시작 시간</label>
            <input
              type="text"
              value={startTime}
              onChange={(e) => handleChange(e, setStartTime)}
              maxLength={5}
              placeholder="00:00"
            />
          </div>
          <div className="dust-class">
            <label>종료일</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
          <label>
            종료 시간
            <input
              type="text"
              value={endTime}
              onChange={(e) => handleChange(e, setEndTime)}
              maxLength={5}
              placeholder="00:00"
            />
          </label>
        </div>
      </div>
      <div className="button-wrapper">
        <label>
          <span className="button">배너 이미지</span>
          <input
            className="input-file"
            type="file"
            accept="image/*"
            onChange={(e) => selectImage(e)}
          />
        </label>
        <span className="button" onClick={() => setPreviewURL("")}>
          배너 이미지 삭제
        </span>
        <span className="button">배너 저장</span>
      </div>
    </div>
  );
};

export default Insert;
