const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller');
const homeController =  require('../controllers/home_controller')

router.get('/profile', userController.profile);
router.get('/contact',userController.contact );
router.get('/posts', homeController.post);
router.get('/sign-in',userController.signin);
router.get('/sign-up',userController.signup);
router.post('/create', userController.create);

module.exports = router