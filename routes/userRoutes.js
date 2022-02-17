const { request } = require('express');
const express=require('express');
const HttpError = require('../module/http-error.js');

const userConstroller=require('../controller/user_controller');
const { UserDetails } = require('../module/user_module.js');
//const UserDetails=require('../module/user_module');

const router=express.Router();

//get method
router.get('/:uid',userConstroller.getUserByID);

//post method
router.post('/',userConstroller.createUser);

//get all details
router.get('/',userConstroller.getAllUser);


router.patch('/:uid',userConstroller.updateUser);

router.delete('/:uid',userConstroller.deleteUser);

module.exports=router;