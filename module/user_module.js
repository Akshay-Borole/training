const mongoose = require('mongoose');
const UserDetails = mongoose.model('UserDetails', new mongoose.Schema({

    username: {
        type: String,
        required: true,
        maxlength: 30
    },

    email: {
        type: String,
        required: true,
        unique: true,
        // trim:true
    },

    mobileno: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
}));

module.exports.UserDetails=UserDetails;