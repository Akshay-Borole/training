
const mongoose = require('mongoose');
const { UserDetails } = require('../module/user_module');
const { validationResult } = require('express-validator');
const HttpError = require('../module/http-error');

// const getUserByID=(req,res,next)=>{    //get user 
//     const userID=req.params.uid
    
//     const user=fake_user.find(user=>{
//         return user.id===userID
//     });
//     if(!user){
//         throw new HttpError('could not provide user',404);
//     }
//     res.json({user});//json format
// }; 
//get user id
const getAllUser=async (req, res) => {
  const user = await UserDetails.find();
  res.send(user);
};

const getUserByID = async (req, res, next) => {
  const userID=req.params.uid; // { pid: 'p1' }
  console.log(userID)
  let user;
  try {
    user = await UserDetails.findById(userID);
  } catch (err) {
    const error = new HttpError(
      'Error, could not find a place.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      'Could not find a place for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) }); // => { place } => { place: place }
};

//create a user
const createUser = async (req, res, next) => {
      console.log(req.body);
      const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('error, please check your data.', 422)
      );
    }
  
    const { username,email,mobileno} = req.body;
  
    const createdUsers= new UserDetails({
        username,
        email,
        mobileno
    });
    try{
        await createdUsers.save();
    } catch (err){
    const error=new HttpError(
        'creating user failed',
        500
    );
    return next(error);
}
 res.status(201).json({user:createdUsers})
};

//update user

const updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpError('error, please check your data.', 422);
    }
  
    const {username} = req.body;
    const UserID = req.params.uid;
  
    let user;
    try {
      user = await UserDetails.findById(userID);
    } catch (err) {
      const error = new HttpError(
        'error, could not update place.',
        500
      );
      return next(error);
    }
  
    user.username = username;
  
    try {
      await user.save();
    } catch (err) {
      const error = new HttpError(
        'error, could not update place.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ user: user.toObject({ getters: true }) });
  };

/*const updateUser=(req,res,next)=>{   //get user
    const{name}=req.body;
    const userID=req.params.uid;

    const updatedUser=fake_user.find(user=>user.id===userID);
    const userIndex=fake_user.findIndex(user=>user.id===userID);
    updatedUser.id=id;
    updatedUser.name=name;

    fake_user[userIndex]=updatedUser;

    res.status(200).json({user:updatedUser})
};

const deleteUser=(req,res,next)=>{
    const userID=req.params.uid;
    fake_user=fake_user.filter(user=>user.id!==userID);
    res.status(200).json({message:'Deleted user',});
};*/

//delete user
const deleteUser=async (req, res, next) => {
  const userID=req.params.uid;
  console.log(userID)
  let user;
  /* try {
    user=await UserDetails.findByIdAndDelete(userID);
  } catch (err) {
    const error = new HttpError(
      'error, could not delete place.',
      500
    );
    return next(error);
  } */

  try {
    user=await UserDetails.findByIdAndDelete(userID);
  } catch (err) {
    const error = new HttpError(
      'Error, could not delete place.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted place.' });
};


exports.getUserByID = getUserByID;

exports.createUser=createUser;

exports.getAllUser=getAllUser;

exports.updateUser=updateUser;

exports.deleteUser=deleteUser;