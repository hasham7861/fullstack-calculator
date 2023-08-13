import axios from "axios";

const BackendClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true,
});


export default BackendClient;