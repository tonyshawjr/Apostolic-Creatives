const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Database username
  password: 'root', // Database password
  database: 'apostolic_creatives', // Your database name
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit if the database connection fails
  }
  console.log('Connected to the database!');
});

// Test GET route (for debugging purposes)
app.get('/login', (req, res) => {
  res.json({ message: 'This is a GET response for testing purposes!' });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate inputs
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Query the database for the user by email
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, user.password_hash, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err.message);
        return res.status(500).json({ error: 'Error comparing passwords' });
      }

      if (result) {
        // Login successful
        res.json({
          message: 'Login successful',
          user: { email: user.email, role: user.role }, // Return basic user info
        });
      } else {
        // Password mismatch
        res.status(401).json({ error: 'Invalid email or password' });
      }
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
