import React, { useState, useEffect } from 'react';
import { Modal, Button, Alert, Form, Row, Col, Card, Container } from 'react-bootstrap';
import GradeList from './GradeList';
import AddGradeForm from './AddGradeForm';
import EditGradeForm from './EditGradeForm';
import SearchBar from './SearchBar';

const TeacherGrades = () => {
  const [grades, setGrades] = useState([]);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editGrade, setEditGrade] = useState(null);
  const [message, setMessage] = useState('');
  const [messageVariant, setMessageVariant] = useState('success');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchGrades();
    fetchGroups();
    fetchStudents();
    fetchDisciplines();
    fetchSemesters();
    fetchAssessments();
  }, []);

  const fetchGrades = async () => {
    try {
      const response = await fetch('http://localhost:3001/grades');
      const data = await response.json();
      setGrades(data);
    } catch (error) {
      console.error('Ошибка при получении оценок:', error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await fetch('http://localhost:3001/groups');
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error('Ошибка при получении групп:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3001/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Ошибка при получении студентов:', error);
    }
  };

  const fetchDisciplines = async () => {
    try {
      const response = await fetch('http://localhost:3001/disciplines');
      const data = await response.json();
      setDisciplines(data);
    } catch (error) {
      console.error('Ошибка при получении дисциплин:', error);
    }
  };

  const fetchSemesters = async () => {
    try {
      const response = await fetch('http://localhost:3001/semesters');
      const data = await response.json();
      setSemesters(data);
    } catch (error) {
      console.error('Ошибка при получении семестров:', error);
    }
  };

  const fetchAssessments = async () => {
    try {
      const response = await fetch('http://localhost:3001/assessments');
      const data = await response.json();
      setAssessments(data);
    } catch (error) {
      console.error('Ошибка при получении видов аттестации:', error);
    }
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
    setSelectedStudent(''); // Clear the selected student when group changes
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleDisciplineChange = (e) => {
    setSelectedDiscipline(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getFilteredGrades = () => {
    return grades.filter((grade) => {
      return (
        (selectedGroup === '' || grade.group_name === selectedGroup) &&
        (selectedStudent === '' || grade.student_name === selectedStudent) &&
        (selectedDiscipline === '' || grade.discipline_name === selectedDiscipline) &&
        (selectedSemester === '' || grade.semester_number.toString() === selectedSemester) &&
        (searchQuery === '' || grade.student_name.toLowerCase().includes(searchQuery.toLowerCase()) || grade.group_name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (grade) => {
    const student = students.find(student => `${student.surname} ${student.name} ${student.middle_name}` === grade.student_name);
    const group = groups.find(group => group.name === grade.group_name);
    const discipline = disciplines.find(discipline => discipline.name === grade.discipline_name);
    const assessment = assessments.find(assessment => assessment.name === grade.assessment_name);
    const semester = semesters.find(semester => semester.number === grade.semester_number);

    const gradeWithIds = {
      ...grade,
      student_id: student ? student.id : undefined,
      group_id: group ? group.id : undefined,
      discipline_id: discipline ? discipline.id : undefined,
      assessment_id: assessment ? assessment.id : undefined,
      semester_id: semester ? semester.id : undefined,
    };

    setEditGrade(gradeWithIds);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleAddGrade = async (grade) => {
    try {
      const response = await fetch('http://localhost:3001/grades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(grade),
      });

      if (response.ok) {
        handleCloseAddModal();
        fetchGrades(); // Fetch grades after adding a new one
        setMessage('Оценка добавлена!');
        setMessageVariant('success');
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage('Ошибка при добавлении оценки.');
        setMessageVariant('danger');
        setTimeout(() => setMessage(''), 2000);
      }
    } catch (error) {
      console.error('Ошибка при добавлении оценки:', error);
      setMessage('Ошибка при добавлении оценки.');
      setMessageVariant('danger');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleUpdateGrade = async (updatedGrade) => {
    try {
      const response = await fetch(`http://localhost:3001/grades/${updatedGrade.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGrade),
      });

      if (response.ok) {
        handleCloseEditModal();
        fetchGrades(); // Fetch grades after updating
        setMessage('Оценка обновлена!');
        setMessageVariant('success');
        setTimeout(() => setMessage(''), 2000);
      } else {
        const errorData = await response.json();
        console.error('Error updating grade:', errorData);
        setMessage(`Ошибка при обновлении оценки: ${errorData.message || response.statusText}`);
        setMessageVariant('danger');
        setTimeout(() => setMessage(''), 2000);
      }
    } catch (error) {
      console.error('Ошибка при обновлении оценки:', error);
      setMessage('Ошибка при обновлении оценки.');
      setMessageVariant('danger');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleDeleteGrade = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/grades/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchGrades(); // Fetch grades after deletion
        setMessage('Оценка удалена!');
        setMessageVariant('danger'); // Change message variant to 'danger' for deletion
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage('Ошибка при удалении оценки.');
        setMessageVariant('danger');
        setTimeout(() => setMessage(''), 2000);
      }
    } catch (error) {
      console.error('Ошибка при удалении оценки:', error);
      setMessage('Ошибка при удалении оценки.');
      setMessageVariant('danger');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const getFilteredStudents = () => {
    if (selectedGroup === '') {
      return students;
    }
    return students.filter(student => student.group_name === selectedGroup);
  };

  return (
    <Container>
      <Card className="mt-4 shadow-sm">
        <Card.Header as="h2" className="text-center">Панель управления оценками</Card.Header>
        <Card.Body>
          {message && <Alert variant={messageVariant}>{message}</Alert>}

          <Form className="mb-4">
            <Row>
              <Col md={3}>
                <Form.Group controlId="groupSelect">
                  <Form.Label>Группа</Form.Label>
                  <Form.Control as="select" value={selectedGroup} onChange={handleGroupChange}>
                    <option value="">Все группы</option>
                    {groups.map(group => (
                      <option key={group.id} value={group.name}>
                        {group.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="studentSelect">
                  <Form.Label>Студент</Form.Label>
                  <Form.Control as="select" value={selectedStudent} onChange={handleStudentChange}>
                    <option value="">Все студенты</option>
                    {getFilteredStudents().map(student => (
                      <option key={student.id} value={`${student.surname} ${student.name} ${student.middle_name}`}>
                        {student.surname} {student.name} {student.middle_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="disciplineSelect">
                  <Form.Label>Дисциплина</Form.Label>
                  <Form.Control as="select" value={selectedDiscipline} onChange={handleDisciplineChange}>
                    <option value="">Все дисциплины</option>
                    {disciplines.map(discipline => (
                      <option key={discipline.id} value={discipline.name}>
                        {discipline.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="semesterSelect">
                  <Form.Label>Семестр</Form.Label>
                  <Form.Control as="select" value={selectedSemester} onChange={handleSemesterChange}>
                    <option value="">Все семестры</option>
                    {semesters.map(semester => (
                      <option key={semester.id} value={semester.number}>
                        {semester.number}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <SearchBar
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            placeholder="Поиск по ФИО или группе"
          />

          <Button variant="primary" className="mb-3" onClick={handleShowAddModal}>
            Добавить оценку
          </Button>

          <GradeList
            grades={getFilteredGrades()}
            onEdit={handleShowEditModal}
            onDelete={handleDeleteGrade}
          />
        </Card.Body>
      </Card>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить оценку</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddGradeForm
            students={getFilteredStudents()}
            groups={groups}
            disciplines={disciplines}
            semesters={semesters}
            assessments={assessments}
            onSubmit={handleAddGrade}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать оценку</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editGrade && (
            <EditGradeForm
              grade={editGrade}
              students={getFilteredStudents()}
              groups={groups}
              disciplines={disciplines}
              semesters={semesters}
              assessments={assessments}
              onSubmit={handleUpdateGrade}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TeacherGrades;
