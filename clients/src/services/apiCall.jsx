import axios from "axios";

const apiCall = axios.create({
  //baseURL: 'http://127.0.0.1:3001/api',
  baseURL: "/api"
});

export default apiCall;

