import axios from 'axios';

const api = axios.create({
  // baseURL is proxied by Vite dev server
});

export default api;

