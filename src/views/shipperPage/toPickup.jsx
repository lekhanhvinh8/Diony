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
import { reloadOrders } from "../../app/store/ui/toPickupOrderPage";
import PickupDialog from "./pickupDialog";

const ToPickup = () => {
  const dispatch = useDispatch();
  const { orders, pageSize, pageNumber, totalOrders } = useSelector(
    (state) => state.ui.toPickupOrderPage
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    dispatch(reloadOrders());
  }, [dispatch]);

  return (
    <Box>
      <PickupDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        orderId={selectedOrderId}
      />
      <Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Shop Name</TableCell>
                <TableCell align="center">Shop Phone</TableCell>
                <TableCell align="center">Pickup Address</TableCell>
                <TableCell align="center">Appointment Time</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                let formatedDate = null;

                if (order.pickupAppointment) {
                  const date = new Date(order.pickupAppointment);
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
                      <Button
                        onClick={() => {
                          setSelectedOrderId(order.id);
                          setDialogOpen(true);
                        }}
                      >
                        Pickup
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

export default ToPickup;
