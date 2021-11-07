import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "selectProperty";

export const getAllSelectProperties = async () => {
  const { data: properties } = await http.get(apiEndpoint);
  return properties;
};

export const createSelectProperty = async (property) => {
  const { data: newProperty } = await http.post(apiEndpoint, property);
  return newProperty;
};

export const assignPropertyToCate = async (propId, cateId) => {
  const result = await http.post(apiEndpoint + "/AddCateProp", null, {
    params: { propId: propId, cateId: cateId },
  });

  return result;
};

export const unassignPropertyToCate = async (propId, cateId) => {
  const result = await http.delete(apiEndpoint + "/RemoveCateProp", {
    params: { propId: propId, cateId: cateId },
  });

  return result;
};

export const updateSelectProperty = async (property) => {
  const { data: updatedProperty } = await http.put(apiEndpoint, property);
  return updatedProperty;
};

export const deleteSelectProperty = async (propId) => {
  const result = await http.delete(apiEndpoint + "/" + propId);
  return result;
};
