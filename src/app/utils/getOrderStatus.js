import { orderStatus } from "../../config.json";

export const getOrderStatus = (statusCode) => {
  for (var prop in orderStatus) {
    if (Object.prototype.hasOwnProperty.call(orderStatus, prop)) {
      if (orderStatus[prop].statusCode === statusCode) return orderStatus[prop];
    }
  }
};
