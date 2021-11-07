import { combineReducers } from "@reduxjs/toolkit";
import categoriesPageReducer from "./categoriesPage";
import propertiesPageReducer from "./propertiesPage";
import valuesDialogReducer from "./valuesDialog";

export default combineReducers({
  categoriesPage: categoriesPageReducer,
  propertiesPage: propertiesPageReducer,
  valuesDialog: valuesDialogReducer,
});
