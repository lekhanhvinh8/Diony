import { Box, Paper, IconButton, InputBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {
  changeSearchKey,
  reloadOrders,
  selectPageNumber,
} from "../../app/store/ui/ordersPage";

export default function SearchBar(props) {
  const dispatch = useDispatch();
  const searchKey = useSelector((state) => state.ui.ordersPage.searchKey);

  return (
    <Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton
          sx={{ p: "10px" }}
          onClick={async () => {
            await dispatch(selectPageNumber(0));
            await dispatch(reloadOrders());
          }}
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Tìm theo Id, tên sản phẩm, tên shop"
          fullWidth
          value={searchKey}
          onChange={(e) => {
            dispatch(changeSearchKey(e.currentTarget.value));
          }}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await dispatch(selectPageNumber(0));
              await dispatch(reloadOrders());
            }
          }}
        />
        {searchKey != "" && (
          <IconButton
            onClick={async () => {
              await dispatch(changeSearchKey(""));
              await dispatch(selectPageNumber(0));
              await dispatch(reloadOrders());
            }}
          >
            <ClearIcon />
          </IconButton>
        )}
      </Paper>
    </Box>
  );
}
