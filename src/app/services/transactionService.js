import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "Admin/";

export const getFilteredTransactions = async (
  transactionType,
  orderIds,
  shopEmail,
  fromDate,
  toDate,
  pageSize = 1,
  pageNumber = 0
) => {
  const { data } = await http.get(apiEndpoint + "GetFilteredTransactions", {
    params: {
      transactionType,
      orderIds,
      shopEmail,
      fromDate,
      toDate,
      pageSize,
      pageNumber,
    },
  });
  const { transactions, totalTransactions } = data;
  return { transactions, totalTransactions };
};
