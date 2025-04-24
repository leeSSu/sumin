// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // ✅ 세션 쿠키 포함
});

export default axiosInstance;
