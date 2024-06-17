import React, { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';

const UserList = ({ role, users, onEdit, onDelete }) => {
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Email</th>
            <th>Телефон</th>
            {role === 'Студент' && <th>Группа</th>}
            {role === 'Преподаватель' && <th>Должность</th>}
            <th>Фото</th>
            <th>Пароль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              {role === 'Студент' && <td>{user.group_name}</td>}
              {role === 'Преподаватель' && <td>{user.position}</td>}
              <td>
                {user.photo ? (
                  <img src={`data:image/jpeg;base64,${user.photo}`} alt="Фото пользователя" style={{ width: '50px' }} />
                ) : (
                  'Нет фото'
                )}
              </td>
              <td>{user.password}</td>
              <td>
                <Button color="warning" size="sm" onClick={() => onEdit(user)}>Редактировать</Button>{' '}
                <Button color="danger" size="sm" onClick={() => onDelete(user)}>Удалить</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserList;
