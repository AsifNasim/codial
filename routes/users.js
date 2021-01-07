const express = require('express');
const { home } = require('../controllers/home_controller');

const router = express.Router();

const userController = require('../controllers/user_controller');
const homeController =  require('../controllers/home_controller')

router.get('/profile', userController.profile);
router.get('/contact',userController.contact )
router.get('/posts', homeController.post)

module.exports = router