const express = require('express');
const router = express.Router();
const meterController = require('../controllers/meterController');

router.post('/get-reading',meterController.getMeterReading);

module.exports = router;