import { combineReducers } from "@reduxjs/toolkit";
import CategoriesReducer from "./categories";

export default combineReducers({
  categories: CategoriesReducer,
});
