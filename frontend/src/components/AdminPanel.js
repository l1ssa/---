import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card, CardBody, CardTitle, Button, Nav, NavItem, NavLink, TabContent, TabPane, Alert
} from 'reactstrap';
import RoleSelector from '../components/RoleSelector';
import UserList from '../components/UserList';
import AddUserModal from '../components/AddUserModal';
import EditUserModal from '../components/EditUserModal';
import DeleteUserModal from '../components/DeleteUserModal';
import AddDiscipline from '../components/AddDiscipline';
import DisciplineList from '../components/DisciplineList';
import AddGroup from '../components/AddGroup';
import GroupList from '../components/GroupList';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const AdminPanel = () => {
  const [role, setRole] = useState('Студент');
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showAddDisciplineModal, setShowAddDisciplineModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('1');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('success');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [disciplineSearchQuery, setDisciplineSearchQuery] = useState('');
  const [groupSearchQuery, setGroupSearchQuery] = useState('');

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:3001/groups');
      const fetchedGroups = response.data || [];
      setGroups(fetchedGroups);
      return fetchedGroups;
    } catch (error) {
      console.error('Ошибка при загрузке групп:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (role === 'Студент') {
          const response = await axios.get('http://localhost:3001/students');
          setStudents(response.data);
        } else if (role === 'Преподаватель') {
          const response = await axios.get('http://localhost:3001/teachers');
          setTeachers(response.data);
        } else if (role === 'Администратор') {
          const response = await axios.get('http://localhost:3001/admins');
          setAdmins(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDisciplines = async () => {
      try {
        const response = await axios.get('http://localhost:3001/disciplines');
        setDisciplines(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3001/groups');
        setGroups(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
    fetchDisciplines();
    fetchGroups();
  }, [role]);

  const addUser = async (newUser) => {
    if (role === 'Студент') {
      // Ensure that group information is included in the new student
      const updatedGroups = await fetchGroups();
      const groupInfo = updatedGroups.find(group => group.id === newUser.group_id);
  
      setStudents([...students, { ...newUser, group_name: groupInfo?.name || '' }]);
    } else if (role === 'Преподаватель') {
      setTeachers([...teachers, newUser]);
    } else if (role === 'Администратор') {
      setAdmins([...admins, newUser]);
    }
    setShowAddUserModal(false);
    setAlertMessage('Пользователь успешно добавлен!');
    setAlertColor('success');
    setAlertVisible(true);
  
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };
  
  const updateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:3001/${role === 'Студент' ? 'students' : role === 'Преподаватель' ? 'teachers' : 'admins'}/${updatedUser.id}`, updatedUser);
      const updatedUserData = response.data;
      if (role === 'Студент') {
        setStudents(students.map((user) => (user.id === updatedUserData.id ? updatedUserData : user)));
      } else if (role === 'Преподаватель') {
        setTeachers(teachers.map((user) => (user.id === updatedUserData.id ? updatedUserData : user)));
      } else if (role === 'Администратор') {
        setAdmins(admins.map((user) => (user.id === updatedUserData.id ? updatedUserData : user)));
      }
      setShowEditUserModal(false);
      setAlertMessage('Пользователь успешно обновлен!');
      setAlertColor('success');
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
  
      // Получаем актуальный список студентов с сервера и обновляем состояние
      const studentResponse = await axios.get('http://localhost:3001/students');
      setStudents(studentResponse.data);
  
      // Получаем актуальный список преподавателей с сервера и обновляем состояние
      const teacherResponse = await axios.get('http://localhost:3001/teachers');
      setTeachers(teacherResponse.data);
  
      // Получаем актуальный список администраторов с сервера и обновляем состояние
      const adminResponse = await axios.get('http://localhost:3001/admins');
      setAdmins(adminResponse.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const deleteUser = (userId) => {
    if (role === 'Студент') {
      setStudents(students.filter((user) => user.id !== userId));
    } else if (role === 'Преподаватель') {
      setTeachers(teachers.filter((user) => user.id !== userId));
    } else if (role === 'Администратор') {
      setAdmins(admins.filter((user) => user.id !== userId));
    }
    setAlertMessage('Пользователь успешно удален!');
    setAlertColor('danger');
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  const addDiscipline = (discipline) => {
    setDisciplines([...disciplines, { ...discipline, id: disciplines.length + 1 }]);
    setShowAddDisciplineModal(false);
    setAlertMessage('Дисциплина успешно добавлена!');
    setAlertColor('success');
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  const deleteDiscipline = async (disciplineId) => {
    try {
      await axios.delete(`http://localhost:3001/disciplines/${disciplineId}`);
      setDisciplines(disciplines.filter((discipline) => discipline.id !== disciplineId));
      setAlertMessage('Дисциплина успешно удалена!');
      setAlertColor('danger');
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const addGroup = (group) => {
    setGroups([...groups, { ...group, id: groups.length + 1 }]);
    setShowAddGroupModal(false);
    setAlertMessage('Группа успешно добавлена!');
    setAlertColor('success');
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
    fetchGroups();
  };

  const deleteGroup = async (groupId) => {
    try {
      await axios.delete(`http://localhost:3001/groups/${groupId}`);
      setGroups(groups.filter((group) => group.id !== groupId));
      setAlertMessage('Группа успешно удалена!');
      setAlertColor('danger');
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = role === 'Студент' 
    ? students.filter((user) => user.name.toLowerCase().includes(userSearchQuery.toLowerCase()))
    : role === 'Преподаватель' 
    ? teachers.filter((user) => user.name.toLowerCase().includes(userSearchQuery.toLowerCase()))
    : admins.filter((user) => user.name.toLowerCase().includes(userSearchQuery.toLowerCase()));

  const filteredDisciplines = disciplines.filter((discipline) => 
    discipline.name.toLowerCase().includes(disciplineSearchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter((group) => 
    group.name.toLowerCase().includes(groupSearchQuery.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <Nav tabs className="mt-4">
        <NavItem>
          <NavLink
            className={activeTab === '1' ? 'active' : ''}
            onClick={() => { toggleTab('1'); }}
          >
            Пользователи
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '2' ? 'active' : ''}
            onClick={() => { toggleTab('2'); }}
          >
            Дисциплины
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '3' ? 'active' : ''}
            onClick={() => { toggleTab('3'); }}
          >
            Группы
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row className="mt-4">
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle tag="h3" className="mb-4">Пользователи</CardTitle>
                  <Row className="mb-3">
                    <Col md={12} className="d-flex justify-content-between align-items-center">
                      <RoleSelector role={role} setRole={setRole} />
                      <Button color="primary" onClick={() => setShowAddUserModal(true)}>
                        Добавить {role.toLowerCase()}
                      </Button>
                    </Col>
                  </Row>
                  <SearchBar 
                    searchQuery={userSearchQuery} 
                    handleSearchChange={(e) => setUserSearchQuery(e.target.value)} 
                    placeholder="Поиск пользователей..." 
                  />
                  {alertVisible && (
                    <Alert color={alertColor} isOpen={alertVisible} className="mt-2">
                      {alertMessage}
                    </Alert>
                  )}
                  <UserList
                    role={role}
                    users={filteredUsers}
                    onEdit={(user) => { setCurrentUser(user); setShowEditUserModal(true); }}
                    onDelete={(user) => { setCurrentUser(user); setShowDeleteUserModal(true); }}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row className="mt-4">
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle tag="h3" className="mb-4">Дисциплины</CardTitle>
                  <Button color="primary" className="mb-3" onClick={() => setShowAddDisciplineModal(true)}>
                    Добавить дисциплину
                  </Button>
                  <SearchBar 
                    searchQuery={disciplineSearchQuery} 
                    handleSearchChange={(e) => setDisciplineSearchQuery(e.target.value)} 
                    placeholder="Поиск дисциплин..." 
                  />
                  {alertVisible && (
                    <Alert color={alertColor} isOpen={alertVisible} className="mt-2">
                      {alertMessage}
                    </Alert>
                  )}
                  <DisciplineList disciplines={filteredDisciplines} deleteDiscipline={deleteDiscipline} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row className="mt-4">
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle tag="h3" className="mb-4">Группы</CardTitle>
                  <Button color="primary" className="mb-3" onClick={() => setShowAddGroupModal(true)}>
                    Добавить группу
                  </Button>
                  <SearchBar 
                    searchQuery={groupSearchQuery} 
                    handleSearchChange={(e) => setGroupSearchQuery(e.target.value)} 
                    placeholder="Поиск групп..." 
                  />
                  {alertVisible && (
                    <Alert color={alertColor} isOpen={alertVisible} className="mt-2">
                      {alertMessage}
                    </Alert>
                  )}
                  <GroupList groups={filteredGroups} onDelete={deleteGroup} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      <AddUserModal
        show={showAddUserModal}
        handleClose={() => setShowAddUserModal(false)}
        addUser={addUser}
        role={role}
        fetchGroups={fetchGroups}
      />
      <EditUserModal
        show={showEditUserModal}
        handleClose={() => setShowEditUserModal(false)}
        updateUser={updateUser}
        user={currentUser}
        role={role}
        fetchGroups={fetchGroups}
      />
      <DeleteUserModal
        show={showDeleteUserModal}
        handleClose={() => setShowDeleteUserModal(false)}
        deleteUser={deleteUser}
        user={currentUser}
        role={role}
      />
      <AddDiscipline
        show={showAddDisciplineModal}
        handleClose={() => setShowAddDisciplineModal(false)}
        onAddDiscipline={addDiscipline}
      />
      <AddGroup
        show={showAddGroupModal}
        handleClose={() => setShowAddGroupModal(false)}
        onAddGroup={addGroup}
      />
    </Container>
  );
};

export default AdminPanel;
