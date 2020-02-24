const express = require('express');
const router = express.Router();
const cors = require('cors');


router.use(cors());
const paymentCategoryRoute = require('../controllers/paymentcategorycontroller');
router.post('/add',paymentCategoryRoute.addPaymentCategory) ;
router.post('/update',paymentCategoryRoute.updatePaymentCategory) ;
router.get('/getall',paymentCategoryRoute.getallPaymentCategory) ;

module.exports = router;


