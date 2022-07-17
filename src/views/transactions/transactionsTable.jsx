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
  Switch,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { formatMoney } from "../../app/utils/formatMoney";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link, useHistory } from "react-router-dom";
import { changeDiscountEnabled } from "../../app/store/ui/discount";

const TransactionsTable = () => {
  const transactions = useSelector(
    (state) => state.ui.transactionPage.transactions
  );
  const dispatch = useDispatch();

  const mapTransTypeToName = (type) => {
    switch (type) {
      case "CustomerPayByPaypal":
        return "Khách hàng thanh toán";
      case "CollectFromShipper":
        return "Thu từ shipper";
      case "PayForShop":
        return "Trả sang ví shop";
      case "CancelPaypalPendingOrder":
        return "Hoàn tiền cho khách hàng";
      case "ShopWithdrawMoneyToPaypal":
        return "Shop rút tiền";
      default:
        return "Tất cả";
    }
  };

  return (
    <Box>
      <Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Ngày giao dịch</TableCell>
                <TableCell align="center">Mã đơn hàng</TableCell>
                <TableCell align="center" sx={{ minWidth: 150 }}>
                  Loại
                </TableCell>
                <TableCell align="center">Tổng tiền</TableCell>
                <TableCell align="center">Tổng tiền USD</TableCell>
                <TableCell align="center">Người mua</TableCell>
                <TableCell align="center">Shop</TableCell>
                <TableCell align="center">Shipper</TableCell>
                <TableCell align="center">Người thanh toán (Paypal)</TableCell>
                <TableCell align="center">Người rút tiền (Paypal)</TableCell>
                <TableCell align="center">Mã giao dịch Paypal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => {
                const {
                  id,
                  transactionDate,
                  totalMoney,
                  totalMoneyUSD,
                  type,
                  senderInformation,
                  receiverInformation,
                  customerEmail,
                  shopEmail,
                  shipperMail,
                  paypalPayerEmail,
                  paypalWithdrawerEmail,
                  orderIds,
                  description,
                  paypalTransactionId,
                } = transaction;

                const formatedCreatedDate = format(
                  new Date(transactionDate),
                  "MM/dd/yyyy h:mm a"
                );

                return (
                  <TableRow
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{id}</TableCell>
                    <TableCell align="center">{formatedCreatedDate}</TableCell>
                    <TableCell align="center">
                      {orderIds.split(",").join("\n")}
                    </TableCell>
                    <TableCell align="center">
                      {mapTransTypeToName(type)}
                    </TableCell>
                    <TableCell align="center">
                      {formatMoney(Math.round(totalMoney)) + "đ"}
                    </TableCell>
                    <TableCell align="center">
                      {formatMoney(Math.round(totalMoneyUSD)) + "$"}
                    </TableCell>
                    <TableCell align="center">{customerEmail}</TableCell>
                    <TableCell align="center">{shopEmail}</TableCell>
                    <TableCell align="center">{shipperMail}</TableCell>
                    <TableCell align="center">{paypalPayerEmail}</TableCell>
                    <TableCell align="center">
                      {paypalWithdrawerEmail}
                    </TableCell>

                    <TableCell align="center">{paypalTransactionId}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TransactionsTable;
