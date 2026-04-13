const mongoose = require('mongoose');
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');

async function createUser(req, res) {
   try{

    const hashed_password = await bcrypt.hash(req.body.password, 10);
    

    //create a new user object that exists in memory
    const newUser = {
        first_name: req.body.first_name,
        username: req.body.username,
        password: hashed_password,
        email: req.body.email,
    };

    //create a new user document in the database
    const user = new User(newUser);

    //save or persist the new user document in database
    await user.save();

     //send a response to the client
     return res.status(201).json({"User created successfully": user});

   }catch(error){
     return res.status(500).json({"Internal Server Error": error.message});
   }    
}


module.exports = { createUser };
