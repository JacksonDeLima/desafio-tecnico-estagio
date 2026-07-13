import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5273/api',
});

export default api;
