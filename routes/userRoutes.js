const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require('../models/userModel.js');
const mongoose = require('mongoose');

//home page
router.get('/home', (req, res) =>{
    res.render('home');
});


//this route will link the createUser function to route handler
router.post('/users', userController.createUser)


//example of a route parameter
router.get('/users/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});

//example of a query parameter
router.get('/search', (req, res) => {
    res.send(`Search query: ${req.query.q}`);
});

//example of a middleware function
router.use((req, res, next) =>{
    console.log(`Request URL: ${req.url}.  Time: ${new Date()}`);
    next();
});

//API endpoint that exposes all user resources from the database
router.get('/users', async (req, res) =>{
    try{
        const users = await User.find();

        res.json(users).status(200);
    } catch(error){
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});



//commonjs syntax to export the router (configured in package.json "type": "commonjs")
module.exports = router;