import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "OrderAdmin/";

export const getPendingOrders = async (pageSize = 1, pageNumber = 0) => {
  const { data } = await http.get(apiEndpoint + "PendingOrder", {
    params: {
      pageSize,
      pageNumber,
    },
  });

  return {
    orders: data.orders,
    totalOrders: data.totalOrders,
    pageSize: data.pageSize,
    pageNumber: data.pageNumber,
  };
};

export const getOrderDetail = async (orderId) => {
  const { data: order } = await http.get(apiEndpoint + "GetOrderDetail", {
    params: {
      orderId,
    },
  });

  return order;
};

export const confirmOrder = async (orderId, shipperId) => {
  await http.get(apiUrl + "OrderHandling/ConfirmPendingOrder", {
    params: {
      orderId,
      shipperId,
    },
  });
};
