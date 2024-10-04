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
  const [startDisplayTime, setStartDisplayTime] = useState("00:00");
  const [endDisplayTime, setEndDisplayTime] = useState("00:00");
  const [isFocused, setIsFocused] = useState(false);

  // 시간 마스킹을 위한 함수
  const maskTime = (val: string) => {
    const hours = val.substring(0, 2) || "00";
    const minutes = val.substring(2, 4) || "00";
    return `${hours}:${minutes}`;
  };

  //  사용자가 입력할 때의 처리
  const handleChange = (e: any, setTime: any, setDisplayTime: any) => {
    let input = e.target.value.replace(/\D/g, ""); // 숫자가 아닌 모든 문자 제거

    // 최대 4자리 숫자로 제한
    if (input.length > 4) {
      input = input.substring(0, 4);
    }

    // 입력한 숫자에 따라 포맷 적용
    let formattedInput;
    if (input.length <= 2) {
      // 2자리 미만일 경우 HH만 표시
      formattedInput = input.padEnd(2, "0");
    } else {
      // 3자리 이상일 경우 HH:MM으로 표시
      const hours = input.substring(0, 2);
      const minutes = input.substring(2, 4).padEnd(2, "0");
      formattedInput = `${hours}${minutes}`;
    }

    // 시간 범위체크 (23:59 이내로 제한)

    let hour = parseInt(input.substring(0, 2)) || 0;
    let minute = parseInt(input.substring(2, 4)) || 0;

    if (hour > 23) {
      hour = 23;
    }

    if (minute > 59) {
      minute = 59;
    }

    setTime(formattedInput);
    setDisplayTime(formattedInput);
  };

  const handleFocus = (time: any, setDisplayTime: any) => {
    setIsFocused(true);
    if (time === "") setDisplayTime("");
  };

  // 포커스가 해제되었을 때 마스킹 처리
  const handleBlur = (time: any, setDisplayTime: any) => {
    setIsFocused(false);
    if (time === "") {
      setDisplayTime("00:00"); // 빈 값일 경우 기본 마스크값 표시
    }
  };

  return (
    <div className="container">
      <h4>배너 등록</h4>
      <div className="contents-box">
        <div className="item">
          <label>
            배너 제목
            <input type="text" />
          </label>
          <label>
            배너 이미지
            <input type="file" />
          </label>
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
          <label>
            배너 위치
            <input type="number" />
          </label>
          <label>
            시작일
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </label>
          <label>
            시작 시간
            <input
              type="text"
              value={isFocused ? startDisplayTime : startTime}
              onChange={(e) =>
                handleChange(e, setStartTime, setStartDisplayTime)
              }
              onFocus={() => handleFocus(startTime, setStartDisplayTime)}
              onBlur={() => handleBlur(startTime, setStartDisplayTime)}
              maxLength={5}
              placeholder="00:00"
            />
          </label>
          <label>
            종료일
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </label>
          <label>
            종료 시간
            <input type="number" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Insert;
