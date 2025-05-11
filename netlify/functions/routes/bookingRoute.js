const express = require('express');
const router = express.Router();
const { sendBookingConfirmation } = require('../controller/bookingController');

router.post('/book', sendBookingConfirmation);

module.exports = router;