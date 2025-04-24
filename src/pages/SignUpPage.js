// src/pages/SignUpPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import { useState } from 'react';

function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
const handleSignUp = async () => {
  if (password !== confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }
  try {
    await signup(email, password, nickname);
    alert('회원가입 성공');
    navigate('/');
  } catch (err) {
    alert(err.response?.data || '회원가입 실패');
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
      <p className="text-gray-600 mb-6">회원가입 폼을 입력해주세요.</p>

      <div className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
       
        <input
          type="nickname"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
        onClick={handleSignUp}
          className="w-full bg-[#2F2A89] text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
        >
          회원가입
        </button>
      </div>

      <button
        className="text-sm text-gray-500 mt-6 hover:underline"
        onClick={() => navigate('/')}
      >
        로그인 화면으로 돌아가기
      </button>
    </div>
  );
}

export default SignUpPage;
