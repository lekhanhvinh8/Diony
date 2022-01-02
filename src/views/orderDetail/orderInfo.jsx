import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { orderStatus } from "../../config.json";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";
import defaultAvatar from "../../app/layouts/images/default_avatar.jpg";
import { format } from "date-fns";
import ItemInfo from "./itemInfo";
import PaymentInfo from "./paymentInfo";

const getOrderStatus = (statusCode) => {
  for (var prop in orderStatus) {
    if (Object.prototype.hasOwnProperty.call(orderStatus, prop)) {
      if (orderStatus[prop].statusCode === statusCode) return orderStatus[prop];
    }
  }
};

const OrderInfo = () => {
  const order = useSelector((state) => state.entities.orderDetail);

  const orderStatus = getOrderStatus(order.status);

  const date = new Date(order.orderDate);
  let formatedDate = "Undefine";

  try {
    formatedDate = format(date, "MM/dd/yyyy h:mm a");
  } catch (error) {}

  return (
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
            <Typography fontWeight="bold">Cusomter Info</Typography>
            <Avatar
              sx={{ width: 50, height: 50 }}
              alt={"defaultAvatar"}
              src={order?.customerAvatar ? order.customerAvatar : defaultAvatar}
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
            <Typography sx={{ mt: 1 }}>
              {"Delivery address: " + order.deliveryAddress}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" sx={{ mt: 2 }}>
          <AccessTimeOutlinedIcon color="error" />
          <Box sx={{ ml: 1 }}>
            <Typography fontWeight="bold">Order Time</Typography>
            <Typography sx={{ mt: 1 }}>{formatedDate}</Typography>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ padding: 2, mt: 2 }}>
        <Box display="flex">
          <PaidOutlinedIcon color="error" />

          <Box sx={{ ml: 1, width: "100%" }}>
            <Typography fontWeight="bold">Items Info</Typography>
            <Box sx={{ mt: 1 }}>
              <ItemInfo />
            </Box>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ padding: 2, mt: 2 }}>
        <Box display="flex">
          <PaymentsIcon color="error" />

          <Box sx={{ ml: 1, width: "100%" }}>
            <Typography fontWeight="bold">Payment Info</Typography>
            <Box sx={{ mt: 1 }}>
              <PaymentInfo />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderInfo;
