// src/api/auth.js
import API from './axiosInstance';

// 로그인
export const login = async (email, password) => {
  const res = await API.post('/login', { email, password });
  return res.data;
};

// 회원가입
export const signup = async (email, password, nickname) => {
  const res = await API.post('/join', {
    email,
    password,
    nickname,
  });
  return res.data;
};

// 로그아웃 (선택)
export const logout = async () => {
  const res = await API.post('/logout');
  return res.data;
};

// 마이페이지 정보 조회 (선택)
export const getMyInfo = async () => {
  const res = await API.get('/myPage');
  return res.data;
};
