import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const StudentGrades = ({ userData }) => {
    const [selectedSemester, setSelectedSemester] = useState('1');
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/grades?student_id=${userData.id}`);
                setGrades(response.data);
            } catch (error) {
                console.error('Error fetching grades:', error.response ? error.response.data : error.message);
            }
        };
        fetchGrades();
    }, [userData.id]);

    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };

    const getFilteredGrades = () => {
        return grades.filter((grade) => grade.semester_number === parseInt(selectedSemester));
    };

    const filteredGrades = getFilteredGrades();

    return (
        <div className="container">
            <h1>Мои Оценки</h1>
            <div className="mb-3">
                <label htmlFor="semester" className="form-label">Выберите семестр:</label>
                <select id="semester" className="form-select" value={selectedSemester} onChange={handleSemesterChange}>
                    <option value="1">1 семестр</option>
                    <option value="2">2 семестр</option>
                    <option value="3">3 семестр</option>
                    <option value="4">4 семестр</option>
                    <option value="5">5 семестр</option>
                    <option value="6">6 семестр</option>
                    <option value="7">7 семестр</option>
                    <option value="8">8 семестр</option>
                </select>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Оценки за {selectedSemester} семестр</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Дисциплина</th>
                                <th>Оценка</th>
                                <th>Дата</th>
                                <th>Вид аттестации</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGrades.length > 0 ? (
                                filteredGrades.map((grade, index) => (
                                    <tr key={index}>
                                        <td>{grade.discipline_name}</td>
                                        <td>{grade.grade}</td>
                                        <td>{new Date(grade.date).toLocaleDateString()}</td>
                                        <td>{grade.assessment_name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">Нет данных за выбранный семестр</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentGrades;
