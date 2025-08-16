const express = require('express');
const router = express.Router();
const solanaController=require('../controllers/solanaControllers')



router.get('/get-sol-rate',solanaController.getSolanaPriceInINR);

router.post('/create-solana-order',solanaController.createSolanaOrder);


module.exports = router;