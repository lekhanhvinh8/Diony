import { combineReducers } from "@reduxjs/toolkit";
import CategoriesReducer from "./categories";
import SelectProperties from "./selectProperties";
import TypingProperties from "./typingProperties";
import OrderDetailReducer from "./orderDetail";

export default combineReducers({
  categories: CategoriesReducer,
  selectProperties: SelectProperties,
  typingProperties: TypingProperties,
  orderDetail: OrderDetailReducer,
});
