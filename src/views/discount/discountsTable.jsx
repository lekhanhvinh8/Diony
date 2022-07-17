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

const DiscountsTable = () => {
  const discounts = useSelector((state) => state.ui.discountPage.discounts);
  const dispatch = useDispatch();

  return (
    <Box>
      <Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Mã</TableCell>
                <TableCell align="center">Ngày tạo</TableCell>
                <TableCell align="center">Từ ngày</TableCell>
                <TableCell align="center">Đến ngày</TableCell>
                <TableCell align="center">Tỷ lệ giảm</TableCell>
                <TableCell align="center">Giá trị đơn tối thiểu</TableCell>
                <TableCell align="center">Mức giảm tối đa</TableCell>
                <TableCell align="center">Lượt dùng</TableCell>
                <TableCell align="center">Đã dùng</TableCell>
                <TableCell align="center">Kích hoạt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {discounts.map((discount) => {
                const createdDate = new Date(discount.createdDate);
                const fromDate = new Date(discount.fromDate);
                const toDate = new Date(discount.toDate);

                const formatedCreatedDate = format(
                  createdDate,
                  "MM/dd/yyyy h:mm a"
                );
                const formatedFromDate = format(fromDate, "MM/dd/yyyy h:mm a");
                const formatedToDate = format(toDate, "MM/dd/yyyy h:mm a");

                return (
                  <TableRow
                    key={discount.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{discount.id}</TableCell>
                    <TableCell align="center">{discount.code}</TableCell>
                    <TableCell align="center">{formatedCreatedDate}</TableCell>
                    <TableCell align="center">{formatedFromDate}</TableCell>
                    <TableCell align="center">{formatedToDate}</TableCell>
                    <TableCell align="center">
                      {discount.discountRate + "%"}
                    </TableCell>
                    <TableCell align="center">
                      {formatMoney(discount.minOrderCost) + "đ"}
                    </TableCell>
                    <TableCell align="center">
                      {formatMoney(discount.maxDiscount) + "đ"}
                    </TableCell>
                    <TableCell align="center">
                      {formatMoney(discount.maxUsings)}
                    </TableCell>
                    <TableCell align="center">
                      {discount.numberOfUsings}
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={discount.enabled}
                        onChange={(event) => {
                          dispatch(
                            changeDiscountEnabled(
                              discount.id,
                              event.target.checked
                            )
                          );
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </TableCell>
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

export default DiscountsTable;
