const User = require('../models/user');

exports.getUserRepository = async () => {
    const users = await User.find({});
    return users;
},

exports.createUserRepository = async (data) => {
    const newUser = await new User(data);
    newUser.save();
},

exports.loginUserRepository = async (email) => {
    const findUser = User.findOne({email});
    return findUser;
}