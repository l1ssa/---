const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Импорт пула
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Настройка хранилища для загруженных файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Обработчик запроса на вход
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query('SELECT * FROM authentication WHERE email = $1', [email]);
    const user = rows[0];
    if (user && user.password === password) {
      const roleTable = user.role === 'student' ? 'students' : user.role === 'teacher' ? 'teachers' : 'admins';
      const profile = await pool.query(`SELECT * FROM ${roleTable} WHERE email = $1`, [email]);
      res.json({ ...profile.rows[0], role: user.role });
    } else {
      res.status(401).send('Неверные учетные данные');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Студенты
app.get('/students', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT students.*, groups.name AS group_name 
      FROM students 
      LEFT JOIN groups ON students.group_id = groups.id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/students', upload.single('photo'), async (req, res) => {
  const { name, surname, middle_name, email, phone, group_id, password } = req.body;
  const photo = req.file ? req.file.filename : null;
  try {
    const { rows } = await pool.query(
      'INSERT INTO students (name, surname, middle_name, email, phone, group_id, photo, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, surname, middle_name, email, phone, group_id, photo, password]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put('/students/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const { name, surname, middle_name, email, phone, group_id, password } = req.body;
  const photo = req.file ? req.file.filename : null;
  try {
    const { rows } = await pool.query(
      'UPDATE students SET name = $1, surname = $2, middle_name = $3, email = $4, phone = $5, group_id = $6, photo = $7, password = $8 WHERE id = $9 RETURNING *',
      [name, surname, middle_name, email, phone, group_id, photo, password, id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM students WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Преподаватели
app.get('/teachers', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM teachers');
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/teachers', upload.single('photo'), async (req, res) => {
  const { name, surname, middle_name, email, phone, position, password } = req.body;
  const photo = req.file ? req.file.filename : null;
  try {
    const { rows } = await pool.query(
      'INSERT INTO teachers (name, surname, middle_name, email, phone, position, photo, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, surname, middle_name, email, phone, position, photo, password]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put('/teachers/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const { name, surname, middle_name, email, phone, position, password } = req.body;
  const photo = req.file ? req.file.filename : null;
  try {
    const { rows } = await pool.query(
      'UPDATE teachers SET name = $1, surname = $2, middle_name = $3, email = $4, phone = $5, position = $6, photo = $7, password = $8 WHERE id = $9 RETURNING *',
      [name, surname, middle_name, email, phone, position, photo, password, id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/teachers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM teachers WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Администраторы
app.get('/admins', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM admins');
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/admins', async (req, res) => {
  const { name, surname, middle_name, email, phone, password } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO admins (name, surname, middle_name, email, phone, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, surname, middle_name, email, phone, password]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put('/admins/:id', async (req, res) => {
  const { id } = req.params;
  const { name, surname, middle_name, email, phone, password } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE admins SET name = $1, surname = $2, middle_name = $3, email = $4, phone = $5, password = $6 WHERE id = $7 RETURNING *',
      [name, surname, middle_name, email, phone, password, id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Error in update query:', error.message);
    res.status(500).send(error.message);
  }
});


app.delete('/admins/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM admins WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Disciplines
app.get('/disciplines', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM disciplines');
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/disciplines', async (req, res) => {
  const { name, description } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO disciplines (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/disciplines/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM disciplines WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Groups
app.get('/groups', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM groups');
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/groups', async (req, res) => {
  const { name } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO groups (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/groups/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM groups WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Grades
app.get('/grades', async (req, res) => {
  try {
      const studentId = req.query.student_id;
      let query;
      let params = [];

      if (studentId) {
          query = `
              SELECT 
                  grades.id, 
                  students.surname || ' ' || students.name || ' ' || students.middle_name AS student_name, 
                  groups.name AS group_name, 
                  disciplines.name AS discipline_name, 
                  grades.grade, 
                  grades.date, 
                  assessments.name AS assessment_name, 
                  semesters.number AS semester_number 
              FROM grades 
              JOIN students ON grades.student_id = students.id 
              JOIN groups ON students.group_id = groups.id 
              JOIN disciplines ON grades.discipline_id = disciplines.id 
              JOIN assessments ON grades.assessment_id = assessments.id 
              JOIN semesters ON grades.semester_id = semesters.id 
              WHERE grades.student_id = $1;`;
          params = [studentId];
      } else {
          query = `
              SELECT 
                  grades.id, 
                  students.surname || ' ' || students.name || ' ' || students.middle_name AS student_name, 
                  groups.name AS group_name, 
                  disciplines.name AS discipline_name, 
                  grades.grade, 
                  grades.date, 
                  assessments.name AS assessment_name, 
                  semesters.number AS semester_number 
              FROM grades 
              JOIN students ON grades.student_id = students.id 
              JOIN groups ON students.group_id = groups.id 
              JOIN disciplines ON grades.discipline_id = disciplines.id 
              JOIN assessments ON grades.assessment_id = assessments.id 
              JOIN semesters ON grades.semester_id = semesters.id;`;
      }

      const { rows } = await pool.query(query, params);
      res.json(rows);
  } catch (error) {
      console.error('Error executing query', error.message);
      res.status(500).send('Internal Server Error');
  }
});

app.post('/grades', async (req, res) => {
  const { student_id, discipline_id, grade, date, assessment_id, semester_id } = req.body;  
  try {
    const { rows } = await pool.query(
      'INSERT INTO grades (student_id, discipline_id, grade, date, assessment_id, semester_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [student_id, discipline_id, grade, date, assessment_id, semester_id]  
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put('/grades/:id', async (req, res) => {
  const { id } = req.params;
  const { student_id, discipline_id, grade, date, assessment_id, semester_id } = req.body; 
  try {
    const { rows } = await pool.query(
      'UPDATE grades SET student_id = $1, discipline_id = $2, grade = $3, date = $4, assessment_id = $5, semester_id = $6 WHERE id = $7 RETURNING *',
      [student_id, discipline_id, grade, date, assessment_id, semester_id, id] 
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/grades/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM grades WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Semesters
app.get('/semesters', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM semesters');
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/semesters', async (req, res) => {
  const { number } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO semesters (number) VALUES ($1) RETURNING *',
      [number]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/semesters/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM semesters WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Assessments
app.get('/assessments', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM assessments');
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/assessments', async (req, res) => {
  const { name } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO assessments (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/assessments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM assessments WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});