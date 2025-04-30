// src/pages/TodayListPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiFolder } from 'react-icons/fi';
import API from '../api/axiosInstance';


function TodayListPage() {
  const navigate = useNavigate();
  const today = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().split('T')[0];


  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchTodayTasks = async () => {
      try {
        const res = await API.get('/toDoList'); 
        setTasks(res.data); 
        const uniqueCategories = [...new Set(res.data.map((task) => task.categoryName || task.category))];
      setCategories(uniqueCategories);

  

      } catch (err) {
        console.error('오늘의 투두 불러오기 실패:', err);
      }
    };

    fetchTodayTasks();
  }, [today]);

  return (
    <div className="min-h-screen bg-[#f9f9f9] px-6 py-6 pb-24">
      {/* 상단 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🗓️ {today}</h1>
        <button onClick={() => navigate('/calendar')} className="text-[#2F2A89] text-3xl">←</button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">오늘의 To-do List</h2>

      {/* 카테고리별 투두리스트 */}
      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <h3 className="font-bold text-xl mb-2">{cat}</h3>
          <ul className="space-y-2">
            {tasks
              .filter((task) => (task.categoryName || task.category) === cat)
              .map((task) => (
                <li key={task.pid} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.isChecked ?? task.checked ?? false}
                    disabled={task.isChecked ?? task.checked ?? false}
                    className="w-5 h-5"
                  />
                  <span className={(task.isChecked ?? task.checked) ? 'line-through text-gray-400' : ''}>
                    {task.task || task.text || '할 일 없음'}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      ))}

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-1 left-0 right-0 bg-[#FFFDEB] flex justify-around items-center px-6 py-3 text-3xl shadow-inner">
        <button onClick={() => navigate('/calendar')}><FiHome /></button>
        <button onClick={() => navigate('/todaylist')}>🗹</button>
        <button onClick={() => navigate('/archive')}><FiFolder /></button>
        <button onClick={() => navigate('/mypage')}><FiUser /></button>
      </div>
    </div>
  );
}

export default TodayListPage;


