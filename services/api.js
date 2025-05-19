import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigation/RootNavigation";

const instance = axios.create({
  baseURL: "https://lab-7-b9f45-default-rtdb.firebaseio.com",
  timeout: 5000,
});

instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    console.log(
      "[API] >>>",
      config.method.toUpperCase(),
      config.baseURL + config.url,
      "params=",
      { ...config.params, auth: token }
    );
    config.params = { ...config.params, auth: token };
  }
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      console.warn("[API] 401 Unauthorized — видаляю токен");
      await AsyncStorage.removeItem("token");
    }
    return Promise.reject(err);
  }
);

export default instance;
