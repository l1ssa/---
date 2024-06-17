import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import axios from 'axios';

const DisciplineList = ({ disciplines, deleteDiscipline }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/disciplines/${id}`);
      deleteDiscipline(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ListGroup className="mt-4">
      {disciplines.map((discipline) => (
        <ListGroupItem key={discipline.id} className="d-flex justify-content-between align-items-center">
          <div>
            <strong>{discipline.name}</strong>
            <p>{discipline.description}</p>
          </div>
          <Button color="danger" onClick={() => handleDelete(discipline.id)}>
            Удалить
          </Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default DisciplineList;
