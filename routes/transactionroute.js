const express = require('express');
const router = express.Router();

const transactionRoute = require('../controllers/transacctionlogController');
router.post('/initiate',transactionRoute.initiatePayment) ;

module.exports = router;


