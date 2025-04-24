import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getToDos, addToDo, toggleToDo, deleteToDo } from '../api/todo';

function ToDoListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, categoryPid, selectedCategory } = location.state || {};

  const formattedDate =
    typeof selectedDate === 'string'
      ? selectedDate
      : selectedDate instanceof Date
      ? selectedDate.toLocaleDateString('ko-KR')
      : '날짜 없음';

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      if (!categoryPid || !selectedCategory) return;
      try {
        const data = await getToDos(categoryPid, selectedCategory);
        const validData = Array.isArray(data) ? data : (data && data.task ? [data] : []);
        setTasks(validData);
      } catch (err) {
        console.error('할 일 불러오기 실패:', err);
      }
    };

    fetchTasks();
  }, [categoryPid, selectedCategory]);

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    try {
      const added = await addToDo(categoryPid, selectedCategory, newTask);
      setTasks((prev) => [...prev, added]);
      setNewTask('');
    } catch (err) {
      console.error('추가 실패:', err);
    }
  };

  const handleToggle = async (pid) => {
    try {
      // UI에 즉시 반영
      setTasks((prev) =>
        prev.map((task) =>
          task.pid === pid ? { ...task, checked: !task.checked } : task
        )
      );
  
      // 백엔드 저장 (느리게 와도 괜찮음)
      await toggleToDo(pid);
    } catch (err) {
      console.error('체크 실패:', err);
    }
  };
  
  const handleDelete = async (pid) => {
    try {
      await deleteToDo(pid);
      setTasks((prev) => prev.filter((task) => task.pid !== pid));
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-4 flex flex-col">
      {/* 상단 */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate('/calendar',  { state: { selectedDate } })} className="text-xl">←</button>
        <div className="text-lg font-semibold">{formattedDate}</div>
        <div style={{ width: '1.5rem' }} />
      </div>

      <h2 className="text-3xl font-bold mb-6">TO-DO LIST: {selectedCategory || '카테고리 없음'}</h2>

      {/* 할 일 목록 */}
      <ul className="space-y-4 mb-6">
        {tasks.map((task) => (
          <li key={task.pid} className="flex items-center justify-between">
            <label className="flex items-center gap-3">
            <input
            type="checkbox"
            checked={task.isChecked ?? task.checked ?? false}
            onChange={
              (task.isChecked ?? task.checked ?? false)
              ? undefined // 체크되어 있으면 클릭 불가
              : () => handleToggle(task.pid)
            }
            className="w-5 h-5"
            />
            <span className={
              (task.isChecked ?? task.checked) ? 'line-through text-gray-400' : ''
            }
            >

                {task.task || '할 일 없음'}
              </span>
            </label>
            <button onClick={() => handleDelete(task.pid)} className="text-red-500 text-xl">×</button>
          </li>
        ))}
      </ul>

      {/* 할 일 추가 */}
      <div className="flex items-center gap-3 mt-1 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd();
          }}
          placeholder="New Task"
          className="flex-1 border px-4 py-2 rounded-lg shadow-sm"
        />
        <button
          onClick={handleAdd}
          className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl"
        >
          ＋
        </button>
      </div>
    </div>
  );
}

export default ToDoListPage;







