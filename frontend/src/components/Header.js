import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const renderLinks = () => {
    if (!user) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/login">Вход</Link>
        </li>
      );
    }

    const profileLink = (
      <li className="nav-item">
        <Link className="nav-link" to={
          user.role === 'student' ? "/student-profile" :
          user.role === 'teacher' ? "/teacher-profile" :
          "/admin-profile"
        }>{`${user.name} ${user.surname}`}</Link>
      </li>
    );

    const commonLinks = (
      <>
        {profileLink}
        {user.role === 'student' && (
          <li className="nav-item">
            <Link className="nav-link" to="/student-grades">Оценки</Link>
          </li>
        )}
        {user.role === 'teacher' && (
          <li className="nav-item">
            <Link className="nav-link" to="/teacher-panel">Оценки</Link>
          </li>
        )}
        <li className="nav-item">
          <button className="nav-link btn btn-link" onClick={handleLogout}>Выход</button>
        </li>
      </>
    );

    if (user.role === 'admin') {
      return (
        <>
          {profileLink}
          <li className="nav-item">
            <Link className="nav-link" to="/teacher-panel">Оценки</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin-panel">Админ-панель</Link>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handleLogout}>Выход</button>
          </li>
        </>
      );
    }

    return commonLinks;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Электронная Зачетка</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {renderLinks()}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
