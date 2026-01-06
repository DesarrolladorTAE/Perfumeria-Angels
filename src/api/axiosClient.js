import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://mitiendaenlineamx.com.mx/api/",
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;
