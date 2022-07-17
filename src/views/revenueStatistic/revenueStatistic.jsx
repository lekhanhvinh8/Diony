import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, TabContext, TabList, TabPanel } from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useEffect, useState } from "react";
import RevenueTable from "./revenueTable";
import { getDateRevenue } from "../../app/services/orderService";
import enLocale from "date-fns/locale/en-US";
import { useDispatch, useSelector } from "react-redux";
import {
  reloadDateRevenue,
  reloadMonthRevenue,
  reloadYearRevenue,
  selectDate,
  selectMonth,
  selectYear,
  setPageNumber,
} from "../../app/store/ui/revenueStatisticPage";
import { formatMoney } from "../../app/utils/formatMoney";

const RevenueStatistic = () => {
  const dispatch = useDispatch();
  const {
    selectedDate,
    selectedMonth,
    selectedYear,
    totalDateRevenue,
    totalMonthRevenue,
    totalYearRevenue,
  } = useSelector((state) => state.ui.revenueStatisticPage);
  const [tabValue, setTabValue] = useState("date");

  useEffect(() => {
    dispatch(reloadDateRevenue());
  }, [dispatch]);

  useEffect(() => {
    if (tabValue === "date") {
      dispatch(reloadDateRevenue());
    } else if (tabValue === "month") {
      dispatch(reloadMonthRevenue());
    } else if (tabValue === "year") {
      dispatch(reloadYearRevenue());
    }
  }, [dispatch, tabValue]);

  return (
    <Card>
      <CardHeader title={"Revenue"} />
      <CardContent>
        <Box>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                variant="fullWidth"
                onChange={(event, newValue) => {
                  dispatch(setPageNumber(0));
                  setTabValue(newValue);
                }}
              >
                <Tab label="Date" value="date" />
                <Tab label="Month" value="month" />
                <Tab label="Year" value="year" />
              </TabList>
            </Box>
            <TabPanel value="date">
              <Box width="100%" display="flex" alignItems="center">
                <Box flexGrow={1}>
                  <Typography color="red" fontWeight="bold" fontSize={20}>
                    {"Tổng doanh thu: " +
                      formatMoney(Math.round(totalDateRevenue)) +
                      "đ"}
                  </Typography>
                </Box>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    variant="inline"
                    inputVariant="outlined"
                    label="Chọn ngày"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    InputAdornmentProps={{ position: "end" }}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={async (date) => {
                      const utcDate = date.toLocaleString();
                      // const englandDate = date.toLocaleString("en-GB", {
                      //   timeZone: "Europe/London",
                      // });
                      // console.log("date:", date);
                      // console.log("utc: ", utcDate);
                      // console.log("englandDate:", englandDate);
                      dispatch(selectDate(utcDate));
                      dispatch(setPageNumber(0));
                      dispatch(reloadDateRevenue());
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </TabPanel>
            <TabPanel value="month">
              <Box width="100%" display="flex" alignItems="center">
                <Box flexGrow={1}>
                  <Typography color="red" fontWeight="bold" fontSize={20}>
                    {"Tổng doanh thu: " +
                      formatMoney(Math.round(totalMonthRevenue)) +
                      "đ"}
                  </Typography>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year", "month"]}
                    variant="inline"
                    inputVariant="outlined"
                    label="Chọn tháng"
                    value={selectedMonth}
                    InputAdornmentProps={{ position: "end" }}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(month) => {
                      const utcMonth = month.toLocaleString();
                      dispatch(selectMonth(utcMonth));
                      dispatch(setPageNumber(0));
                      dispatch(reloadMonthRevenue());
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </TabPanel>
            <TabPanel value="year">
              <Box width="100%" display="flex" alignItems="center">
                <Box flexGrow={1}>
                  <Typography color="red" fontWeight="bold" fontSize={20}>
                    {"Tổng doanh thu: " +
                      formatMoney(Math.round(totalYearRevenue)) +
                      "đ"}
                  </Typography>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year"]}
                    variant="inline"
                    inputVariant="outlined"
                    label="Chọn năm"
                    value={selectedYear}
                    InputAdornmentProps={{ position: "end" }}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(year) => {
                      const utcYear = year.toLocaleString();
                      dispatch(selectYear(utcYear));
                      dispatch(setPageNumber(0));
                      dispatch(reloadYearRevenue());
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>

        <Box>
          <RevenueTable tabValue={tabValue} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueStatistic;
