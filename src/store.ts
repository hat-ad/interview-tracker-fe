import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";

import authReducer from "./features/auth/slice/auth.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [logger],
});

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export { store, persistor };
