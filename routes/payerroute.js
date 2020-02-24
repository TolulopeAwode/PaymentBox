const express = require('express');
const router = express.Router();

const payerRoute = require('../controllers/payercontroller');
router.post('/add',payerRoute.addPerson) ;
router.get('/getall',payerRoute.getallRegisteredStudents) ;
router.get('/getone/:identity',payerRoute.getaOneStudent) ;

module.exports = router;


