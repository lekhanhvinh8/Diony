import http from "./httpService";
import { apiUrl } from "../../config.json";
import axios from "axios";
import FormData from "form-data";

const apiEndpoint = apiUrl + "category";

// export const getAllCategories = async () => {
//   const { data: categories } = await http.get(apiEndpoint);
//   return categories;
// };

export const getAllCategories = async () => {
  const result = await axios.get(apiEndpoint);
  return result.data;
};

export const getCategory = async (cateId) => {
  const { data: category } = await http.get(apiEndpoint + "/" + cateId);
  return category;
};

export const createCategory = async (category) => {
  const { data: newCategory } = await http.post(apiEndpoint, category);
  return newCategory;
};

export const updateCategory = async (category) => {
  const { data: updatedCategory } = await http.put(apiEndpoint, category);
  return updatedCategory;
};

export const deleteCategory = async (cateId) => {
  const result = await http.delete(apiEndpoint + "/" + cateId);
  return result;
};

export const updateStatus = async (cateId, status) => {
  const result = await http.post(apiEndpoint + "/updateStatus", null, {
    params: {
      id: cateId,
      status: status,
    },
  });

  return result;
};

export const updateImageService = async (cateId, newImage) => {
  const formData = new FormData();
  formData.append("file", newImage);
  const result = await http.post(apiEndpoint + "/addImage", formData, {
    params: {
      id: cateId,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result;
};
