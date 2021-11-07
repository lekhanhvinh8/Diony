import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "typingProperty";

export const getAllTypingProperties = async () => {
  const { data: properties } = await http.get(apiEndpoint);
  return properties;
};

export const createTypingProperty = async (property) => {
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

export const updateTypingProperty = async (property) => {
  const { data: updatedProperty } = await http.put(apiEndpoint, property);
  return updatedProperty;
};

export const deleteTypingProperty = async (propId) => {
  const result = await http.delete(apiEndpoint + "/" + propId);
  return result;
};
