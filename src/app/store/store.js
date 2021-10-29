import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer.js";

const configureAppStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export const store = configureAppStore();
export default configureAppStore;
