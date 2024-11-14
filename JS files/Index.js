const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });


const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_db_user',
  password: 'your_db_password',
  database: 'MazaoHub'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});


app.post('/add-product', upload.single('productImage'), (req, res) => {
  const { productName, productDescription, hashtags, price } = req.body;
  const imagePath = req.file ? req.file.path : null;


  const sql = `INSERT INTO Products (name, description, hashtags, price, image) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [productName, productDescription, hashtags, price, imagePath], (err, result) => {
    if (err) {
      console.error('Failed to insert data:', err);
      res.status(500).send('Database error');
      return;
    }
    res.send('Product added successfully');
  });
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});