import React from 'react';

const AdminProfile = ({ userData }) => {
  return (
    <div className="container d-flex justify-content-center" style={{ marginTop: '60px' }}>
      <div className="card" style={{ width: '34rem', height: 'auto' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src="https://via.placeholder.com/150" className="img-fluid rounded-start" alt="profile" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Данные о себе: Администратор</h5>
              <p className="card-text"><strong>Имя:</strong> {userData.name}</p>
              <p className="card-text"><strong>Фамилия:</strong> {userData.surname}</p>
              <p className="card-text"><strong>Отчество:</strong> {userData.middle_name}</p>
              <p className="card-text"><strong>Почта:</strong> {userData.email}</p>
              <p className="card-text"><strong>Телефон:</strong> {userData.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
