import axios from "axios";

export const fetchProducts = (params) => {
  return axios.get("http://127.0.0.1:8000/api/products", { params });
};