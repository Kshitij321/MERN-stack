const express=require('express');
const router=express.Router();
const {handlelogin,handlesignup} =require('../controllers/userController');
//login
router.post('/login',handlelogin);
//signup
router.post('/signup',handlesignup);

module.exports=router;
