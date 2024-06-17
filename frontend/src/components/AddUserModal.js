import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddUserModal = ({ show, handleClose, role, addUser, fetchGroups }) => {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [group, setGroup] = useState('');
  const [position, setPosition] = useState('');
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (show && role === 'Студент') {
      fetchGroups().then(fetchedGroups => setGroups(fetchedGroups || []));
    }
  }, [show, role, fetchGroups]);

  const roleUrlMap = {
    'Студент': 'students',
    'Преподаватель': 'teachers',
    'Администратор': 'admins'
  };

  const handleSave = async () => {
    // Basic validation
    if (!name || !surname || !email || !phone || !password || (role === 'Студент' && !group) || ((role === 'Преподаватель' || role === 'Администратор') && !position)) {
      setError('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    const formData = {
      surname,
      name,
      middle_name: middleName,
      email,
      phone,
      password,
      ...(role === 'Студент' && { group_id: group }),
      ...(role === 'Преподаватель' || role === 'Администратор') && { position }
    };

    try {
      const response = await axios.post(`http://localhost:3001/${roleUrlMap[role]}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      addUser(response.data);
      resetForm();
      handleClose();
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error(error);
    }
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const resetForm = () => {
    setSurname('');
    setName('');
    setMiddleName('');
    setEmail('');
    setPhone('');
    setGroup('');
    setPosition('');
    setPhoto(null);
    setPassword('');
    setError(null);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить {role.toLowerCase()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
                  {groups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Фото</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handlePhotoChange}
                />
                {photo && (
                  <img src={URL.createObjectURL(photo)} alt="User profile" style={{ width: '100px', marginTop: '10px' }} />
                )}
              </Form.Group>
            </>
          )}
          {(role === 'Преподаватель' || role === 'Администратор') && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Должность</Form.Label>
                <Form.Control
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Фото</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handlePhotoChange}
                />
                {photo && (
                  <img src={URL.createObjectURL(photo)} alt="User profile" style={{ width: '100px', marginTop: '10px' }} />
                )}
              </Form.Group>
            </>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
               type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
