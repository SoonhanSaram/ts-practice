const sendMessage = async () => {
    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY}`,
      },
      body: JSON.stringify({
        message: {
          topic: "matchday",
          notification: {
            title: "Background Message Title",
            body: "Background message body",
          },
        },
      }),
    };
  
    await fetch(`https://fcm.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECTID}/messages:send`, fetchOption);
};
  

export {sendMessage};