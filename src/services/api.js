import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Levantado desde el .env
  headers: {
    'Content-Type': 'application/json'
  }
});

// Opcional: Interceptor para adjuntar Token si existiera
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('session_id');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;