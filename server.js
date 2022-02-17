const mongoose = require('mongoose');
const express=require('express');
const bodyparser=require('body-parser');
const dotenv = require('dotenv');
require('./connection/db_conection');
const port = process.env.PORT || 3000



const userRoutes=require('./routes/userRoutes'); //userRoutes path 
const HttpError=require('./module/http-error.js');



const app=express();

app.use(bodyparser.json());

app.use('/api/user',userRoutes);// /api/user

app.use((req,res,next)=>{
    const error=new HttpError('could not find route');
    throw error;
});

//middleware error handling
app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code|| 500);
    res.json({message:error||'error occured'});
});

//app.use(userRoutes);//middelware Request and Response objects
app.listen(port, () => console.log(`Server started on port ${port}`))


    