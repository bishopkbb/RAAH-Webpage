import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost/projects/raahtech/api/v1', // Update for production
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default apiClient;