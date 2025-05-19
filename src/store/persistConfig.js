import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  storage: AsyncStorage,
  whitelist: ['cart','orders'],
};
