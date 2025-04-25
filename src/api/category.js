// src/api/category.js
import axiosInstance from './axiosInstance';

// ✅ 날짜별 카테고리 조회 (GET)
export const getCategoryByDate = async (date) => {
  const response = await axiosInstance.get('/home', {
    params: { date },  // 더 명시적이고 유지보수에 좋음
  });
  return response.data;
};


// ✅ 카테고리 저장 (POST)
export const saveCategory = async (payload) => {
  const response = await axiosInstance.post('/home', payload);
  return response.data; //post로 주고 카테고리 값변경 데이터를 다시 받아야함 savecategory값이 엔터 누르자마 바로 들어오게 post값으로 받아와야함함
};



