import React from 'react';
import { Table, Button } from 'react-bootstrap';

const GradeList = ({ grades, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Студент</th>
          <th>Группа</th>
          <th>Дисциплина</th>
          <th>Оценка</th>
          <th>Дата</th>
          <th>Аттестация</th>
          <th>Семестр</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {grades.map((grade) => (
          <tr key={grade.id}>
            <td>{grade.student_name}</td>
            <td>{grade.group_name}</td>
            <td>{grade.discipline_name}</td>
            <td>{grade.grade}</td>
            <td>{formatDate(grade.date)}</td>
            <td>{grade.assessment_name}</td>
            <td>{grade.semester_number ? grade.semester_number : 'Не указано'}</td>
            <td>
              <Button variant="warning" onClick={() => onEdit(grade)}>Редактировать</Button>{' '}
              <Button variant="danger" onClick={() => onDelete(grade.id)}>Удалить</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GradeList;
