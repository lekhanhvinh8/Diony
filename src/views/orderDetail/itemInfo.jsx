import { useSelector } from "react-redux";
import { Box, Grid, Typography, Divider } from "@mui/material";
import { cut } from "../../app/utils/stringCutter";
import { formatMoney } from "../../app/utils/formatMoney";

const ItemInfo = () => {
  const order = useSelector((state) => state.entities.orderDetail);
  const getTotalItemPrice = () => {
    let totalProductPrice = 0;

    if (order?.items) {
      for (const item of order.items) {
        totalProductPrice += item.price * item.amount;
      }
    }
    return totalProductPrice;
  };

  return (
    <Box width="100%">
      <Grid container>
        <Grid item xs={1} display="flex" justifyContent="center">
          No
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="center">
          Product
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={2}>
          Unit price
        </Grid>
        <Grid item xs={1} display="flex" justifyContent="center">
          Quantity
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="right">
          Amount
        </Grid>
      </Grid>
      {order?.items &&
        order.items.map((item, index) => {
          return (
            <Grid container sx={{ mt: 2 }} key={index}>
              <Grid item xs={1} display="flex" justifyContent="center">
                {index + 1}
              </Grid>
              <Grid item xs={2} display="flex" justifyContent="center">
                <Box style={{ width: 60, height: 60, border: 10 }}>
                  <img
                    style={{ maxWidth: "100%", maxHeigth: "100%" }}
                    src={item.image}
                    alt="alt"
                  ></img>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <Typography>{cut(item.name, 30)}</Typography>
                  <Typography>{cut(item.variant, 30)}</Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                {formatMoney(item.price) + "đ"}
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="center">
                {"x" + item.amount}
              </Grid>
              <Grid item xs={2} display="flex" justifyContent="right">
                {formatMoney(item.price * item.amount) + "đ"}
              </Grid>
            </Grid>
          );
        })}

      <Divider sx={{ mt: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Grid container>
          <Grid item xs={9} display="flex" justifyContent="right">
            Total Product Price:
          </Grid>
          <Grid item xs={3} display="flex" justifyContent="right">
            {formatMoney(getTotalItemPrice()) + "đ"}
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={9} display="flex" justifyContent="right">
            Shipping Cost:
          </Grid>
          <Grid item xs={3} display="flex" justifyContent="right">
            {formatMoney(order.shipFee ? order.shipFee : 0) + "đ"}
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={9} display="flex" justifyContent="right">
            Total:
          </Grid>
          <Grid item xs={3} display="flex" justifyContent="right">
            <Typography fontSize={19} fontWeight="bold" color="red">
              {formatMoney(
                order.shipFee ? getTotalItemPrice() + order.shipFee : 0
              ) + "đ"}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mt: 2 }} />

      <Box></Box>
    </Box>
  );
};

export default ItemInfo;
