import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CalendarPage from './pages/CalendarPage';
import ToDoListPage from './pages/ToDoListPage';
import MyPage from './pages/MyPage'; 
import SignUpPage from './pages/SignUpPage';
import SettingPage from './pages/SettingPage';
import TodayListPage from './pages/TodayListPage';
import { NicknameProvider } from './NicknameContext'; // ✅ 정확
import ArchivePage from './pages/ArchivePage';

function App() {
  return (
  <NicknameProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/todolist" element={<ToDoListPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/todaylist" element={<TodayListPage tasks={[]} categories={[]} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Routes>
    </Router>
  </NicknameProvider>  
  );
}

export default App;
