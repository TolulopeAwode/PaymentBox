const express = require('express');
const router = express.Router();

const schoolAccountRoute = require('../controllers/schoolaccountcontroller');
router.post('/add',schoolAccountRoute.addSchoolAccount) ;
router.post('/update',schoolAccountRoute.updateSchoolAccount) ;
router.get('/getall',schoolAccountRoute.getallSchoolAccount) ;

module.exports = router;


