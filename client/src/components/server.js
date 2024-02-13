const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '1234',
   database: 'cssecdv',
});

db.connect((err) => {
    if (err) {
       console.error('MySQL connection error:', err);
    } else {
       console.log('Connected to MySQL database');
    }
 });

// Handle user registration
/*app.post('/register', (req, res) => {
    const { username, first_name, last_name, email, country, phone_number, password } = req.body;
 
    const sql = 'INSERT INTO users (username, first_name, last_name, email, country, phone_number, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [username, first_name, last_name, email, country, phone_number, password], (err, result) => {
       if (err) {
          console.error('MySQL query error:', err);
          res.status(500).json({ success: false, error: 'Internal server error' });
       } else {
          res.status(200).json({ success: true, message: 'User registered successfully' });
       }
    });
 });*/
 

 app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
 });