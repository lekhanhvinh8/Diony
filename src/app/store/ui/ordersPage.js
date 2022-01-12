import { createSlice } from "@reduxjs/toolkit";
import { orderStatus } from "../../../config.json";
import { getFilteredOrders } from "../../services/orderService";

export const defaultPageSize = 5;

const slice = createSlice({
  name: "ordersPage",
  initialState: {
    selectedTab: orderStatus.all.tabName,
    orders: [],
    ordersReloading: false,
    pageNumber: 0,
    pageSize: defaultPageSize,
    searchKey: "",
    totalOrders: 0,
  },
  reducers: {
    tabSelected: (page, action) => {
      page.selectedTab = action.payload;
    },
    ordersReloaded: (page, action) => {
      const orders = action.payload;
      page.orders = orders;
    },
    ordersReloadingSet: (page, action) => {
      page.ordersReloading = action.payload;
    },
    totalOrdersSet: (page, action) => {
      page.totalOrders = action.payload;
    },
    pageSelected: (page, action) => {
      page.pageNumber = action.payload;
    },
    searchKeyChanged: (page, action) => {
      page.searchKey = action.payload;
    },
  },
});

export default slice.reducer;

const {
  tabSelected,
  ordersReloaded,
  ordersReloadingSet,
  totalOrdersSet,
  pageSelected,
  searchKeyChanged,
} = slice.actions;

export const selectTab = (tabValue) => (dispatch) => {
  dispatch(tabSelected(tabValue));
};

export const reloadOrders = () => async (dispatch, getState) => {
  const { pageSize, pageNumber, searchKey, selectedTab } =
    getState().ui.ordersPage;

  try {
    dispatch(ordersReloadingSet(true));

    const statusCode = getStatusCode(selectedTab);

    const { orderGroups: orders, totalOrders } = await getFilteredOrders(
      pageSize,
      pageNumber,
      searchKey,
      statusCode
    );

    dispatch(ordersReloadingSet(false));
    dispatch(ordersReloaded(orders));
    dispatch(totalOrdersSet(totalOrders));
  } catch (ex) {
    dispatch(ordersReloadingSet(false));
  }
};

export const selectPageNumber = (pageNumber) => (dispatch) => {
  dispatch(pageSelected(pageNumber));
};

export const changeSearchKey = (searchKey) => (dispatch) => {
  dispatch(searchKeyChanged(searchKey));
};

//helper
export const getStatusCode = (tabName) => {
  const orderStatusObj = orderStatus;

  const statusCode = orderStatusObj[tabName]?.statusCode;

  if (statusCode !== undefined) return statusCode;

  return null;
};
