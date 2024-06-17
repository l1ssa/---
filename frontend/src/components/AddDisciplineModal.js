import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';

const AddDisciplineModal = ({ show, handleClose, addDiscipline }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDiscipline = { id: Date.now(), ...formData };
    try {
      await axios.post('http://localhost:3001/disciplines', newDiscipline);
      addDiscipline(newDiscipline);
      setFormData({
        name: '',
        description: ''
      });
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={show} toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Добавить дисциплину</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Название</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Описание</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Button color="primary" type="submit">Добавить</Button>
        </Form>
        <Alert color="success" isOpen={alertVisible} className="mt-2">
          Дисциплина успешно добавлена!
        </Alert>
      </ModalBody>
    </Modal>
  );
};

export default AddDisciplineModal;
