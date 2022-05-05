const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const authorization = require("../middleware/authorization")

//router.get('/users', checkAuthenticated, authController.renderIndexAuth);
    
  
router.post('/register', authorization.checkNotAuthenticated, authController.registerNewUser);

router.post('/login', authorization.checkNotAuthenticated, authController.loginUser);

router.get('/logout', authorization.checkAuthenticated, authController.logoutUser);

router.get("/getuser", authController.getUser);





module.exports = router;