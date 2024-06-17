import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import axios from 'axios';

const GroupList = ({ groups, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/groups/${id}`);
      onDelete(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h4>Список групп</h4>
      <ListGroup className="mt-4">
        {groups.map((group) => (
          <ListGroupItem key={group.id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{group.name}</strong>
            </div>
            <Button color="danger" onClick={() => handleDelete(group.id)}>
              Удалить
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default GroupList;
