import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  storage: AsyncStorage,
  whitelist: ['cart','orders'],  // тільки ці два slice‐и будуть зберігатись
};
