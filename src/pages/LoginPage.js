import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
//import { login } from "../api/auth";
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    try {
      const res = await axios.post("http://localhost:8080/login", {
        email,
        password,
      }, {
    
        withCredentials: true 
      });
      alert('로그인 성공');
      sessionStorage.setItem('user', JSON.stringify(res.data)); 
      navigate('/calendar'); 
    } catch (err) {
      alert(err.response?.data.message || '로그인 실패');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      {/* 로고 + 제목 */}
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-[26px] font-mochiy text-[#000000] flex items-center gap-2">
          <span className="text-[28px]">🗹</span>
          <span>Check-In</span>
        </h1>
        <p className="text-[20px] font-mplus text-[#000000] mt-3 tracking-tight">
          Login to your account
        </p>
      </div>

      {/* 로그인 폼 */}
      <div className="w-full max-w-xs">
        {/* 이메일 입력 */}
        <div className="flex items-center rounded-xl border border-[#C5C5C5] bg-white px-4 py-3 shadow-sm">
          <div className="bg-[#2F2A89] p-2 rounded-md mr-3">
            <span className="text-white text-sm">📧</span>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full focus:outline-none text-sm placeholder:text-[#7D7D7D] bg-transparent"
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="flex items-center rounded-xl border border-[#C5C5C5] bg-white px-4 py-3 shadow-sm mt-3">
          <div className="bg-[#2F2A89] p-2 rounded-md mr-3">
            <span className="text-white text-sm">🔒</span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleLogin();
            }}
            className="w-full focus:outline-none text-sm placeholder:text-[#7D7D7D] bg-transparent"
          />
        </div>


        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className="w-full bg-[#2F2A89] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#1f1a69] transition mt-10"
        >
          Login
        </button>

        

        {/* 회원가입 안내 */}
        <div className="text-center text-sm text-[#777777] mt-6">
          Don’t have an account?{' '}
          <span className="text-[#2F2A89] font-semibold cursor-pointer hover:underline"
          onClick={() => navigate('/signup')}
       >    
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

  