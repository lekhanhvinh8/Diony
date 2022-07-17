import { Box, Paper, IconButton, InputBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { reloadOrders, setSearchKey } from "../../app/store/ui/doneOrderPage";
import { useState } from "react";

export default function SearchBar(props) {
  const dispatch = useDispatch();
  const { pageSize, pageNumber, searchKey } = useSelector(
    (state) => state.ui.doneOrderPage
  );
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
            await dispatch(reloadOrders(pageSize, pageNumber, searchKey));
          }}
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Tìm đơn hàng theo mã, tên sản phẩm, tên shop"
          fullWidth
          value={searchKey}
          onChange={(e) => {
            dispatch(setSearchKey(e.currentTarget.value));
          }}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await dispatch(reloadOrders(pageSize, 0, searchKey));
            }
          }}
        />
        {searchKey != "" && (
          <IconButton
            onClick={async () => {
              dispatch(setSearchKey(""));
              await dispatch(reloadOrders(pageSize, 0, ""));
            }}
          >
            <ClearIcon />
          </IconButton>
        )}
      </Paper>
    </Box>
  );
}
