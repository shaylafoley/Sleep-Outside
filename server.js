// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const secretKey = 'your-secret-key'; // Use a secure key for JWT

// Middleware
app.use(cors()); // Enable CORS for your frontend
app.use(express.json()); // Parse incoming JSON requests

// Dummy user data (replace with database logic if needed)
const users = {
  'chembeassan@gmail.com': 'password123'
};

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Received:', email, password); // Log input

  // Check if the user exists and the password is correct
  if (users[email] && users[email] === password) {
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' }); // Generate a JWT token
    res.json({ message: 'Login successful', token }); // Send success message and token
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});


// Define the root route
app.get('/', (req, res) => {
  res.send('Welcome to the Sleep-Outside API');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


