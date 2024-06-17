import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteUserModal = ({ show, handleClose, user, deleteUser, role }) => {
  const handleDelete = async () => {
    if (!user) return;

    let rolePath;
    switch (role) {
      case 'Студент':
        rolePath = 'students';
        break;
      case 'Преподаватель':
        rolePath = 'teachers';
        break;
      case 'Администратор':
        rolePath = 'admins';
        break;
      default:
        console.error('Unknown role');
        return;
    }

    try {
      await axios.delete(`http://localhost:3001/${rolePath}/${user.id}`);
      deleteUser(user.id);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const getUserInitials = (user) => {
    if (!user || !user.name || !user.surname || !user.middleName) return '';
    return `${user.surname} ${user.name.charAt(0)}.${user.middleName.charAt(0)}.`;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Удалить {getUserInitials(user)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы уверены, что хотите удалить этого пользователя?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
