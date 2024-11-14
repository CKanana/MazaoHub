const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// Initialize the Express app
const app = express();
const port = 3000;

// Use CORS for cross-origin requests
app.use(cors());

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mazaohub'
});

// Establish database connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Static files route
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

app.get('/AboutUs', (req, res) => res.sendFile(path.join(__dirname, 'AboutUs.html')));
app.get('/blog', (req, res) => res.sendFile(path.join(__dirname, 'blog.html')));
app.get('/Buyer', (req, res) => res.sendFile(path.join(__dirname, 'Buyer.html')));
app.get('/BuyersProfile', (req, res) => res.sendFile(path.join(__dirname, 'BuyersProfile.html')));
app.get('/Cart', (req, res) => res.sendFile(path.join(__dirname, 'Cart.html')));
app.get('/FAQs', (req, res) => res.sendFile(path.join(__dirname, 'FAQs.html')));
app.get('/Farmer', (req, res) => res.sendFile(path.join(__dirname, 'Farmer.html')));
app.get('/homepage', (req, res) => res.sendFile(path.join(__dirname, 'homepage.html')));
app.get('/Order-history', (req, res) => res.sendFile(path.join(__dirname, 'Orderhistory.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'signup.html')));
app.get('/SignUpAsBuyer', (req, res) => res.sendFile(path.join(__dirname, 'SignUpAsBuyer.html')));
app.get('/SignUpAsFarmer', (req, res) => res.sendFile(path.join(__dirname, 'SignUpAsFarmer.html')));
app.get('/Soko', (req, res) => res.sendFile(path.join(__dirname, 'public' ,'Soko.html')));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/Assets', express.static(path.join(__dirname, 'Assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up storage for Multer to save uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');  // Save uploaded files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Unique filename
    }
});

const upload = multer({ storage: storage });

// Route to fetch products from the database
app.get('/api/products', (req, res) => {
    const query = 'SELECT product_name, caption, price, image_path FROM products';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: 'Error fetching products' });
        }
        res.json(results);  // Send the results as a JSON response
    });
});

// Serve the form for adding products
app.get('/add-product', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ProductForm.html'));
});

// Serve the farmer profile page
app.get('/FarmerProfile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'FarmerProfile.html'));
});

// Handle form submission to add products
app.post('/add-product', upload.single('productImage'), (req, res) => {
    const { productName, productDescription, hashtags, price } = req.body;
    const productImage = req.file ? req.file.path : null;  // Image path if file is uploaded

    // Check if any required fields are missing
    if (!productName || !productDescription || !hashtags || !price || !productImage) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Insert product data into the database
    const query = `
        INSERT INTO products (product_name, caption, hashtags, price, image_path)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
        productName, 
        productDescription, 
        hashtags, 
        parseFloat(price),  // Ensure price is a number
        productImage
    ];

    // Execute the query to insert data
    db.execute(query, values, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ success: false, message: 'Failed to add product' });
        } else {
            res.redirect(302, '/FarmerProfile?message=Product%20added%20successfully!');
        }
    });
});

// Serve the main page (e.g., Soko.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Soko.html'));
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});