import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "Admin/";

export const createDiscount = async (discount) => {
  const response = await http.post(apiEndpoint + "createDiscount", discount);

  return response;
};

export const getDiscountsByStatus = async (status, pageSize, pageNumber) => {
  const { data } = await http.get(apiEndpoint + "getDiscountsByStatus", {
    params: {
      status,
      pageSize,
      pageNumber,
    },
  });

  const { discounts, totalDiscounts } = data;
  return { discounts, totalDiscounts };
};

export const changeDiscountEnabled = async (discountId, enabled) => {
  const response = await http.get(apiEndpoint + "ChangeDiscountEnabled", {
    params: {
      discountId,
      enabled,
    },
  });
};
