const express = require('express');
const router = express.Router();

const periodRoute = require('../controllers/paymenttimecontroller');
router.post('/add',periodRoute.addPaymentPeriod) ;
router.get('/getall',periodRoute.getallPaymentPeriod) ;

module.exports = router;


