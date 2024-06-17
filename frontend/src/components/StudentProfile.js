import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const StudentProfile = ({ userData }) => {
  const [groupName, setGroupName] = useState('Нет информации о группе');

  // Функция для загрузки списка групп
  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:3001/groups');
      const groups = response.data;
      // Находим имя группы по group_id
      const groupInfo = groups.find(group => group.id === userData.group_id);
      if (groupInfo) {
        setGroupName(groupInfo.name); // Устанавливаем имя группы для отображения
      }
    } catch (error) {
      console.error('Ошибка при загрузке групп:', error);
    }
  };

  useEffect(() => {
    fetchGroups(); // Вызываем функцию загрузки списка групп при загрузке компонента и при изменении userData.group_id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.group_id]); // Добавляем userData.group_id в зависимости, чтобы useEffect вызывался при его изменении

  return (
    <div className="container d-flex justify-content-center" style={{ marginTop: '60px' }}>
      <div className="card" style={{ width: '34rem', height: 'auto' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={userData.photo ? `data:image/jpeg;base64,${userData.photo}` : 'https://via.placeholder.com/150'} className="img-fluid rounded-start" alt="profile" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Данные о себе: Студент</h5>
              <p className="card-text"><strong>Имя:</strong> {userData.name}</p>
              <p className="card-text"><strong>Фамилия:</strong> {userData.surname}</p>
              <p className="card-text"><strong>Отчество:</strong> {userData.middle_name}</p>
              <p className="card-text"><strong>Почта:</strong> {userData.email}</p>
              <p className="card-text"><strong>Телефон:</strong> {userData.phone}</p>
              {/* Отображаем переменную groupName, которая будет содержать имя группы */}
              <p className="card-text"><strong>Группа:</strong> {groupName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
