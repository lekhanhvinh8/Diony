import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "Admin/";

export const createShipper = async (email, password, name, phoneNumber) => {
  const { data } = await http.post(apiEndpoint + "CreateShipper", {
    email,
    password,
    name,
    phoneNumber,
  });

  return data;
};

export const getShippers = async (pageSize = 1, pageNumber = 0) => {
  const { data } = await http.get(apiEndpoint + "GetShippers", {
    params: {
      pageSize,
      pageNumber,
    },
  });

  const { shippers, total } = data;
  return { shippers, total };
};

export const searchShipper = async (key) => {
  const { data: shipper } = await http.get(apiEndpoint + "SearchShipper", {
    params: {
      key,
    },
  });

  return shipper;
};
