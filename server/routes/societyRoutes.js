const express = require('express');
const router = express.Router();
const societyController = require('../controllers/societyController');

router.post('/', societyController.createSociety);
router.get('/', societyController.getSocieties);
router.get('/:id', societyController.getSocietyById);
router.put('/:id', societyController.updateSociety);
router.delete('/:id', societyController.deleteSociety);
router.post("/login", societyController.loginSociety);

module.exports = router;
