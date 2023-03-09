import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import PostSlice from "./slices/PostSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({ users: UserSlice, posts : PostSlice });

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
