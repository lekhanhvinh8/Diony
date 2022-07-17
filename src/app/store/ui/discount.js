import { createSlice } from "@reduxjs/toolkit";
import {
  getDiscountsByStatus,
  changeDiscountEnabled as changeDiscountEnabledService,
} from "../../services/discountService";

const defaultPageSize = 5;

const slice = createSlice({
  name: "discountPage",
  initialState: {
    selectedTab: "all",
    discountReloading: false,
    discounts: [],
    pageNumber: 0,
    pageSize: defaultPageSize,
    searchKey: "",
    totalDiscounts: 0,
    status: "all",
  },
  reducers: {
    tabSelected: (page, action) => {
      page.selectedTab = action.payload;
    },
    statusChanged: (page, aciton) => {
      page.status = aciton.payload;
    },
    discountsReloaded: (page, action) => {
      const discounts = action.payload;
      page.discounts = discounts;
    },
    discountsReloadingSet: (page, action) => {
      page.discountReloading = action.payload;
    },
    totalDiscountsSet: (page, action) => {
      page.totalDiscounts = action.payload;
    },
    pageSelected: (page, action) => {
      page.pageNumber = action.payload;
    },
    searchKeyChanged: (page, action) => {
      page.searchKey = action.payload;
    },
    discountEnabled: (page, action) => {
      const { discountId, enabled } = action.payload;
      for (const discount of page.discounts) {
        if (discount.id === discountId) {
          discount.enabled = enabled;
        }
      }
    },
  },
});

export default slice.reducer;

const {
  tabSelected,
  discountsReloaded,
  discountsReloadingSet,
  totalDiscountsSet,
  pageSelected,
  searchKeyChanged,
  discountEnabled,
} = slice.actions;

export const selectTab = (tabValue) => (dispatch) => {
  dispatch(tabSelected(tabValue));
};

export const reloadDiscounts = () => async (dispatch, getState) => {
  const { selectedTab, pageSize, pageNumber } = getState().ui.discountPage;

  try {
    dispatch(discountsReloadingSet(true));

    var { discounts, totalDiscounts } = await getDiscountsByStatus(
      selectedTab,
      pageSize,
      pageNumber
    );

    dispatch(discountsReloadingSet(false));
    dispatch(discountsReloaded(discounts));
    dispatch(totalDiscountsSet(totalDiscounts));
  } catch (ex) {
    dispatch(discountsReloadingSet(false));
  }
};

export const selectPageNumber = (pageNumber) => (dispatch) => {
  dispatch(pageSelected(pageNumber));
};

export const changeSearchKey = (searchKey) => (dispatch) => {
  dispatch(searchKeyChanged(searchKey));
};

export const changeDiscountEnabled =
  (discountId, enabled) => async (dispatch) => {
    await changeDiscountEnabledService(discountId, enabled);
    dispatch(discountEnabled({ discountId, enabled }));
  };
