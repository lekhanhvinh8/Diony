import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "category";

export const getAllCategories = async () => {
  const { data: categories } = await http.get(apiEndpoint);
  return categories;
};

export const getCategory = async (cateId) => {
  const { data: category } = await http.get(apiEndpoint + "/" + cateId);
  return category;
};

export const createCategory = async (category) => {
  const { data: newCategory } = await http.post(apiEndpoint, category);
  return newCategory;
};
