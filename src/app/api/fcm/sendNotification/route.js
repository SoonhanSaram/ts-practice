import { initializeApp } from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";

import serviceAccount from "../../../../../smartmap-fcm-firebase-adminsdk-3cani-ed7cca3abf.json";

export const app = initializeApp({
  credential: initializeApp(serviceAccount),
  databaseURL: "https://smartmap-fcm-default-rtdb.firebaseio.com",
});

export async function handler(req, res) {
  if (req.method === "POST") {
    const { notification } = req.body;

    try {
      const messaging = getMessaging(app);
      await messaging.send({
        notification: notification,
        // 여기서 추가적인 메시지 옵션 설정 가능
      });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
