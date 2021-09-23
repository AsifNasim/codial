const express = require('express');

console.log('router is running');
const router = express.Router();

router.use('/posts', require('./posts'));
router.use('/users', require('./users'));
module.exports = router;