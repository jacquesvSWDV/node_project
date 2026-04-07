const mongoose = require('mongoose');
const User = require('../models/userModel.js');

async function createUser(req, res) {
   try{

    //create a new user object that exists in memory
    const newUser = {
        first_name: req.body.first_name,
        username: req.body.username,
        email: req.body.email,
    };

    //create a new user document in the database
    const user = new User(newUser);

    //save or persist the new user document in database
    await user.save();

     //send a response to the client
     res.status(201).json({"User created successfully": user});

   }catch(error){
     res.status(500).json({"Internal Server Error": error.message});
   }    
}


module.exports = { createUser };
