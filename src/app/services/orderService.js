import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "OrderAdmin/";

export const getFilteredOrders = async (
  pageSize = 1,
  pageNumber = 0,
  searchKey = "",
  statusCode = null
) => {
  const { data } = await http.get(apiEndpoint + "GetFilteredOrders", {
    params: {
      pageSize,
      pageNumber,
      searchKey,
      statusCode,
    },
  });

  const orderGroups = data.orders.map((order) => {
    const orderGroup = {
      id: order.id,
      orderStatus: order.status,
      orderDate: order.orderDate,
      shopId: order.shopId,
      shopName: order.shopName,
      shipperMail: order.shipperMail,
      shipperName: order.shipperName,
      total: order.total,
      shippingCost: order.shipFee,
      shippingCostDiscount: order.shippingCostDiscount,
      paymentType: order.paymentType,
      items: order.items.map((item) => {
        const orderItem = {
          id: item.id,
          productId: item.productId,
          name: item.name,
          combinationId: item.combinationId,
          combinationName: item.variant,
          itemAvatarUrl: item.image,
          amount: item.amount,
          price: item.price,
        };

        return orderItem;
      }),
    };

    return orderGroup;
  });

  return {
    orderGroups,
    totalOrders: data.totalOrders,
  };
};

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

export const getShipperOrders = async (
  pageSize = 1,
  pageNumber = 0,
  statusCode = null,
  orderBy = null,
  orderByAsc = true
) => {
  const { data } = await http.get(apiUrl + "Shipper/GetFilteredOrders", {
    params: {
      pageSize,
      pageNumber,
      statusCode,
      orderBy,
      orderByAsc,
    },
  });

  return {
    orders: data.orders,
    totalOrders: data.totalOrders,
  };
};

export const getShipperDoneOrders = async (
  pageSize = 1,
  pageNumber = 0,
  searchKey = null
) => {
  const { data } = await http.get(apiUrl + "Shipper/GetFilteredDoneOrders", {
    params: {
      pageSize,
      pageNumber,
      searchKey,
    },
  });

  return {
    orders: data.orders,
    totalOrders: data.totalOrders,
  };
};

export const getShipperOrderDetail = async (orderId) => {
  const { data: order } = await http.get(apiUrl + "Shipper/GetOrderDetail", {
    params: { orderId },
  });

  return order;
};

export const pickupOrder = async (orderId) => {
  await http.get(apiUrl + "Shipper/Pickup", {
    params: { orderId },
  });
};

export const deliveryOrder = async (orderId) => {
  await http.get(apiUrl + "Shipper/Delivery", {
    params: { orderId },
  });
};

export const getDateRevenue = async (date, pageSize = 10, pageNumber = 0) => {
  const { data } = await http.get(apiUrl + "Admin/DateRevenue", {
    params: {
      date,
      pageSize,
      pageNumber,
    },
  });

  const { orders, totalOrders, totalRevenue } = data;
  return { orders, totalOrders, totalRevenue };
};

export const getMonthRevenue = async (date, pageSize = 10, pageNumber = 0) => {
  const { data } = await http.get(apiUrl + "Admin/MonthRevenue", {
    params: {
      date,
      pageSize,
      pageNumber,
    },
  });

  const { orders, totalOrders, totalRevenue } = data;
  return { orders, totalOrders, totalRevenue };
};

export const getYearRevenue = async (date, pageSize = 10, pageNumber = 0) => {
  const { data } = await http.get(apiUrl + "Admin/YearRevenue", {
    params: {
      date,
      pageSize,
      pageNumber,
    },
  });

  const { orders, totalOrders, totalRevenue } = data;
  return { orders, totalOrders, totalRevenue };
};

export const adminCancelOrder = async (orderId, reason) => {
  await http.delete(apiUrl + "OrderHandling/AdminCancelOrder", {
    params: {
      orderId,
      reason,
    },
  });
};

export const shipperCancelOrder = async (orderId, reason) => {
  await http.delete(apiUrl + "OrderHandling/ShipperCancelOrder", {
    params: {
      orderId,
      reason,
    },
  });
};

export const adminApproveAllOrder = async (beforeDate) => {
  await http.get(apiUrl + "Admin/ApproveAllPendingOrders", {
    params: { beforeDate: new Date(beforeDate) },
  });
};
