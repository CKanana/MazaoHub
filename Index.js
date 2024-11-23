const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');


const app = express();
const port = 3000;


app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mazaohub',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


db.on('error', (err) => {
    console.error('Database connection error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Reconnecting to the database...');
    } else {
        throw err;
    }
});


app.use(express.static(path.join(__dirname, 'public')));
app.use('/Assets', express.static(path.join(__dirname, 'Assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const htmlRoutes = [
    { path: '/', file: 'homepage.html' },
    { path: '/AboutUs', file: 'AboutUs.html' },
    { path: '/blog', file: 'blog.html' },
    { path: '/Buyer', file: 'Buyer.html' },
    { path: '/BuyersProfile', file: 'BuyersProfile.html' },
    { path: '/Cart', file: 'Cart.html' },
    { path: '/FAQs', file: 'FAQs.html' },
    { path: '/Farmer', file: 'Farmer.html' },
    { path: '/Order-history', file: 'Orderhistory.html' },
    { path: '/signup', file: 'signup.html' },
    { path: '/SignUpAsBuyer', file: 'SignUpAsBuyer.html' },
    { path: '/SignUpAsFarmer', file: 'SignUpAsFarmer.html' },
    { path: '/Soko', file: 'Soko.html' },
    { path: '/Soko2', file: 'Soko2.html' },
    { path: '/Mpesa', file: 'Mpesa.html' },
    { path: '/FarmerProfile', file: 'FarmerProfile.html' },
    { path: '/add-product', file: 'ProductForm.html' },
    { path: '/reviewform', file: 'reviewform.html' }
];

htmlRoutes.forEach(route => {
    app.get(route.path, (req, res) => {
        res.sendFile(path.join(__dirname, 'public', route.file));
    });
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });


app.get('/api/products', (req, res) => {
    const query = 'SELECT product_name, caption, price, category, product_image FROM products';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: 'Error fetching products' });
        }
        res.json(results);
    });
});

app.post('/add-product', upload.single('productImage'), (req, res) => {
    const { productName, productDescription, hashtags, category, price } = req.body;
    const productImage = req.file ? req.file.path : null;

    if (!productName || !productDescription || !hashtags || !price || !productImage) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const query = `
        INSERT INTO products (product_name, caption, hashtags, category, price, product_image)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [productName, productDescription, hashtags, category, parseFloat(price), productImage];

    db.query(query, values, (err) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ success: false, message: 'Failed to add product' });
        }
        res.redirect(302, '/FarmerProfile?message=Product%20added%20successfully!');
    });
});


app.post('/register', async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    if (!firstname || !lastname || !username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO buyers (firstname, lastname, username, email, password) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [firstname, lastname, username, email, hashedPassword], (err) => {
            if (err) {
                console.error('Database error:', err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send('Email already registered.');
                }
                return res.status(500).send('Database error.');
            }
            res.redirect(302, '/BuyersProfile?message=Registration%20successful!');
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error.');
    }
});
app.post('/registerfarmer', async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    if (!firstname || !lastname || !username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO farmers (firstname, lastname, Username, email, password) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [firstname, lastname, username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Database error:', err);

                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(400).send('Email already registered.');
                } else {
                    res.status(500).send('Database error.');
                }
            } else {
                return res.redirect(302, `/FarmerProfile?message=${encodeURIComponent('Registration successful!')}`);
               
            }
        });
    } catch (error) {
        console.error('Hashing or server error:', error);
        res.status(500).send('Server error.');
    }
});
// Login Endpoint
app.post('/login', (req, res) => {
    const { username_or_email, password } = req.body;

    const query = 'SELECT * FROM farmers WHERE email = ?';
    db.query(query, [username_or_email], async (err, results) => {
        if (err) {
            res.status(500).send('Database error.');
        } else if (results.length === 0) {
            res.status(400).send('User not found.');
        } else {
            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                return res.redirect(302, `/FarmerProfile?message=${encodeURIComponent('Login successful!')}`);
            } else {
                return res.redirect(302, `/SignUpAsFarmer?message=${encodeURIComponent('Registration successful!')}`);
            }
        }
    });
});
const reviews = []; 


app.post('/addReview', (req, res) => {
    const { buyer_id, product_id, rating, comment } = req.body;

    if (!buyer_id || !product_id || !rating || rating < 1 || rating > 5 || !comment) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const query = `
        INSERT INTO reviews (buyer_id, product_id, rating, comment)
        VALUES (?, ?, ?, ?)
    `;
    db.query(query, [buyer_id, product_id, rating, comment], (err, result) => {
        if (err) {
            console.error('Error inserting review:', err);
            return res.status(500).json({ error: 'Failed to add review' });
        }
        res.status(201).json({ message: 'Review added successfully' });
    });
});


app.get('/reviews/:product_id', (req, res) => {
    const { product_id } = req.params;
    const query = 'SELECT * FROM reviews WHERE product_id = ? ';

    db.query(query, [product_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No reviews found for this product.' });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
