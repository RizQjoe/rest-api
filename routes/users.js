var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var auth  = require('../helpers/auth')


router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
router.get('/users', auth.isLogin, auth.isAdmin, userController.getAllUser )
router.get('/users/id:', auth.isLogin, auth.isOwner, userController.getUserById)
router.post('/users', auth.isLogin, auth.isAdmin, userController.createUser)
router.delete('/users/id:', auth.isLogin, auth.isAdmin, userController.deleteUser)
router.put('/users/id:', auth.isLogin, auth.isOwner, userController.editUser)



/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
