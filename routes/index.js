const express = require('express');

console.log('router is running');
const router = express.Router();

const homeController = require('../controllers/home_controller')


router.get('/', homeController.home);
router.get('/about',homeController.about );

module.exports = router