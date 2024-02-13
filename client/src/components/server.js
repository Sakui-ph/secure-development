// npm install express body-parser cors mysql2
// cd client/src/components
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3100;

let counter = 0;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '1234',
   database: 'cssecdv',
});

function generatePrefixID() {
   counter++;
   return counter.toString().padStart(2, '0');
}

/*db.connect((err) => {
    if (err) {
       console.error('MySQL connection error:', err);
    } else {
       console.log('Connected to MySQL database');
    }
 });*/

 // Test insert
/*db.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
   var sql = "INSERT INTO users (prefix_id, email, phone_number, password, full_name) VALUES ('001', 'email@gmail.com', '09458991485', '123', 'John Doe')";
   db.query(sql, function (err, result) {
      if (err) {
         console.error('Error inserting data into the database:', err);
         throw err;
      }
      console.log("1 record inserted");
   });
});*/

// Handle user registration
app.post('/', (req, res) => {
    const prefix_id = generatePrefixID();
    const full_name = req.body.name;
    const email = req.body.email;
    const phone_number = req.body.number;
    const password = req.body.password;
    const profile_photo = req.body.profileImage;
 });
 

 app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
 });