import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "selectValue";

export const getValues = async (propId) => {
  const { data: values } = await http.get(
    apiUrl + "selectProperty/GetPropValue/" + propId
  );

  return values;
};

export const createPropertyValue = async (value, propId) => {
  const { data: newValue } = await http.post(apiEndpoint, {
    value: value,
    propertyId: propId,
    status: true,
  });

  return newValue;
};

export const deletePropertyValue = async (valueId) => {
  const result = await http.delete(apiEndpoint + "/" + valueId);
  return result;
};
