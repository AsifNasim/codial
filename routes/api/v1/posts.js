const express = require('express');
const router = express.Router();
const passport = require('passport');

console.log('router is running');

const postsApi = require("../../../controllers/api/v1/posts_api")

router.get('/', postsApi.index);

router.delete('/:id', postsApi.destroy);
//here session is false because we don't want do retain the session cookie
// router.delete('/:id',passport.authenticate('jwt', {session:false}), postsApi.destroy);

module.exports = router;