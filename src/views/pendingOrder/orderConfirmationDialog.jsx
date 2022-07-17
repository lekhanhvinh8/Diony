import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputBase,
  Box,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { formatMoney } from "../../app/utils/formatMoney";
import { paymentMethod } from "../../config.json";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useEffect, useState } from "react";
import { searchShipper } from "../../app/services/shipperService";
import { confirmOrder } from "../../app/services/orderService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { reloadPendingOrders } from "../../app/store/ui/pendingOrders";

const OrderConfirmationDialog = ({ order, dialogOpen, setDialogOpen }) => {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  const [shipper, setShipper] = useState(null);

  useEffect(() => {}, [dialogOpen]);

  const findShipper = async () => {
    try {
      const shipper = await searchShipper(searchKey);
      setShipper(shipper);
    } catch (ex) {}
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle>Xác nhận đơn hàng</DialogTitle>
      <DialogContent>
        {order && (
          <Box>
            <Box display="flex">
              <ArticleOutlinedIcon color="error" />
              <Typography fontWeight="bold" sx={{ ml: 1 }}>
                Thông tin đơn
              </Typography>
            </Box>

            <Box display="flex">
              <Box>Order Id:</Box>
              <Box sx={{ ml: 1 }}>{order.id}</Box>
            </Box>

            <Box display="flex">
              <Box>Số tiền thu:</Box>
              <Box sx={{ ml: 1 }}>
                {order.paymentType === paymentMethod.paypal
                  ? "Online payment"
                  : formatMoney(order.shipFee + order.total) + "đ"}
              </Box>
            </Box>
          </Box>
        )}
        <Box
          sx={{ borderRadius: 2, bgcolor: "#a7ffeb", paddingLeft: 1, mt: 1 }}
          display="flex"
        >
          <InputBase
            fullWidth
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.currentTarget.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                findShipper();
              }
            }}
            placeholder="Tìm theo id, email, số điện thoại"
          />
          <IconButton onClick={findShipper}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Box display="flex">
            <PersonOutlineOutlinedIcon color="error" />
            <Typography fontWeight="bold" sx={{ ml: 1 }}>
              Thông tin Shipper
            </Typography>
          </Box>
          {shipper && (
            <Box sx={{ mt: 1 }}>
              <Box display="flex">
                <Box>Shipper Id:</Box>
                <Box sx={{ ml: 1 }}>{shipper.id}</Box>
              </Box>

              <Box display="flex">
                <Box>SDT:</Box>
                <Box sx={{ ml: 1 }}>{shipper.appUser.phoneNumber}</Box>
              </Box>

              <Box display="flex">
                <Box>Email:</Box>
                <Box sx={{ ml: 1 }}>{shipper.appUser.email}</Box>
              </Box>

              <Box display="flex">
                <Box>Tên:</Box>
                <Box sx={{ ml: 1 }}>{shipper.appUser.name}</Box>
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Hủy</Button>
        <Button
          onClick={async () => {
            try {
              await confirmOrder(order.id, shipper.id);
              toast.success("Xác nhận đơn hàng thành công");

              setSearchKey("");
              setDialogOpen(false);
              dispatch(reloadPendingOrders());
            } catch (ex) {
              toast.error("Lỗi không xác định");
            }
          }}
          disabled={!(order && shipper)}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderConfirmationDialog;
