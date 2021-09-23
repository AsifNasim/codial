const express = require('express');

console.log('router is running');
const router = express.Router();

router.use('/posts', require('./posts'));
module.exports = router;