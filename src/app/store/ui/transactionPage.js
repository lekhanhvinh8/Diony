import { createSlice } from "@reduxjs/toolkit";
import { getFilteredTransactions } from "../../services/transactionService";
import { toISOLocalWithoutOffset } from "../../utils/formatDate";

export const defaultPageSize = 5;
var date = new Date();
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
var fromDate = toISOLocalWithoutOffset(firstDayOfMonth).split("T")[0];
var toDate = toISOLocalWithoutOffset(tomorrow).split("T")[0];

const slice = createSlice({
  name: "transactionPage",
  initialState: {
    transactionType: "all",
    fromDate: fromDate,
    toDate: toDate,
    searchKey: "",
    transactionsReloading: false,
    transactions: [],
    pageNumber: 0,
    pageSize: defaultPageSize,
    totalTransactions: 0,
  },
  reducers: {
    transactionTypeSelected: (page, action) => {
      page.transactionType = action.payload;
    },
    transactionsReloaded: (page, action) => {
      page.transactions = action.payload;
    },
    transactionsReloadingSet: (page, action) => {
      page.transactionsReloading = action.payload;
    },
    totalTransactionsSet: (page, action) => {
      page.totalTransactions = action.payload;
    },
    pageSelected: (page, action) => {
      page.pageNumber = action.payload;
    },
    fromDateSet: (page, action) => {
      page.fromDate = action.payload;
    },
    toDateSet: (page, action) => {
      page.toDate = action.payload;
    },
    searchKeyChanged: (page, action) => {
      page.searchKey = action.payload;
    },
  },
});

export default slice.reducer;

const {
  transactionTypeSelected,
  transactionsReloaded,
  transactionsReloadingSet,
  totalTransactionsSet,
  pageSelected,
  fromDateSet,
  toDateSet,
  searchKeyChanged,
} = slice.actions;

export const setFromDate = (value) => (dispatch) => {
  dispatch(fromDateSet(value));
};

export const setToDate = (value) => (dispatch) => {
  dispatch(toDateSet(value));
};

export const selectPage = (page) => (dispatch) => {
  dispatch(pageSelected(page));
};

export const changeSearchKey = (value) => (dispatch) => {
  dispatch(searchKeyChanged(value));
};
export const selectTransactionType = (transactionType) => (dispatch) => {
  dispatch(transactionTypeSelected(transactionType));
};

export const reloadTransactions = () => async (dispatch, getState) => {
  const { transactionType, searchKey, fromDate, toDate, pageSize, pageNumber } =
    getState().ui.transactionPage;

  try {
    dispatch(transactionsReloadingSet(true));

    var { transactions, totalTransactions } = await getFilteredTransactions(
      transactionType == "all" ? null : transactionType,
      searchKey,
      null,
      fromDate,
      toDate,
      pageSize,
      pageNumber
    );

    dispatch(transactionsReloadingSet(false));
    dispatch(transactionsReloaded(transactions));
    dispatch(totalTransactionsSet(totalTransactions));
  } catch (ex) {
    dispatch(transactionsReloadingSet(false));
  }
};
