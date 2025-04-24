import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiUser } from 'react-icons/fi';
import 'react-calendar/dist/Calendar.css';
import '../index.css';
import { getCategoryByDate, saveCategory } from '../api/category';

function CalendarPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultDate = location.state?.selectedDate || new Date();

  const initialDate = location.state?.selectedDate
    ? new Date(location.state.selectedDate)
    : new Date();

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [activeStartDate, setActiveStartDate] = useState(initialDate);
  const [categories, setCategories] = useState(['', '', '']);
  const [renameInputs, setRenameInputs] = useState(['', '', '']);
  const [category, setCategory] = useState('');
  const [monthName, setMonthName] = useState('');
  const [year, setYear] = useState('');
  const [categoryPid, setCategoryPid] = useState(null);

  const formatLocalDate = (date) => {
    if (!date || !(date instanceof Date)) return '';
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().split('T')[0];
  };

  const fetchCategories = async (targetDate) => {
    const formattedDate = formatLocalDate(targetDate);
    try {
      const data = await getCategoryByDate(formattedDate);
      setCategories([
        data.category1 ?? '',
        data.category2 ?? '',
        data.category3 ?? '',
      ]);
      setCategoryPid(data.pid);
      setRenameInputs(['', '', '']);
    } catch (err) {
      console.error('카테고리 조회 실패:', err);
      setCategories(['', '', '']);
      setRenameInputs(['', '', '']);
      setCategoryPid(null);
    }
  };

  useEffect(() => {
    setMonthName(activeStartDate.toLocaleString('en-US', { month: 'long' }));
    setYear(activeStartDate.getFullYear());
  }, [activeStartDate]);

  useEffect(() => {
    if (selectedDate) fetchCategories(selectedDate);
  }, [selectedDate]);

  const handleInputChange = (idx, value) => {
    const updated = [...renameInputs];
    updated[idx] = value;
    setRenameInputs(updated);
  };

  const handleRenameCategory = async (idx) => {
    const newName = renameInputs[idx].trim();
    if (!newName) return;

    const currentValue = categories[idx];
    const defaultLabel = `Category${idx + 1}`;

    // 이미 저장된 항목이면 막기
    if (currentValue !== '' && currentValue !== defaultLabel) {
      alert('이미 저장된 카테고리는 수정할 수 없어요!');
      return;
    }

    const formattedDate = formatLocalDate(selectedDate);
    const key = `category${idx + 1}`;

    const payload = {
      [key]: newName,
      date: formattedDate,
      pid: categoryPid ?? undefined,
    };

    try {
      const res = await saveCategory(payload);
      const updated = [...categories];
      updated[idx] = res[key] ?? '';
      setCategories(updated);
      setRenameInputs(['', '', '']);
    } catch (err) {
      console.error('카테고리 저장 실패:', err);
      console.log('❗에러 응답 상태 코드:', err.response?.status);
      console.log('❗에러 응답 메시지:', err.response?.data);
      alert('카테고리 저장에 실패했어요. 다시 시도해주세요.');
    }
  };

  const handleGoToTodo = (idx) => {
    const formattedDate = formatLocalDate(selectedDate);
    navigate('/Todolist', {
      state: {
        selectedDate: formattedDate,
        selectedCategory: categories[idx],
        categoryPid: categoryPid,
        categoryIndex: idx,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] px-4 py-3 pb-24">
      <div className="text-center text-2xl font-medium text-gray-500 mt-5 mb-2">
        {monthName} {year}
      </div>

      <div className="calendar-wrapper flex justify-center mb-2">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          locale="ko-KR"
          calendarType="gregory"
          onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
        />
      </div>

      <div className="flex flex-col items-center gap-4 mt-2">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            <button
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full border ${
                category === cat ? 'bg-[#2F2A89] text-white' : 'bg-white text-black border-[#2F2A89]'
              }`}
            >
              {cat || `Category${idx + 1}`}
            </button>

            <input
              type="text"
              placeholder="이름 변경"
              value={renameInputs[idx]}
              onChange={(e) => handleInputChange(idx, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleRenameCategory(idx);
                  e.target.blur();
                }
              }}
              onBlur={() => handleRenameCategory(idx)}
              className="border px-3 py-1 rounded-md text-sm"
            />

            <button
              onClick={() => handleGoToTodo(idx)}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xl"
            >
              +
            </button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#fdfdf0] border-t border-gray-300 py-3 flex justify-center z-50">
        <div className="w-[340px] flex justify-between items-center px-6 text-3xl">
          <button onClick={() => navigate('/calendar')}><FiHome /></button>
          <button onClick={() => navigate('/todaylist')}>🗹</button>
          <button onClick={() => navigate('/mypage')}><FiUser /></button>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
