import { combineReducers } from "@reduxjs/toolkit";
import categoriesPageReducer from "./categoriesPage";
import propertiesPageReducer from "./propertiesPage";
import valuesDialogReducer from "./valuesDialog";
import pendingOrdersReducer from "./pendingOrders";
import shippersReducer from "./shippers";

export default combineReducers({
  categoriesPage: categoriesPageReducer,
  propertiesPage: propertiesPageReducer,
  valuesDialog: valuesDialogReducer,
  pendingOrders: pendingOrdersReducer,
  shippers: shippersReducer,
});
