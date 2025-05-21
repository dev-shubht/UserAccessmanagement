const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth.controller');
const verifyToken = require('../middleware/authMiddleware');

// POST /api/signup
router.post('/signup', signup);

// POST /api/login
router.post('/login', login);

router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected route access granted', user: req.user });
});

module.exports = router;
