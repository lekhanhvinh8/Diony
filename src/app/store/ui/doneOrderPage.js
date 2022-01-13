import { createSlice } from "@reduxjs/toolkit";
import { getShipperDoneOrders } from "../../services/orderService";

export const defaultPageSize = 5;

const slice = createSlice({
  name: "doneOrderPage",
  initialState: {
    orders: [],
    totalOrders: 0,
    pageSize: defaultPageSize,
    pageNumber: 0,
    searchKey: "",
  },
  reducers: {
    ordersReloaded: (page, action) => {
      page.orders = action.payload;
    },
    pageNumberSet: (page, action) => {
      page.pageNumber = action.payload;
    },
    totalOrdersSet: (page, action) => {
      page.totalOrders = action.payload;
    },
    searchKeySet: (page, action) => {
      page.searchKey = action.payload;
    },
  },
});

export default slice.reducer;

const { ordersReloaded, pageNumberSet, totalOrdersSet, searchKeySet } =
  slice.actions;

export const reloadOrders =
  (pageSize = defaultPageSize, pageNumber = 0, searchKey = null) =>
  async (dispatch) => {
    const { orders, totalOrders } = await getShipperDoneOrders(
      pageSize,
      pageNumber,
      searchKey
    );

    dispatch(ordersReloaded(orders));
    dispatch(totalOrdersSet(totalOrders));
    dispatch(pageNumberSet(pageNumber));
  };

export const setSearchKey = (searchKey) => (dispatch) => {
  dispatch(searchKeySet(searchKey));
};
