var webPush = require("web-push");

// {"publicKey":"BMG0zKDU4CgO8dr7rA_jmAWkDv3taUuWvaV8ZBr5QsTN0AWA9yG7IPM4GP7C06IoolxU1bnJ3BIebkDOjanZTUo","privateKey":"NFZim5ufZkTKf6G6tfYBRoxDRLiwuQLSuHBAW3PA1CI"}
const vapidKeys = {
  publicKey:
    "BMG0zKDU4CgO8dr7rA_jmAWkDv3taUuWvaV8ZBr5QsTN0AWA9yG7IPM4GP7C06IoolxU1bnJ3BIebkDOjanZTUo",
  privateKey: "NFZim5ufZkTKf6G6tfYBRoxDRLiwuQLSuHBAW3PA1CI",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/fmeF0cslVfo:APA91bE8t_1HXquGs7ZYqIU2zcVgIxooGwT7RKDvpGcE3rr17jZavV0NQq6QhsZRDQutnteSyiJSSwsyKwLm-RZnon3-djThRA4CsOeCd3mjCwJ6MUZcfhz8qRdq9QkoAeV56PTY7qxo",
  keys: {
    p256dh:
      "BNzcnUsbSqLafIFysIH3kjkxtdlIQC1SbSUdGCG6cLFY0XDbUS2grDktKpeV0XfrNMH9b2Fn0HQLWytS+Im6zY4=",
    auth: "RU20Fh6PkbfzzrVT4FkyYg==",
  },
};
var payload = "The SBV Vitesse vs PSV football match is about to start!";

var options = {
  gcmAPIKey: "896386189263",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
