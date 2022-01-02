import { createSlice } from "@reduxjs/toolkit";
import { getPendingOrders } from "../../services/orderService";

export const defaultPageSize = 5;

const slice = createSlice({
  name: "pendingOrders",
  initialState: {
    totalOrders: 0,
    pageNumber: 0,
    pageSize: defaultPageSize,
    orders: [],
  },
  reducers: {
    ordersReloaded: (page, action) => {
      page.orders = action.payload;
    },
    totalOrdersSet: (page, action) => {
      page.totalOrders = action.payload;
    },
    pageNumberChanged: (page, action) => {
      page.pageNumber = action.payload;
    },
  },
});

export default slice.reducer;

const { ordersReloaded, totalOrdersSet, pageNumberChanged } = slice.actions;

export const reloadPendingOrders =
  (pageSize = defaultPageSize, pageNumber = 0) =>
  async (dispatch) => {
    try {
      const { orders, totalOrders } = await getPendingOrders(
        pageSize,
        pageNumber
      );

      dispatch(ordersReloaded(orders));
      dispatch(totalOrdersSet(totalOrders));
    } catch (ex) {}
  };

export const changePageNumber = (pageNumber) => (dispatch) => {
  dispatch(pageNumberChanged(pageNumber));
};
