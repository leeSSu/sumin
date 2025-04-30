// src/pages/MyPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiFolder } from 'react-icons/fi';
import { BsPerson } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';
import { useEffect } from 'react';
import { useContext } from 'react';
import { NicknameContext } from '../NicknameContext';
import axios from '../api/axiosInstance';

function MyPage() {
  const navigate = useNavigate();
  const { nickname, setNickname } = useContext(NicknameContext);

  
  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const res = await axios.get('/myPage');
        setNickname(res.data.nickname);
      } catch (err) {
        console.error('닉네임 불러오기 실패:', err);
      }
    };

    fetchNickname();
  }, [setNickname]);

  return (
      <div className="min-h-screen bg-[#f9f9f9] px-6 py-6 pb-24">
  
        {/* 상단 헤더 */}
        <div className="relative mb-8">
          {/* 오른쪽 상단 화살표 */}
          <button
            onClick={() => navigate('/calendar')}
            className="absolute top-0 right-0 text-[#2F2A89] text-3xl"
          >
            ←
          </button>
  
          {/* 가운데 Check-In만 단독으로 */}
          <div className="text-center -mt-2">
            <span className="text-xl font-semibold">🗹Check-In</span>
          </div>
        </div>

{/* 프로필 */}
      <div className="flex items-center gap-4 mb-4 mt-10">
      <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-600">
  <BsPerson />
</div>
<div>
  <p className="text-l font-bold mb-1">{nickname}</p>
</div>
</div>

{/* 설정 */}
<div className="mt-8 bg-[#FFFDEB] rounded-xl p-10 flex justify-between items-center">
  {/* 왼쪽 텍스트 */}
  <div>
  <div className="text-l font-semibold">Setting</div>
    
  </div>

  {/* 오른쪽 아이콘 묶음 */}
  <div className="flex items-center">
    <CiSettings
      className="text-3xl text-gray-400 cursor-pointer"
      onClick={() => navigate('/setting')}
    />
  </div>


</div>



      {/* 하단 내비게이션 바 */}
      <div className="fixed bottom-1 left-0 right-0 bg-[#FFFDEB] flex justify-around items-center px-6 py-3 text-3xl shadow-inner z-50">
        <button onClick={() => navigate('/calendar')}><FiHome /></button>
        <button onClick={() => navigate('/todaylist')}>🗹</button>
        <button onClick={() => navigate('/archive')}><FiFolder /></button>
        <button onClick={() => navigate('/mypage')}><FiUser /></button>
      </div>
     </div> 
  )
}

export default MyPage;
