import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});
export default api;
