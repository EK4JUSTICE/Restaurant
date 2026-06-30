import axios from 'axios';

// Looks for the Vercel variable first; falls back to localhost if you're working locally
const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const menuService = {
  getMenuItems: () => api.get('/menu/'),
};

export const orderService = {
  createOrder: (orderData) => api.post('/orders/', orderData),
};

export const authService = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/auth/register/', userData),
};

export default api;