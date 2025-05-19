// services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from '../navigation/RootNavigation'; // або як ви навігуєте

// 1) створюємо інстанс з базовим URL вашої БД
const instance = axios.create({
  baseURL: 'https://<projectId>.firebaseio.com/',
  timeout: 5000,
});

// 2) request-інтерсептор додає ?auth=<idToken> до кожного запиту
instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');      // <-- правильно: AsyncStorage.getItem('token')
    if (token) {
      config.params = { ...config.params, auth: token };
    }
    return config;
  },
  error => Promise.reject(error)
);

// 3) response-інтерсептор обробляє 401-помилку
instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      navigationRef.navigate('Login');                       // перенаправлення на екран логіну
    }
    return Promise.reject(error);
  }
);

export default instance;
