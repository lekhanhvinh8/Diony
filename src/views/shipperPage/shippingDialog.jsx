import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  DialogActions,
  Button,
} from "@mui/material";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import defaultAvatar from "../../app/layouts/images/default_avatar.jpg";
import { format } from "date-fns";
import {
  deliveryOrder,
  getShipperOrderDetail,
  pickupOrder,
} from "./../../app/services/orderService";
import { useEffect, useState } from "react";
import { getOrderStatus } from "../../app/utils/getOrderStatus";
import { formatMoney } from "../../app/utils/formatMoney";
import { useDispatch } from "react-redux";
import { reloadOrders } from "./../../app/store/ui/shippingOrderPage";
import { toast } from "react-toastify";
import { paymentMethod } from "../../config.json";

const ShippingDialog = ({ dialogOpen, setDialogOpen, orderId = null }) => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const asyncFunc = async () => {
      if (orderId) {
        const newOrder = await getShipperOrderDetail(orderId);
        setOrder(newOrder);
      }
    };

    asyncFunc();
  }, [orderId]);

  const orderStatus = getOrderStatus(order?.status);

  let formatedDate = "Undefine";

  try {
    const date = new Date(order.pickupedAt);
    formatedDate = format(date, "MM/dd/yyyy");
  } catch (error) {}

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle>Delivery an order</DialogTitle>
      <DialogContent>
        {order && (
          <Box>
            <Paper sx={{ padding: 2 }}>
              <Box display="flex">
                <ReceiptLongOutlinedIcon color="error" />
                <Typography fontWeight="bold" sx={{ ml: 1 }}>
                  {orderStatus ? orderStatus.label : "Undefine"}
                </Typography>
              </Box>
            </Paper>
            <Paper sx={{ padding: 2, mt: 2 }}>
              <Box display="flex">
                <PersonOutlinedIcon color="error" />
                <Box sx={{ ml: 1 }}>
                  <Typography fontWeight="bold">
                    Thông tin người nhận
                  </Typography>
                  <Avatar
                    sx={{ width: 50, height: 50 }}
                    alt={"defaultAvatar"}
                    src={
                      order?.customerAvatar
                        ? order.customerAvatar
                        : defaultAvatar
                    }
                  />
                  <Typography sx={{ mt: 1 }}>
                    {"Email: " + order.customerEmail}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    {"Phone Number: " + order.customerPhoneNumber}
                  </Typography>
                </Box>
              </Box>
            </Paper>
            <Paper sx={{ padding: 2, mt: 2 }}>
              <Box display="flex">
                <Grid3x3OutlinedIcon color="error" />
                <Box sx={{ ml: 1 }}>
                  <Typography fontWeight="bold">Mã đơn hàng</Typography>
                  <Typography sx={{ mt: 1 }} fontSize={15}>
                    {order.id}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" sx={{ mt: 2 }}>
                <LocalShippingOutlinedIcon color="error" />
                <Box sx={{ ml: 1 }}>
                  <Typography fontWeight="bold">Thông tin giao hàng</Typography>
                  <Typography sx={{ mt: 1 }}>
                    {"Delivery address: " + order.deliveryAddress}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" sx={{ mt: 2 }}>
                <AccessTimeOutlinedIcon color="error" />
                <Box sx={{ ml: 1 }}>
                  <Typography fontWeight="bold">Ngày lấy hàng</Typography>
                  <Typography sx={{ mt: 1 }}>{formatedDate}</Typography>
                </Box>
              </Box>
            </Paper>
            <Box sx={{ mt: 2 }}>
              {!(order.paymentType === paymentMethod.cod) ? (
                <Box width="100%" display="flex" justifyContent="right">
                  <Typography color="red" fontWeight="bold">
                    Không thu tiền
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Grid container>
                    <Grid item xs={9} display="flex" justifyContent="right">
                      Tổng tiền hàng:
                    </Grid>
                    <Grid item xs={3} display="flex" justifyContent="right">
                      {formatMoney(order.total) + "đ"}
                    </Grid>
                  </Grid>
                  <Grid container sx={{ mt: 2 }}>
                    <Grid item xs={9} display="flex" justifyContent="right">
                      Phí giao hàng:
                    </Grid>
                    <Grid item xs={3} display="flex" justifyContent="right">
                      {formatMoney(order.shipFee ? order.shipFee : 0) + "đ"}
                    </Grid>
                  </Grid>
                  <Grid container sx={{ mt: 2 }}>
                    <Grid item xs={9} display="flex" justifyContent="right">
                      Tổng cộng:
                    </Grid>
                    <Grid item xs={3} display="flex" justifyContent="right">
                      <Typography fontSize={19} fontWeight="bold" color="red">
                        {formatMoney(
                          order.shipFee ? order.total + order.shipFee : 0
                        ) + "đ"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Trở về</Button>
        <Button
          onClick={async () => {
            try {
              await deliveryOrder(order.id);
              await dispatch(reloadOrders());
              setDialogOpen(false);
              toast.success("delivery successfully");
            } catch (ex) {
              toast.error("delivery failure");
            }
          }}
        >
          Giao hàng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShippingDialog;
