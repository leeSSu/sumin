// src/api/archive.js
import axiosInstance from './axiosInstance';

export const fetchArchiveData = async () => {
  const response = await axiosInstance.get('/storageBox');
  return response.data;
};
