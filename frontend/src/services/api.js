/**
 * License: NPL-KK
 * File: services/api.js
 */
import axios from 'axios';

// Bug fix: base URL sebelumnya hardcoded di banyak tempat / tidak ada sama sekali.
// Sekarang terpusat dan bisa dikonfigurasi lewat .env (VITE_API_URL).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export default api;

/**
 * License: NPL-KK
 */
