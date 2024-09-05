const express = require('express');
const { createIntern, getInterns, updateIntern, deleteIntern } = require('../controllers/internController');
const router = express.Router();

router.post('/api/interns', createIntern);
router.get('/:id?', getInterns);
router.put('/:id', updateIntern);
router.delete('/:id', deleteIntern);

module.exports = router;
