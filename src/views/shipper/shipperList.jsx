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
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changePageNumber, reloadShippers } from "../../app/store/ui/shippers";

const ShipperList = () => {
  const dispatch = useDispatch();
  const shippers = useSelector((state) => state.ui.shippers.shippers);
  const totalShippers = useSelector((state) => state.ui.shippers.totalShippers);
  const pageNumber = useSelector((state) => state.ui.shippers.pageNumber);
  const pageSize = useSelector((state) => state.ui.shippers.pageSize);

  return (
    <Box>
      <Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Tên</TableCell>
                <TableCell align="center">Số điện thoại</TableCell>
                <TableCell align="center">Ngày tạo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shippers.map((shipper) => {
                const user = shipper.appUser;
                const date = new Date(shipper.createdAt);
                let formatedDate = null;

                try {
                  formatedDate = format(date, "MM/dd/yyyy h:mm a");
                } catch (ex) {}

                return (
                  <TableRow
                    key={shipper.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{shipper.id}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.phoneNumber}</TableCell>
                    <TableCell align="center">{formatedDate}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[pageSize]}
          component="div"
          count={totalShippers}
          rowsPerPage={pageSize}
          page={pageNumber}
          onPageChange={(e, newPage) => {
            dispatch(reloadShippers(pageSize, newPage));
            dispatch(changePageNumber(newPage));
          }}
          onRowsPerPageChange={() => {}}
        />
      </Paper>
    </Box>
  );
};

export default ShipperList;
