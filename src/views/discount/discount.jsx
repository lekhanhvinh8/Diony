import {
  reloadDiscounts,
  selectPageNumber,
  selectTab,
} from "../../app/store/ui/discount";

import { Box, Button, CircularProgress, Pagination, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import DiscountsTable from "./discountsTable";

const Discount = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { selectedTab, discountReloading, discounts } = useSelector(
    (state) => state.ui.discountPage
  );
  const { pageSize, pageNumber, totalDiscounts } = useSelector(
    (state) => state.ui.discountPage
  );

  const totalPages = Math.ceil(totalDiscounts / pageSize);

  useEffect(() => {
    dispatch(reloadDiscounts());
  }, [dispatch]);

  return (
    <Box>
      <Button
        color="error"
        endIcon={<AddIcon />}
        variant="contained"
        style={{ padding: 7, marginRight: 10 }}
        onClick={() => {
          history.push("/admin/createDiscount");
        }}
      >
        Mã giảm giá mới
      </Button>

      <TabContext value={selectedTab}>
        <Box
          sx={{
            bgcolor: "#ffffff",
            marginTop: 2,
            borderRadius: 3,
          }}
        >
          <TabList
            variant="fullWidth"
            onChange={async (event, newValue) => {
              await dispatch(selectTab(newValue));
              await dispatch(selectPageNumber(0));
              await dispatch(reloadDiscounts());
            }}
          >
            <Tab label={"Tất cả"} value={"all"} />
            <Tab label={"Đang diễn ra"} value={"happenning"} />
            <Tab label={"Sắp diễn ra"} value={"upcoming"} />
            <Tab label={"Đã kết thúc"} value={"happened"} />
          </TabList>
        </Box>

        {discountReloading ? (
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
            <DiscountsTable />
          </Box>
        )}

        <Box sx={{ mt: 2 }} display="flex" justifyContent="center">
          {!discountReloading && discounts.length === 0 ? null : (
            <Pagination
              count={totalPages}
              page={pageNumber + 1}
              color="primary"
              siblingCount={2}
              boundaryCount={2}
              onChange={async (event, value) => {
                dispatch(selectPageNumber(value - 1));
                await dispatch(reloadDiscounts());
              }}
            />
          )}
        </Box>
      </TabContext>
    </Box>
  );
};

export default Discount;
