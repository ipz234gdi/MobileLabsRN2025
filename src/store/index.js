import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import ordersReducer from "./ordersSlice";
import persistConfig from "./persistConfig";

const rootReducer = {
  products: productsReducer,
  cart: persistReducer({ ...persistConfig, key: "cart" }, cartReducer),
  orders: persistReducer({ ...persistConfig, key: "orders" }, ordersReducer),
  user: userReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
