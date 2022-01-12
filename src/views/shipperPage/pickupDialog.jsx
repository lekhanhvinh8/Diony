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
  getShipperOrderDetail,
  pickupOrder,
} from "./../../app/services/orderService";
import { useEffect, useState } from "react";
import { getOrderStatus } from "../../app/utils/getOrderStatus";
import { formatMoney } from "../../app/utils/formatMoney";
import { useDispatch } from "react-redux";
import { reloadOrders } from "./../../app/store/ui/toPickupOrderPage";
import { toast } from "react-toastify";
import { paymentMethod } from "../../config.json";

const PickupDialog = ({ dialogOpen, setDialogOpen, orderId = null }) => {
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
    const date = new Date(order.pickupAppointment);
    formatedDate = format(date, "MM/dd/yyyy ");
  } catch (error) {}

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle>Pick up an order</DialogTitle>
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
                <StorefrontOutlinedIcon color="error" />

                <Box sx={{ ml: 1 }}>
                  <Typography fontWeight="bold">Shop Info</Typography>
                  <Avatar
                    sx={{ width: 50, height: 50 }}
                    alt={"defaultAvatar"}
                    src={order?.shopAvatar ? order.shopAvatar : defaultAvatar}
                  />
                  <Typography sx={{ mt: 1 }}>
                    {"Shop's Name: " + order.shopName}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    {"Phone Number: " + order.shopPhoneNumber}
                  </Typography>
                </Box>
              </Box>
            </Paper>
            <Paper sx={{ padding: 2, mt: 2 }}>
              <Box display="flex">
                <Grid3x3OutlinedIcon color="error" />
                <Box sx={{ ml: 1 }}>
                  <Typography fontWeight="bold">Order ID</Typography>
                  <Typography sx={{ mt: 1 }} fontSize={15}>
                    {order.id}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" sx={{ mt: 2 }}>
                <LocalShippingOutlinedIcon color="error" />
                <Box sx={{ ml: 1 }}>
                  <Typography fontWeight="bold">Shipping Info</Typography>
                  <Typography sx={{ mt: 1 }}>
                    {"Pick up address: " + order.pickupAddress}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" sx={{ mt: 2 }}>
                <AccessTimeOutlinedIcon color="error" />
                <Box sx={{ ml: 1 }}>
                  <Typography fontWeight="bold">Appointment Date</Typography>
                  <Typography sx={{ mt: 1 }}>{formatedDate}</Typography>
                </Box>
              </Box>
            </Paper>
            <Box sx={{ mt: 2 }}>
              {!(order.paymentType === paymentMethod.cod) ? (
                <Box width="100%" display="flex" justifyContent="right">
                  <Typography color="red" fontWeight="bold">
                    Do not collect money
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Grid container>
                    <Grid item xs={9} display="flex" justifyContent="right">
                      Total Product Price:
                    </Grid>
                    <Grid item xs={3} display="flex" justifyContent="right">
                      {formatMoney(order.total) + "đ"}
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
        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        <Button
          onClick={async () => {
            try {
              await pickupOrder(order.id);
              await dispatch(reloadOrders());
              setDialogOpen(false);
              toast.success("Pickup successfully");
            } catch (ex) {}
          }}
        >
          Pickup
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PickupDialog;
