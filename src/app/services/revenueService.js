import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "Admin/";

export const getDateRevenue = async (date) => {
  const { data } = await http.get(apiEndpoint + "DateRevenueChart", {
    params: { date: date.toLocaleString() },
  });

  return data;
};

export const getMonthRevenue = async (date) => {
  const { data } = await http.get(apiEndpoint + "MonthRevenueChart", {
    params: { date: date.toLocaleString() },
  });

  return data;
};

export const getYearRevenue = async (date) => {
  const { data } = await http.get(apiEndpoint + "YearRevenueChart", {
    params: { date: date.toLocaleString() },
  });

  return data;
};

export const getDashboardInfo = async () => {
  const { data } = await http.get(apiEndpoint + "DashboardInfo");

  const {
    totalProducts,
    totalSeller,
    totalRevenue,
    totalOrders,
    totalCustomers,
  } = data;

  return {
    totalProducts,
    totalSeller,
    totalRevenue,
    totalOrders,
    totalCustomers,
  };
};
