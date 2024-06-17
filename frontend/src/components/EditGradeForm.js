import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditGradeForm = ({ grade, students, disciplines, assessments, semesters, groups, onSubmit, onCancel }) => {
  const [studentId, setStudentId] = useState('');
  const [disciplineId, setDisciplineId] = useState('');
  const [assessmentId, setAssessmentId] = useState('');
  const [semesterId, setSemesterId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (grade) {
      setStudentId(grade.student_id || '');
      setDisciplineId(grade.discipline_id || '');
      setAssessmentId(grade.assessment_id || '');
      setSemesterId(grade.semester_id || '');
      setGroupId(grade.group_id || '');
      setGradeValue(grade.grade || '');
      setDate(formatDate(grade.date));
    }
  }, [grade]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedGrade = {
      id: grade.id,
      student_id: studentId,
      discipline_id: disciplineId,
      assessment_id: assessmentId,
      semester_id: semesterId,
      group_id: groupId,
      grade: gradeValue,
      date: date,
    };
    onSubmit(updatedGrade);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="studentSelect">
        <Form.Label>Студент</Form.Label>
        <Form.Control as="select" value={studentId} onChange={(e) => setStudentId(e.target.value)} required disabled>
          <option value="">Выберите студента</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.surname} {student.name} {student.middle_name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="groupSelect">
        <Form.Label>Группа</Form.Label>
        <Form.Control as="select" value={groupId} onChange={(e) => setGroupId(e.target.value)} required disabled>
          <option value="">Выберите группу</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="disciplineSelect">
        <Form.Label>Дисциплина</Form.Label>
        <Form.Control as="select" value={disciplineId} onChange={(e) => setDisciplineId(e.target.value)} required disabled>
          <option value="">Выберите дисциплину</option>
          {disciplines.map((discipline) => (
            <option key={discipline.id} value={discipline.id}>
              {discipline.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="assessmentSelect">
        <Form.Label>Аттестация</Form.Label>
        <Form.Control as="select" value={assessmentId} onChange={(e) => setAssessmentId(e.target.value)} required>
          <option value="">Выберите вид аттестации</option>
          {assessments.map((assessment) => (
            <option key={assessment.id} value={assessment.id}>
              {assessment.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="semesterSelect">
        <Form.Label>Семестр</Form.Label>
        <Form.Control as="select" value={semesterId} onChange={(e) => setSemesterId(e.target.value)} required>
          <option value="">Выберите семестр</option>
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.number}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="gradeInput">
        <Form.Label>Оценка</Form.Label>
        <Form.Control type="text" value={gradeValue} onChange={(e) => setGradeValue(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="dateInput">
        <Form.Label>Дата</Form.Label>
        <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </Form.Group>
      <Button variant="primary" type="submit" className='mt-3'>
        Сохранить
      </Button>
      <Button variant="secondary" onClick={onCancel} className="ml-2 mt-3">
        Отмена
      </Button>
    </Form>
  );
};

export default EditGradeForm;
