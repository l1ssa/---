import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

const AddDiscipline = ({ show, handleClose, onAddDiscipline }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisible(false);
        handleClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertVisible, handleClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDiscipline = { name, description };
    try {
      const response = await axios.post('http://localhost:3001/disciplines', newDiscipline);
      onAddDiscipline(response.data);
      setName('');
      setDescription('');
      setAlertVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={show} toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Добавить новую дисциплину</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="name" sm={3}>Название</Label>
            <Col sm={9}>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="description" sm={3}>Описание</Label>
            <Col sm={9}>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Добавить</Button>
        <Button color="secondary" onClick={handleClose}>Отмена</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddDiscipline;
