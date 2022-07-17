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
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  TextField,
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
import CancelledDialog from "./cancelledDialog";
import { LoadingButton } from "@mui/lab";
import { adminApproveAllOrder } from "../../app/services/orderService";
import { dateToLocaleString } from "../../app/utils/formatDate";
import { toast } from "react-toastify";

const PendingOrders = ({ history }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.ui.pendingOrders.orders);
  const totalOrders = useSelector(
    (state) => state.ui.pendingOrders.totalOrders
  );
  const pageNumber = useSelector((state) => state.ui.pendingOrders.pageNumber);
  const pageSize = useSelector((state) => state.ui.pendingOrders.pageSize);

  const [aprroveAllDialogOpen, setApproveAllDialogOpen] = useState(false);
  const [beforeDate, setBeforeDate] = useState(dateToLocaleString(new Date()));

  const [confirmationOrder, setConfirmationOrder] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const [cancelledOrder, setCancelledOrder] = useState(null);
  const [cancelledDialogOpen, setCancelledDialogOpen] = useState(false);

  const [loading, setLoading] = useState(false);

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
      <CancelledDialog
        order={cancelledOrder}
        dialogOpen={cancelledDialogOpen}
        setDialogOpen={setCancelledDialogOpen}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Dialog
          open={aprroveAllDialogOpen}
          onClose={() => {
            setApproveAllDialogOpen(false);
          }}
        >
          <DialogTitle>{"Xác nhận toàn bộ đơn"}</DialogTitle>
          <DialogContent>
            <TextField
              id="datetime-local"
              label="Trước ngày"
              type="datetime-local"
              defaultValue={beforeDate}
              sx={{ width: 250, marginTop: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setBeforeDate(e.currentTarget.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setApproveAllDialogOpen(false);
              }}
            >
              Hủy
            </Button>
            <Button
              onClick={async () => {
                setLoading(true);
                try {
                  await adminApproveAllOrder(beforeDate);
                  dispatch(reloadPendingOrders(pageSize, pageNumber));
                  setLoading(false);
                  toast.success("Xác nhận tất cả đơn hàng thành công");
                } catch (error) {
                  setLoading(false);
                }
                setApproveAllDialogOpen(false);
              }}
              autoFocus
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>

        <LoadingButton
          variant="contained"
          color="error"
          loading={loading}
          onClick={async () => {
            var minutes30ago = new Date();
            minutes30ago.setMinutes(minutes30ago.getMinutes() - 30);
            setBeforeDate(dateToLocaleString(minutes30ago));
            setApproveAllDialogOpen(true);
          }}
        >
          Xác nhận tất cả !
        </LoadingButton>
      </Box>
      <Paper sx={{ marginTop: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Tên shop</TableCell>
                <TableCell align="center">Tổng tiền</TableCell>
                <TableCell align="center">Ngày đặt hàng</TableCell>
                <TableCell align="center">Loại thanh toán</TableCell>
                <TableCell align="center">Đã thanh toán</TableCell>
                <TableCell align="center">Xác nhận</TableCell>
                <TableCell align="center">Hủy</TableCell>
                <TableCell align="center">Chi tiết</TableCell>
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
                      {formatMoney(
                        Math.round(
                          order.total +
                            order.shipFee -
                            order.shippingCostDiscount
                        )
                      ) + "đ"}
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
                      <IconButton
                        onClick={() => {
                          setCancelledOrder(order);
                          setCancelledDialogOpen(true);
                        }}
                      >
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
