import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const userString = localStorage.getItem('user');
    if (userString && userString !== 'null') {
      try {
        const userData = JSON.parse(userString);
        if (userData && userData.access_token) {
          config.headers.Authorization = `Bearer ${userData.access_token}`;
        }
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
        localStorage.removeItem('user'); // Clean up corrupt data
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration or unauthorized access
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear user data on unauthorized response
      localStorage.removeItem('user');
      window.location.href = '/dashboard/login';
    }
    return Promise.reject(error);
  }
);

export default api;
