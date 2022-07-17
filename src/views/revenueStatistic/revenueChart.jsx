import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  BarChart,
  Bar,
} from "recharts";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import {
  getDateRevenue,
  getMonthRevenue,
  getYearRevenue,
} from "../../app/services/revenueService";
import { DatePicker, TabContext, TabList, TabPanel } from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const RevenueChart = () => {
  const [dateRevenueData, setDateRevenueData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [monthRevenueData, setMonthRevenueData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const [yearRevenueData, setYearRevenueData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date());

  const [tabValue, setTabValue] = useState("date");

  useEffect(() => {
    const asyncFunc = async () => {
      const dateRevenue = await getDateRevenue(selectedDate);
      setDateRevenueData(
        dateRevenue.map((d) => {
          return {
            name: d.name,
            revenue: d.count,
            pv: 2400,
            amt: 2400,
          };
        })
      );
    };

    asyncFunc();
  }, [selectedDate]);

  useEffect(() => {
    const asyncFunc = async () => {
      const monthRevenue = await getMonthRevenue(selectedMonth);
      setMonthRevenueData(
        monthRevenue.map((m) => {
          return {
            name: m.name,
            revenue: m.count,
            pv: 2400,
            amt: 2400,
          };
        })
      );
    };

    asyncFunc();
  }, [selectedMonth]);

  useEffect(() => {
    const asyncFunc = async () => {
      const yearRevenue = await getYearRevenue(selectedYear);

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      setYearRevenueData(
        yearRevenue.map((m) => {
          return {
            name: monthNames[m.name - 1],
            revenue: m.count,
            pv: 2400,
            amt: 2400,
          };
        })
      );
    };

    asyncFunc();
  }, [selectedYear]);

  return (
    <Card>
      <CardHeader title={"Doanh thu"} />
      <CardContent>
        <Box>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                variant="fullWidth"
                onChange={(event, newValue) => {
                  setTabValue(newValue);
                }}
              >
                <Tab label="Ngày" value="date" />
                <Tab label="Tháng" value="month" />
                <Tab label="Năm" value="year" />
              </TabList>
            </Box>
            <TabPanel value="date">
              <Box width="100%" display="flex" justifyContent="right">
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
                      setSelectedDate(date);
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <div
                style={{
                  width: "100%",
                  height: 400,
                  marginTop: 10,
                }}
              >
                <ResponsiveContainer>
                  <LineChart
                    width="100%"
                    height={400}
                    data={dateRevenueData}
                    unit="đ"
                    margin={{ left: 20, bottom: 20 }}
                  >
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                    <XAxis dataKey="name">
                      <Label value="Giờ" offset={0} position="bottom" />
                    </XAxis>
                    <YAxis unit="đ" />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabPanel>
            <TabPanel value="month">
              <Box width="100%" display="flex" justifyContent="right">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year", "month"]}
                    variant="inline"
                    inputVariant="outlined"
                    label="Pick month"
                    value={selectedMonth}
                    InputAdornmentProps={{ position: "end" }}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(month) => {
                      setSelectedMonth(month);
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <div style={{ width: "100%", height: 400, marginTop: 10 }}>
                <ResponsiveContainer>
                  <LineChart
                    width={400}
                    height={400}
                    data={monthRevenueData}
                    margin={{ left: 20, bottom: 20 }}
                  >
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                    <XAxis dataKey="name">
                      <Label value="Ngày" offset={0} position="bottom" />
                    </XAxis>
                    <YAxis unit="đ" />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabPanel>
            <TabPanel value="year">
              <Box width="100%" display="flex" justifyContent="right">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year"]}
                    variant="inline"
                    inputVariant="outlined"
                    label="Pick year"
                    value={selectedYear}
                    InputAdornmentProps={{ position: "end" }}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(year) => {
                      setSelectedYear(year);
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <div style={{ width: "100%", height: 400, marginTop: 10 }}>
                <ResponsiveContainer>
                  <LineChart
                    width={400}
                    height={400}
                    data={yearRevenueData}
                    margin={{ left: 20, bottom: 20 }}
                  >
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                    <XAxis dataKey="name">
                      <Label value="tháng" offset={0} position="bottom" />
                    </XAxis>
                    <YAxis unit="đ" />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
