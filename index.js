import { registerRootComponent } from "expo";
import App from "./App";

const initOneSignal = async () => {
  try {
    console.log("OneSignal loaded in index.js");
  } catch (error) {
    console.error("Failed to load OneSignal in index.js:", error);
  }
};

initOneSignal();
registerRootComponent(App);
