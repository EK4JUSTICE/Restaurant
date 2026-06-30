import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
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