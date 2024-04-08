import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const getAllProductsAPI = async () => {
  return await axios.get(`${API_ENDPOINT}/api/product/getall`);
};

export const createProductsAPI = async (formData) => {
  return await axios.post(`${API_ENDPOINT}/api/product/create`, formData);
};

export const deleteProductAPI = async (id) => {
  return await axios.delete(`${API_ENDPOINT}/api/product/delete/${id}`);
};

export const updateProductAPI = async (payload) => {
  return await axios.put(
    `${API_ENDPOINT}/api/product/update/${payload.id}`,
    payload.data
  );
};
