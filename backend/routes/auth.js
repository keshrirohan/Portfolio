const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Store bcrypt hash of admin password at startup
let adminPasswordHash = null;

async function getHash() {
  if (!adminPasswordHash) {
    adminPasswordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  }
  return adminPasswordHash;
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    if (username !== process.env.ADMIN_USERNAME) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Compare with plain password from env (bcrypt compare)
    const isMatch = await bcrypt.compare(password, await getHash());
    // Also allow direct match (for plain text env value)
    const plainMatch = password === process.env.ADMIN_PASSWORD;

    if (!isMatch && !plainMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, expiresIn: 28800 });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/auth/verify  — check if token is still valid
router.post('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false });
  }
  try {
    jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
    res.json({ valid: true });
  } catch {
    res.status(401).json({ valid: false });
  }
});

module.exports = router;
