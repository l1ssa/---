import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddGroup = ({ show, handleClose, onAddGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState(null);

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:3001/groups', { name: groupName });
      onAddGroup(response.data); // Передаем новую группу в родительский компонент
      resetForm();
      handleClose();
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error(error);
    }
  };

  const resetForm = () => {
    setGroupName('');
    setError(null);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить группу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Название группы</Form.Label>
            <Form.Control
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
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

export default AddGroup;

