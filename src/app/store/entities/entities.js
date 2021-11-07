import { combineReducers } from "@reduxjs/toolkit";
import CategoriesReducer from "./categories";
import SelectProperties from "./selectProperties";
import TypingProperties from "./typingProperties";

export default combineReducers({
  categories: CategoriesReducer,
  selectProperties: SelectProperties,
  typingProperties: TypingProperties,
});
