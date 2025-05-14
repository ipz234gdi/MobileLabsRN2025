import { OneSignal } from "react-native-onesignal";

const PUSH_APP_ID        = "4cb9bcbf-4c60-433a-a8d1-35a8ab5178e6";
const EXTERNAL_USER_KEY  = "test_id";
const REST_API_KEY_PUSH  =
  "os_v2_app_js43zp2mmbbtvkgrgwukwuly4ygdjbbv3xqe5ludk7urefnwsjfxbrttyg6biul6mdr7wovfgrz3tbnraisl5ai2couhgk7xcmwv3ky";

export function initPushService() {
  try {
    OneSignal.initialize(PUSH_APP_ID);
    OneSignal.Notifications.requestPermission(true);
    console.log("Push service ready");
  } catch (e) {
    console.error("Push init error:", e);
  }
}

export async function schedulePush(task) {
  try {
    OneSignal.login(EXTERNAL_USER_KEY);
    OneSignal.User.pushSubscription.optIn();

    const sendAfter = new Date(task.reminderTime).toISOString();
    const userId    = await OneSignal.User.getExternalId();

    const payload = {
      app_id:           PUSH_APP_ID,
      headings:         { en: "Task Reminder" },
      contents:         { en: task.title },
      data:             { taskId: task.id },
      send_after:       sendAfter,
      include_external_user_ids: [userId],
    };

    const res = await fetch("https://onesignal.com/api/v1/notifications", {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        Authorization:   `Basic ${REST_API_KEY_PUSH}`,
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    console.log("Push scheduled:", json);
    return json.id;
  } catch (e) {
    console.error("Push schedule error:", e);
  }
}

export async function cancelPush(notificationId) {
  try {
    await fetch(
      `https://onesignal.com/api/v1/notifications/${notificationId}?app_id=${PUSH_APP_ID}`,
      { method: "DELETE", headers: { Authorization: `Basic ${REST_API_KEY_PUSH}` } }
    );
  } catch (e) {
    console.error("Push cancel error:", e);
  }
}
