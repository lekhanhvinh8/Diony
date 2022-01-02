import { createSlice } from "@reduxjs/toolkit";
import { getShippers } from "../../services/shipperService";

export const defaultPageSize = 5;

const slice = createSlice({
  name: "shippers",
  initialState: {
    totalShippers: 0,
    pageNumber: 0,
    pageSize: defaultPageSize,
    shippers: [],
  },
  reducers: {
    shippersReloaded: (page, action) => {
      page.shippers = action.payload;
    },
    totalShippersSet: (page, action) => {
      page.totalShippers = action.payload;
    },
    pageNumberChanged: (page, action) => {
      page.pageNumber = action.payload;
    },
  },
});

export default slice.reducer;

const { shippersReloaded, totalShippersSet, pageNumberChanged } = slice.actions;

export const reloadShippers =
  (pageSize = defaultPageSize, pageNumber = 0) =>
  async (dispatch) => {
    const { shippers, total } = await getShippers(pageSize, pageNumber);
    dispatch(shippersReloaded(shippers));
    dispatch(totalShippersSet(total));
  };

export const changePageNumber = (newPage) => async (dispatch) => {
  dispatch(pageNumberChanged(newPage));
};
