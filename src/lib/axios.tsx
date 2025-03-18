import axios from 'axios';
const api = axios.create({
  baseURL: 'https://fakestoreapi.com', 
  },
);

export const productsApi = {
  getAll: () => api.get('/products'),
};



export default api;