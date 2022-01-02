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
} from "@mui/material";
import { IconButton } from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  changePageNumber,
  reloadPendingOrders,
} from "../../app/store/ui/pendingOrders";
import { formatMoney } from "../../app/utils/formatMoney";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";
import OrderConfirmationDialog from "./orderConfirmationDialog";

const PendingOrders = ({ history }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.ui.pendingOrders.orders);
  const totalOrders = useSelector(
    (state) => state.ui.pendingOrders.totalOrders
  );
  const pageNumber = useSelector((state) => state.ui.pendingOrders.pageNumber);
  const pageSize = useSelector((state) => state.ui.pendingOrders.pageSize);

  const [confirmationOrder, setConfirmationOrder] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(reloadPendingOrders(pageSize));
  }, [dispatch]);

  return (
    <Box>
      <OrderConfirmationDialog
        order={confirmationOrder}
        dialogOpen={confirmationDialogOpen}
        setDialogOpen={setConfirmationDialogOpen}
      />
      <Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Shop Name</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Date Ordered</TableCell>
                <TableCell align="center">Payment Type</TableCell>
                <TableCell align="center">Is Paid</TableCell>
                <TableCell align="center">Approve</TableCell>
                <TableCell align="center">Deny</TableCell>
                <TableCell align="center">Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const date = new Date(order.orderDate);
                const formatedDate = format(date, "MM/dd/yyyy h:mm a");

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
                      {formatMoney(order.total + order.shipFee) + "đ"}
                    </TableCell>
                    <TableCell align="center">{formatedDate}</TableCell>
                    <TableCell align="center">{order.paymentType}</TableCell>
                    <TableCell align="center">
                      {order.isPaid ? <DoneIcon /> : <ClearIcon />}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          setConfirmationOrder(order);
                          setConfirmationDialogOpen(true);
                        }}
                      >
                        <AddTaskIcon color="primary" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton>
                        <DoDisturbIcon color="error" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          history.push("/admin/order/" + order.id);
                        }}
                      >
                        <InfoOutlinedIcon color="info" />
                      </IconButton>
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
            dispatch(reloadPendingOrders(pageSize, newPage));
            dispatch(changePageNumber(newPage));
          }}
          onRowsPerPageChange={() => {}}
        />
      </Paper>
    </Box>
  );
};

export default PendingOrders;
