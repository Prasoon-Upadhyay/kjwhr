import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default client;