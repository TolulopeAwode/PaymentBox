const express = require('express');
const router = express.Router();

const configRoute = require('../controllers/configurationcontroller');
router.post('/add',configRoute.addTransactionConfig) ;
router.get('/getall',configRoute.getallConfigurations) ;  
router.get('/get/:paymentcode',configRoute.getTransactionConfig) ;   
router.get('/fetchpayment/:transref',configRoute.fetchPaymentConfig) ;   

module.exports = router;


