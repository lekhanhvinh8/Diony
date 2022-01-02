import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reloadOrderDetail } from "../../app/store/entities/orderDetail";
import OrderHistory from "./orderHistory";
import OrderInfo from "./orderInfo";

const OrderDetail = ({ match }) => {
  const { orderId } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderId !== "none") {
      dispatch(reloadOrderDetail(orderId));
    }
  }, [orderId, dispatch]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <OrderInfo />
        </Grid>
        <Grid item xs={3}>
          <OrderHistory />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetail;
