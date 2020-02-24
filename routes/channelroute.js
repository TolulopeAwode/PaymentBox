const express = require('express');
const router = express.Router();

const channelRoute = require('../controllers/channelcontroller');
router.post('/add',channelRoute.addNewChannel) ;
router.post('/update',channelRoute.updateChannel) ;
router.get('/getall',channelRoute.getallChannels) ;

module.exports = router;


