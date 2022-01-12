import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "Admin/";

export const getDateRevenue = async (date) => {
  const { data } = await http.get(apiEndpoint + "DateRevenueChart", {
    params: { date },
  });

  return data;
};

export const getMonthRevenue = async (date) => {
  const { data } = await http.get(apiEndpoint + "MonthRevenueChart", {
    params: { date },
  });

  return data;
};

export const getYearRevenue = async (date) => {
  const { data } = await http.get(apiEndpoint + "YearRevenueChart", {
    params: { date },
  });

  return data;
};
