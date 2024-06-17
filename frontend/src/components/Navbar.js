import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Ensure you have a UserContext

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #e0e0e0'
  };

  return (
    <nav style={navStyle}>
      <Link className="navbar-brand" to="/">Электронная зачетная книжка</Link>
      <div>
        <ul className="navbar-nav ml-auto" style={{ display: 'flex', listStyle: 'none' }}>
          {user ? (
            <>
              <li className="nav-item" style={{ marginRight: '10px' }}>
                <Link className="nav-link" to={
                  user.role === 'student' ? "/student-profile" :
                  user.role === 'teacher' ? "/teacher-profile" :
                  "/admin-profile"
                }>Profile</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

