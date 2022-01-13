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
import { reloadOrders } from "../../app/store/ui/doneOrderPage";
import { paymentMethod } from "../../config.json";
import { formatMoney } from "../../app/utils/formatMoney";
import BlockIcon from "@mui/icons-material/Block";
import { orderStatus } from "../../config.json";
import SearchBar from "./searchBar";

const Done = () => {
  const dispatch = useDispatch();
  const { orders, pageSize, pageNumber, totalOrders, searchKey } = useSelector(
    (state) => state.ui.doneOrderPage
  );

  useEffect(() => {
    dispatch(reloadOrders(pageSize, pageNumber, searchKey));
  }, [dispatch]);

  return (
    <Box>
      <Box>
        <SearchBar />
      </Box>
      <Paper sx={{ mt: 1 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Customer Name</TableCell>
                <TableCell align="center">Customer Phone</TableCell>
                <TableCell align="center">Delivery Address</TableCell>
                <TableCell align="center">Action</TableCell>
                <TableCell align="center">Action Date</TableCell>
                <TableCell align="center">Collect Money</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                let formatedDate = null;

                if (order.pickupedAt) {
                  let date = new Date(order.shippedAt);
                  if (order.status === orderStatus.cancelled.statusCode)
                    date = new Date(order.cancelledAt);

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
                    <TableCell align="center">{order.status}</TableCell>
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
            dispatch(reloadOrders(pageSize, newPage, searchKey));
          }}
        />
      </Paper>
    </Box>
  );
};

export default Done;
