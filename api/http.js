import axios from "axios";

const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.authorization = `bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      // simple redirect (works in dev + prod)
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default http;