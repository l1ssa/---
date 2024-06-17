import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditUserModal = ({ show, handleClose, user, updateUser, role }) => {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [group, setGroup] = useState('');
  const [position, setPosition] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [password, setPassword] = useState('');
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');

  const roleUrlMap = {
    'Студент': 'students',
    'Преподаватель': 'teachers',
    'Администратор': 'admins'
  };

  useEffect(() => {
    if (user) {
      setSurname(user.surname || '');
      setName(user.name || '');
      setMiddleName(user.middle_name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      if (role === 'Студент') {
        setGroup(user.group_id || '');
      } else if (role === 'Преподаватель') {
        setPosition(user.position || '');
      }
      setPassword(user.password || '');
      if (user.photo) {
        setPhoto(user.photo);
        setPhotoPreview(user.photo.startsWith('data')
          ? user.photo
          : `data:image/jpeg;base64,${user.photo}`);
      }
    }
  }, [user, role]);

  useEffect(() => {
    if (show) {
      const fetchGroups = async () => {
        try {
          const response = await axios.get('http://localhost:3001/groups');
          setGroups(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchGroups();
    }
  }, [show]);

  const handleUpdate = async () => {
    // Check if mandatory fields are filled
    if (!name || !surname || !email || !phone || !password) {
      setError('Все обязательные поля должны быть заполнены.');
      return;
    }

    const userData = {
      name,
      surname,
      middle_name: middleName,
      email,
      phone,
      password
    };

    if (role === 'Студент') {
      userData.group_id = group;
    }
    if (role === 'Преподаватель') {
      userData.position = position;
    }
    if (photo && typeof photo !== 'string') {
      userData.photo = photo;
    }

    console.log("Data to be sent:", userData);

    try {
      const response = await axios.put(`http://localhost:3001/${roleUrlMap[role]}/${user.id}`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      updateUser(response.data);
      handleClose();
    } catch (error) {
      console.error("Error response:", error.response);
      setError(error.response ? error.response.data : 'Ошибка при обновлении пользователя');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать {role.toLowerCase()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Отчество</Form.Label>
            <Form.Control
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>
          {role === 'Студент' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Группа</Form.Label>
                <Form.Control
                  as="select"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                >
                  <option value="">Выберите группу</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </>
          )}
          {role === 'Преподаватель' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Должность</Form.Label>
                <Form.Control
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </Form.Group>
            </>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Фото</Form.Label>
            <Form.Control type="file" onChange={handlePhotoChange} />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="User profile"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;

