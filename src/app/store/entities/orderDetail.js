import { createSlice } from "@reduxjs/toolkit";
import { getOrderDetail } from "../../services/orderService";

const slice = createSlice({
  name: "orderDetail",
  initialState: {},
  reducers: {
    orderReloaded: (order, action) => {
      return action.payload;
    },
  },
});

export default slice.reducer;

const { orderReloaded } = slice.actions;

export const reloadOrderDetail = (orderId) => async (dispatch) => {
  const order = await getOrderDetail(orderId);
  dispatch(orderReloaded(order));
};
