"use client";

import Header from "@/app/components/header";
import { firebaseConfig } from "@/firebase/firebase";
import * as firebase from "firebase/app";
import { useEffect, useState } from "react";
import { getMessaging } from "firebase/messaging/sw";
import { getToken, onMessage } from "firebase/messaging";

type NotificationPermission = 'default' | 'granted' | 'denied';

const PID01 = () => {
  
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {

    // new Notification('hello', { body: 'hello' });

    const app = firebase.initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    // 권한 상태 확인
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }

    // 권한이 허용되었을 때만 토큰을 가져오기
    if (permission === "granted") {
      getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY })
        .then((currentToken) => {
          if (currentToken) {
            setToken(currentToken);
            console.log("Token received: ", currentToken);
          } else {
            console.log("No registration token available. Request permission to generate one.");
          }
        })
        .catch((err) => {
          console.error("An error occurred while retrieving token. ", err);
        });

      // 메시지 수신
      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        // 알림 표시 또는 다른 로직
      });
    }
  }, [permission]);

  const requestNotificationPermission = async () => {
    try {
      const newPermission = await Notification.requestPermission();
      setPermission(newPermission);
      if (newPermission === "granted") {
        console.log("Notification permission granted.");
        // 여기서 추가적인 토큰 요청을 할 수 있습니다.
      } else {
        console.log("Notification permission denied or dismissed.");
      }
    } catch (error) {
      console.error("Failed to request notification permission:", error);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="contents-box">
        <div className="item">
          <h4>수신인 체크</h4>
        </div>
        <div className="item">
          <input placeholder="메시지를 입력해주세요" />
          <div className="button-wrapper">
            <button className="button">취소</button>
            <button className="button">보내기</button>
            <button className="button" onClick={requestNotificationPermission}>권한 설정</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PID01;
