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
  IconButton,
} from "@mui/material";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney } from "./../../app/utils/formatMoney";
import {
  reloadDateRevenue,
  setPageNumber,
} from "../../app/store/ui/revenueStatisticPage";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useHistory } from "react-router-dom";

const RevenueTable = ({ tabValue }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { orders, totalOrders, pageNumber, pageSize } = useSelector(
    (state) => state.ui.revenueStatisticPage
  );

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Delivery Date</TableCell>
              <TableCell align="center">Shipper Id</TableCell>
              <TableCell align="center">Revenue</TableCell>
              {/* <TableCell align="center">Profit</TableCell> */}
              <TableCell align="center">Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const { id, shippedAt, shipperId, totalMoney } = order;
              const date = new Date(shippedAt);
              let formatedDate = null;

              try {
                formatedDate = format(date, "MM/dd/yyyy h:mm a");
              } catch (ex) {}

              return (
                <TableRow
                  key={order.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{id}</TableCell>
                  <TableCell align="center">{formatedDate}</TableCell>
                  <TableCell align="center">{shipperId}</TableCell>
                  <TableCell align="center">
                    {formatMoney(totalMoney) + "đ"}
                  </TableCell>
                  {/* <TableCell align="center">
                    {formatMoney((totalMoney * 3) / 100) + "đ"}
                  </TableCell> */}
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
          dispatch(setPageNumber(newPage));

          if (tabValue === "date") dispatch(reloadDateRevenue());
        }}
        onRowsPerPageChange={() => {}}
      />
    </Box>
  );
};

export default RevenueTable;
