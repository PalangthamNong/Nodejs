const { default: axios } = require("axios");

exports.sendPushNotification = async (expoPushToken, title, body) => {
  const message = {
    to: expoPushToken,
    title,
    body,
  };
  console.log("message:", message);
  return await axios.post("https://exp.host/--/api/v2/push/send", message, {
    headers: {
      // Accept: "application/json",
      // "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
  });
};
