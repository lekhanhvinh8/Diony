import { combineReducers } from "@reduxjs/toolkit";
import categoriesPageReducer from "./categoriesPage";

export default combineReducers({
  categoriesPage: categoriesPageReducer,
});
