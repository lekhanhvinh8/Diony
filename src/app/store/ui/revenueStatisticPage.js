import { createSlice } from "@reduxjs/toolkit";
import {
  getDateRevenue,
  getMonthRevenue,
  getYearRevenue,
} from "../../services/orderService";

export const defaultPageSize = 5;
const defaultSelectedDate = new Date();
const defaultSelectedMonth = new Date();
const defaultSelectedYear = new Date();

const slice = createSlice({
  name: "revenueStatisticPage",
  initialState: {
    orders: [],
    pageSize: defaultPageSize,
    pageNumber: 0,
    totalOrders: 0,
    selectedDate: defaultSelectedDate.toLocaleString(),
    selectedMonth: defaultSelectedMonth.toLocaleString(),
    selectedYear: defaultSelectedYear.toLocaleString(),
    totalDateRevenue: 0,
    totalMonthRevenue: 0,
    totalYearRevenue: 0,
  },
  reducers: {
    orderReloaded: (page, action) => {
      page.orders = action.payload;
    },
    totalOrdersSet: (page, action) => {
      page.totalOrders = action.payload;
    },
    pageNumberSet: (page, action) => {
      page.pageNumber = action.payload;
    },
    dateSelected: (page, action) => {
      page.selectedDate = action.payload;
    },
    monthSelected: (page, action) => {
      page.selectedMonth = action.payload;
    },
    yearSelected: (page, action) => {
      page.selectedYear = action.payload;
    },
    totalDateRevenueSet: (page, action) => {
      page.totalDateRevenue = action.payload;
    },
    totalMonthRevenueSet: (page, action) => {
      page.totalMonthRevenue = action.payload;
    },
    totalYearRevenueSet: (page, action) => {
      page.totalYearRevenue = action.payload;
    },
  },
});

export default slice.reducer;

const {
  orderReloaded,
  totalOrdersSet,
  pageNumberSet,
  dateSelected,
  monthSelected,
  yearSelected,
  totalDateRevenueSet,
  totalMonthRevenueSet,
  totalYearRevenueSet,
} = slice.actions;

export const reloadDateRevenue = () => async (dispatch, getState) => {
  const { pageSize, pageNumber, selectedDate } =
    getState().ui.revenueStatisticPage;
  const { orders, totalOrders, totalRevenue } = await getDateRevenue(
    selectedDate,
    pageSize,
    pageNumber
  );
  dispatch(totalDateRevenueSet(totalRevenue));
  dispatch(orderReloaded(orders));
  dispatch(totalOrdersSet(totalOrders));
};

export const reloadMonthRevenue = () => async (dispatch, getState) => {
  const { pageSize, pageNumber, selectedMonth } =
    getState().ui.revenueStatisticPage;
  const { orders, totalOrders, totalRevenue } = await getMonthRevenue(
    selectedMonth,
    pageSize,
    pageNumber
  );
  dispatch(totalMonthRevenueSet(totalRevenue));
  dispatch(orderReloaded(orders));
  dispatch(totalOrdersSet(totalOrders));
};

export const reloadYearRevenue = () => async (dispatch, getState) => {
  const { pageSize, pageNumber, selectedYear } =
    getState().ui.revenueStatisticPage;
  const { orders, totalOrders, totalRevenue } = await getYearRevenue(
    selectedYear,
    pageSize,
    pageNumber
  );
  dispatch(totalYearRevenueSet(totalRevenue));
  dispatch(orderReloaded(orders));
  dispatch(totalOrdersSet(totalOrders));
};

export const setPageNumber = (page) => (dispatch) => {
  dispatch(pageNumberSet(page));
};

export const selectDate = (date) => (dispatch) => dispatch(dateSelected(date));
export const selectMonth = (month) => (dispatch) =>
  dispatch(monthSelected(month));
export const selectYear = (year) => (dispatch) => dispatch(yearSelected(year));
