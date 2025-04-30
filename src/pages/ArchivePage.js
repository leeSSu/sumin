import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiFolder } from 'react-icons/fi';
import { fetchArchiveData } from '../api/archive';

function ArchivePage() {
  const navigate = useNavigate();
  const [archiveData, setArchiveData] = useState([]);

  const handleDateClick = (dateStr) => {
    navigate('/calendar', {
      state: { selectedDate: dateStr }, // 예: "2025-04-30"
    });
  };
  
  

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchArchiveData();
        console.log('📂 archive data:', data);
        setArchiveData(data);
      } catch (error) {
        console.error('보관함 데이터 불러오기 실패:', error);
      }
    };

    loadData();
  }, []);

  const sortedArchive = [...archiveData].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="min-h-screen bg-[#f9f9f9] px-6 py-6 pb-24">
      {/* 상단 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold ">📂 보관함</h1>
        <button onClick={() => navigate('/calendar')} className="text-[#2F2A89] text-3xl">←</button>
      </div>

      {/* 보관함 리스트 */}
      {sortedArchive.length > 0 ? (
        <div className="space-y-8">
          {sortedArchive.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition"
            onClick={() => handleDateClick(item.date)}>
              <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-bold">{item.date}</div>
                <div className="text-sm text-gray-400">
                  {item.checkedCount}/{item.totalCount}
                </div>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                  className="bg-[#2F2A89] h-4 rounded-full text-xs text-white text-center"
                  style={{ width: `${Math.round(item.successRate)}%` }}
                >
                  {Math.round(item.successRate)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          아직 저장된 기록이 없어요 📂
        </div>
      )}

      {/* 하단 네비게이션 바 */}
      <div className="fixed bottom-1 left-0 right-0 bg-[#FFFDEB] flex justify-around items-center px-6 py-3 text-3xl shadow-inner">
        <button onClick={() => navigate('/calendar')}><FiHome /></button>
        <button onClick={() => navigate('/todaylist')}>🗹</button>
        <button onClick={() => navigate('/archive')}><FiFolder /></button>
        <button onClick={() => navigate('/mypage')}><FiUser /></button>
      </div>
    </div>
  );
}

export default ArchivePage;
