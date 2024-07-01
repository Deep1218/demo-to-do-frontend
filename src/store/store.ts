import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import taskSlice from "./slices/taskSlice";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

export interface DefaultResponse {
  loading: boolean;
  error: boolean;
  success: boolean;
  message: string | null;
}
export const rootReducer = combineReducers({
  authReducer: authSlice,
  taskReducer: taskSlice,
});

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const store = configureStore({ reducer: persistedReducer, devTools: true });
export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
