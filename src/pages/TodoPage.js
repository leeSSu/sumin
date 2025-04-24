import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ToDoListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const date = query.get('date') || new Date().toISOString().split('T')[0];
  const category = query.get('category') || 'To-do List';

  const storageKey = `${date}_${category}`;
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  const handleAdd = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { text: newTask, checked: false }]);
    setNewTask('');
  };

  const toggleCheck = (idx) => {
    const updated = [...tasks];
    updated[idx].checked = !updated[idx].checked;
    setTasks(updated);
  };

  const deleteTask = (idx) => {
    const updated = [...tasks];
    updated.splice(idx, 1);
    setTasks(updated);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-4 flex flex-col justify-start">
      {/* 상단 */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate('/calendar')} className="text-xl">🏠</button>
        <div className="text-lg font-semibold">{date}</div>
        <div />
      </div>

      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-6">TO-DO LIST</h1>

      {/* 목록 */}
      <ul className="space-y-4 mb-6">
        {tasks.map((task, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => toggleCheck(idx)}
                className="w-5 h-5"
              />
              <span className={task.checked ? 'line-through text-gray-400' : ''}>
                {task.text}
              </span>
            </label>
            <button onClick={() => deleteTask(idx)} className="text-red-500 text-xl">×</button>
          </li>
        ))}
      </ul>

      {/* 추가 입력 */}
      <div className="flex items-center gap-3 mt-auto">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
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
