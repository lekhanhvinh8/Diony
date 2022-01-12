import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  Button,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { reloadOrders } from "../../app/store/ui/shippingOrderPage";
import { paymentMethod } from "../../config.json";
import { formatMoney } from "../../app/utils/formatMoney";
import ShippingDialog from "./shippingDialog";
import BlockIcon from "@mui/icons-material/Block";
import CancelledDialog from "./cancelledDialog";

const Shipping = () => {
  const dispatch = useDispatch();
  const { orders, pageSize, pageNumber, totalOrders } = useSelector(
    (state) => state.ui.shippingOrderPage
  );
  const [deliveryDialogOpen, setDeliveryDialogOpen] = useState(false);
  const [selectedDeliveryOrderId, setSelectedDeliveryOrderId] = useState(null);

  const [cancelledDialogOpen, setCancelledDialogOpen] = useState(false);
  const [selectedCancelledOrderId, setSelectedCancelledOrderId] =
    useState(null);

  useEffect(() => {
    dispatch(reloadOrders());
  }, [dispatch]);

  return (
    <Box>
      <ShippingDialog
        dialogOpen={deliveryDialogOpen}
        setDialogOpen={setDeliveryDialogOpen}
        orderId={selectedDeliveryOrderId}
      />
      <CancelledDialog
        orderId={selectedCancelledOrderId}
        dialogOpen={cancelledDialogOpen}
        setDialogOpen={setCancelledDialogOpen}
      />
      <Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Customer Name</TableCell>
                <TableCell align="center">Customer Phone</TableCell>
                <TableCell align="center">Delivery Address</TableCell>
                <TableCell align="center">Pickup Date</TableCell>
                <TableCell align="center">Collect Money</TableCell>
                <TableCell align="center">Delivery</TableCell>
                <TableCell align="center">Cancel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                let formatedDate = null;

                if (order.pickupedAt) {
                  const date = new Date(order.pickupedAt);
                  formatedDate = format(date, "MM/dd/yyyy");
                }

                return (
                  <TableRow
                    key={order.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      <Link
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                        }}
                        to={"/admin/order/" + order.id}
                      >
                        {order.id}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{order.shopName}</TableCell>
                    <TableCell align="center">
                      {order.shopPhoneNumber}
                    </TableCell>
                    <TableCell align="left">{order.pickupAddress}</TableCell>
                    <TableCell align="center">
                      {formatedDate ? formatedDate : "undefine"}
                    </TableCell>
                    <TableCell align="center">
                      {order.paymentType === paymentMethod.cod ? (
                        formatMoney(order.total + order.shipFee) + "đ"
                      ) : (
                        <BlockIcon color="error" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          setSelectedDeliveryOrderId(order.id);
                          setDeliveryDialogOpen(true);
                        }}
                      >
                        Delivery
                      </Button>
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        color="error"
                        onClick={() => {
                          setSelectedCancelledOrderId(order.id);
                          setCancelledDialogOpen(true);
                        }}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[pageSize]}
          component="div"
          count={totalOrders}
          rowsPerPage={pageSize}
          page={pageNumber}
          onPageChange={(e, newPage) => {
            dispatch(reloadOrders(pageSize, newPage));
          }}
        />
      </Paper>
    </Box>
  );
};

export default Shipping;
