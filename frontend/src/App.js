import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import StudentProfile from './components/StudentProfile';
import TeacherProfile from './components/TeacherProfile';
import AdminProfile from './components/AdminProfile';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';
import AdminPanel from './components/AdminPanel';
import TeacherGrades from './components/TeacherGrades';
import StudentGrades from './components/StudentGrades';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Header user={user} setUser={setUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        {user && user.role === 'student' && (
          <>
            <Route path="/student-profile" element={<StudentProfile userData={user} />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/student-grades" element={<StudentGrades userData={user} />} />
          </>
        )}
        {user && user.role === 'teacher' && (
          <>
            <Route path="/teacher-profile" element={<TeacherProfile userData={user} />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher-panel" element={<TeacherGrades />} />
          </>
        )}
        {user && user.role === 'admin' && (
          <>
            <Route path="/admin-profile" element={<AdminProfile userData={user} />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/teacher-panel" element={<TeacherGrades />} />
          </>
        )}
        <Route path="/" element={user ? <Navigate to={`/${user.role}-dashboard`} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;


