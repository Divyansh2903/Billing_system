const express = require('express');
const router = express.Router();
const razorpayController = require('../controllers/razorpayController');


router.post('/create-order',razorpayController.createOrder);
router.post('/verify-payment',razorpayController.verifyPaymentClient)

// router.post(
//   '/',
//   express.raw({ type: 'application/json' }), 
//   razorpayController.verifyWebhook
// );


module.exports = router;