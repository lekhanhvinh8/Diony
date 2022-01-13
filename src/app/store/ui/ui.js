import { combineReducers } from "@reduxjs/toolkit";
import categoriesPageReducer from "./categoriesPage";
import propertiesPageReducer from "./propertiesPage";
import valuesDialogReducer from "./valuesDialog";
import pendingOrdersReducer from "./pendingOrders";
import shippersReducer from "./shippers";
import toPickupOrderReducer from "./toPickupOrderPage";
import shippingOrderReducer from "./shippingOrderPage";
import revenueStatisticPageReducer from "./revenueStatisticPage";
import ordersPageReducer from "./ordersPage";
import doneOrderPageReducer from "./doneOrderPage";

export default combineReducers({
  categoriesPage: categoriesPageReducer,
  propertiesPage: propertiesPageReducer,
  valuesDialog: valuesDialogReducer,
  pendingOrders: pendingOrdersReducer,
  shippers: shippersReducer,
  toPickupOrderPage: toPickupOrderReducer,
  shippingOrderPage: shippingOrderReducer,
  revenueStatisticPage: revenueStatisticPageReducer,
  ordersPage: ordersPageReducer,
  doneOrderPage: doneOrderPageReducer,
});
