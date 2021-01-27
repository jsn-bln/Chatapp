const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String,
        trim: true,
    }
})

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password:{
        type: String,
        trim: true,
        required: true

    },
    rooms:[roomSchema],
    isOnline:{
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('users', userSchema)