// src/pages/SettingPage.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NicknameContext } from '../NicknameContext';
import axios from 'axios';

function SettingPage() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const { nickname, setNickname } = useContext(NicknameContext);
  const [inputName, setInputName] = useState('');
  
  useEffect(() => {
    setInputName(nickname);
  }, [nickname]);

  const handleSave = async() => {
    try {
      
      await axios.post(
        '/changeNickname',
        { nickname: inputName },
        { withCredentials: true } 
      );
  
    setNickname(inputName);
    localStorage.setItem('nickname', inputName);
    setEditMode(false);
    navigate('/mypage');
  } catch (err) {
    console.error('닉네임 변경 실패:', err);
    alert('닉네임 변경에 실패했어요. 다시 시도해주세요.');
  }
};

  // ✅ 백엔드 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      await axios.post('/logout'); 
      navigate('/login');          
    } catch (err) {
      console.error('로그아웃 실패:', err);
      alert('로그아웃에 실패했어요. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] px-6 py-6">
      <h1 className="text-2xl font-bold mb-6">설정</h1>

      <div className="space-y-4">
        {/* 닉네임 변경 버튼 */}
        {editMode ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
              }}
              className="border px-4 py-2 rounded-md flex-1"
            />
            <button
              onClick={handleSave}
              className="bg-[#2F2A89] text-white px-4 py-2 rounded-md"
            >
              저장
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-[#2F2A89] text-white py-2 rounded-md hover:bg-[#231d75] transition"
            >
              닉네임
            </button>
          </div>
        )}

        {/* ✅ 서버 로그아웃 버튼 */}
        <button
          onClick={handleLogout}
          className="w-full bg-[#2F2A89] text-white py-2 rounded-md hover:bg-[#231d75]"
        >
          로그아웃
        </button>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 mt-6 hover:underline"
      >
        ← 돌아가기
      </button>
    </div>
  );
}

export default SettingPage;

