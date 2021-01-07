const express = require('express');

console.log('router is running');
const router = express.Router();

const homeController = require('../controllers/home_controller')


router.get('/', homeController.home);
// router.get('/post')
// router.get('/about',homeController.about );
router.use('/users',require('./users'))

module.exports = router