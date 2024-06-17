import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Login({ setUser }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', loginData);
      const user = response.data;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'student') {
        navigate('/student-dashboard');
      } else if (user.role === 'teacher') {
        navigate('/teacher-dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: '60px' }}>
      <div className="card" style={{ width: '24rem' }}>
        <div className="card-body">
          <h2 className="card-title">Вход</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="text" className="form-control" id="email" name="email" value={loginData.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Пароль:</label>
              <div className="input-group">
                <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="password" value={loginData.password} onChange={handleChange} autoComplete="current-password" />
                <button type="button" className="btn btn-outline-secondary" onClick={toggleShowPassword}>{showPassword ? "Скрыть" : "Показать"} пароль</button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Войти</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;



