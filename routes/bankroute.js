const express = require('express');
const cors= require('cors');
const router = express.Router();

const auth = require('../middleware/auth');
router.use(cors());
const bankRoute = require('../controllers/bankcontroller');
router.get('/getall',auth,bankRoute.getallBanks) ;
router.post('/add',bankRoute.createBank) ;

module.exports = router;



