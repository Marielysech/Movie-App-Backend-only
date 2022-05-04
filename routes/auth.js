const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const authorization = require("../middleware/authorization")

//router.get('/users', checkAuthenticated, authController.renderIndexAuth);
    
  
router.post('/register', authController.registerNewUser);

router.post('/login', authController.loginUser);

router.get('/logout', authController.logoutUser);




module.exports = router;