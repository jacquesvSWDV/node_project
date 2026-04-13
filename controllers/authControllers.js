const express = require('express');
const jwt = require('jsonwebtoken');


async function generateToken(req, res){
    const secret_key = "super_secret_key";

    const user = {
        id: 1,
        date: new Date(),
    }

    const token = jwt.sign(user, secret_key, { expiresIn: '1h' });

    res.json({ token });

}

async function verifyToken(req, res){
    const secret_key = "super_secret_key";

    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) res.status(401).json({message: 'You are not authorized'});

    try {
    const decoded = jwt.verify(token, secret_key);

    if(decoded){
        res.json({message: 'Token is invalid.', decoded});
    } else {
        res.status(401).json({message: 'Invalid token.'});
    }
    
    } catch(error) {
        res.status(500).json({message: 'Internal Server Error.'});
    }
}

module.exports = { generateToken, verifyToken }