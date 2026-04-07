const mongoose = require('mongoose');


//define the user model
const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true}
});

module.exports = mongoose.model('Users', userSchema);