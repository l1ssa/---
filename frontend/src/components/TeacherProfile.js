import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TeacherProfile = ({ userData }) => {
  return (
    <div className="container d-flex justify-content-center" style={{ marginTop: '60px' }}>
      <div className="card" style={{ width: '34rem', height: 'auto' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={userData.photo || 'https://via.placeholder.com/150'} className="img-fluid rounded-start" alt="profile" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Данные о себе: Преподаватель</h5>
              <p className="card-text"><strong>Имя:</strong> {userData.name}</p>
              <p className="card-text"><strong>Фамилия:</strong> {userData.surname}</p>
              <p className="card-text"><strong>Отчество:</strong> {userData.middle_name}</p>
              <p className="card-text"><strong>Почта:</strong> {userData.email}</p>
              <p className="card-text"><strong>Телефон:</strong> {userData.phone}</p>
              <p className="card-text"><strong>Должность:</strong> {userData.position}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
