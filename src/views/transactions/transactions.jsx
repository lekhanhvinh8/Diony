import { Box, TextField } from "@material-ui/core";
import {
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  changeSearchKey,
  reloadTransactions,
  selectPage,
  selectTransactionType,
  setFromDate,
  setToDate,
} from "../../app/store/ui/transactionPage";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Paper, IconButton, InputBase } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TransactionsTable from "./transactionsTable";

const Transactions = () => {
  const dispatch = useDispatch();
  const {
    transactionType,
    searchKey,
    transactionsReloading,
    transactions,
    fromDate,
    toDate,
  } = useSelector((state) => state.ui.transactionPage);
  const { pageSize, pageNumber, totalTransactions } = useSelector(
    (state) => state.ui.transactionPage
  );

  const totalPages = Math.ceil(totalTransactions / pageSize);

  useEffect(() => {
    dispatch(reloadTransactions());
  }, [dispatch]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#ffffff",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <TextField
            id="datetime-local"
            label="Từ ngày"
            type="date"
            defaultValue={fromDate}
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              dispatch(setFromDate(e.currentTarget.value));
            }}
          />
        </Box>

        <Box
          sx={{
            width: 20,
            marginLeft: 20,
            marginRight: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box width={"100%"}>
            <Divider sx={{ height: 2 }} />
          </Box>
        </Box>

        <Box sx={{}}>
          <TextField
            id="datetime-local"
            label="Đến ngày"
            type="date"
            defaultValue={toDate}
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              dispatch(setToDate(e.currentTarget.value));
            }}
          />
        </Box>

        <Box sx={{ marginLeft: 30, flexGrow: 1 }}>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton sx={{ p: "10px" }} onClick={async () => {}}>
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Tìm theo 1 hoặc nhiều mã đơn hàng"
              fullWidth
              value={searchKey}
              onChange={(e) => {
                dispatch(changeSearchKey(e.currentTarget.value));
              }}
            />
            {searchKey != "" && (
              <IconButton
                onClick={async () => {
                  await dispatch(changeSearchKey(""));
                }}
              >
                <ClearIcon />
              </IconButton>
            )}
          </Paper>
        </Box>

        <Box sx={{ marginLeft: 30, flexGrow: 1 }}>
          <TextField
            select
            label="Chọn Loại"
            value={transactionType}
            variant="outlined"
            onChange={(e) => {
              dispatch(selectTransactionType(e.target.value));
            }}
            fullWidth
          >
            <MenuItem value={"all"}>Tất cả</MenuItem>
            <MenuItem value={"CustomerPayByPaypal"}>
              Khách hàng thanh toán
            </MenuItem>
            <MenuItem value={"CollectFromShipper"}>Thu từ shipper</MenuItem>
            <MenuItem value={"PayForShop"}>Trả sang ví shop</MenuItem>
            <MenuItem value={"CancelPaypalPendingOrder"}>
              Hoàn tiền cho khách hàng
            </MenuItem>
            <MenuItem value={"ShopWithdrawMoneyToPaypal"}>
              Shop rút tiền
            </MenuItem>
          </TextField>
        </Box>

        <Box sx={{ marginLeft: 30, flexGrow: 1 }}>
          <IconButton
            onClick={async () => {
              await dispatch(selectPage(0));
              await dispatch(reloadTransactions());
            }}
          >
            <FilterAltIcon />
          </IconButton>
        </Box>
      </Box>

      {transactionsReloading ? (
        <Box
          sx={{
            mt: 2,
            bgcolor: "#ffffff",
            borderRadius: 3,
            padding: 3,
            height: 300,
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          <TransactionsTable />
        </Box>
      )}

      <Box sx={{ mt: 2 }} display="flex" justifyContent="center">
        {!transactionsReloading && transactions.length === 0 ? null : (
          <Pagination
            count={totalPages}
            page={pageNumber + 1}
            color="primary"
            siblingCount={2}
            boundaryCount={2}
            onChange={async (event, value) => {
              await dispatch(selectPage(value - 1));
              await dispatch(reloadTransactions());
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Transactions;
