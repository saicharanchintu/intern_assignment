const express = require('express');
const { register, login } = require('../controllers/authController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Example of a protected route for admins only
router.get('/admin', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.send('Admin access');
});

module.exports = router;
