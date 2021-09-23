const express = require('express');

console.log('router is running');
const router = express.Router();
const usersApi = require('../../../controllers/api/v1/users_api');

// router.use('/posts', require('./posts'));

router.post('/create-session', usersApi.createSession);
module.exports = router;