import axios from 'axios';

// Get the token from localStorage
const getToken = () => localStorage.getItem('admin_token');

const api = axios.create({
  // Use your Laravel backend's URL
  baseURL: import.meta.env.VITE_API_BASE_URL, 
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor to handle 401 (Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      // Reload the page to redirect to login
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;