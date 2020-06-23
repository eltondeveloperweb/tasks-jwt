const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = model('User', userSchema);
