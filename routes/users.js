const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');
const homeController =  require('../controllers/home_controller');
// const { Passport } = require('passport');
// checks if the user is signed in or not
router.get('/profile',passport.checkAuthentication, userController.profile);
router.get('/contact',userController.contact );
// router.get('/posts', homeController.post);
router.get('/sign-in',userController.signin);
router.get('/sign-up',userController.signup);
router.post('/create', userController.create);
// use passport as a mddleware to authenticate
// it can take three arguments and that should be middleware
router.post('/create-session',passport.authenticate(
    'local',//it will use the strategy here
    // if the user fails to sign in
    {failureRedirect:'/users/sign-in'}
), userController.createSession);


router.post('/post', userController.post);
router.get('/sign-out', userController.destroySession);

module.exports = router;