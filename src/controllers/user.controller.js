const repository = require('../repositories/user.repository');
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');
const formatDate = require('../utils/formatDate');

exports.getUserController = async (req, res, next) => {
    try{
        var users = await repository.getUserRepository();
        res.status(HttpStatus.OK)
            .json({ 
                code: HttpStatus.OK, 
                message: 'Request executed with success.', 
                data: users,
                date: formatDate.asString('yyyy-MM-dd', new Date())
            });

    }catch(e){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ 
                code: HttpStatus.INTERNAL_SERVER_ERROR, 
                message: 'Error application.', 
                error: e,
                date: formatDate.asString('yyyy-MM-dd', new Date())
            });
    }
},

exports.createUserController = async (req, res, next) => {
    try{
        var newUser = await repository.createUserRepository(req.body);
        res.status(HttpStatus.CREATED)
            .json({ 
                code: HttpStatus.CREATED, 
                message: 'User created with success.', 
                data: newUser,
                date: formatDate.asString('yyyy-MM-dd', new Date())
            });

    }catch(e){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ 
                code: HttpStatus.INTERNAL_SERVER_ERROR, 
                message: 'Error application.', 
                error: e,
                date: formatDate.asString('yyyy-MM-dd', new Date())
            });
    }
},

exports.loginUserController = async (req, res, next) => {

    console.log(req.body);
    
    try{
        const { email, password } = req.body;

        var user = await repository.loginUserRepository(email);

        if(!user) return res.status(HttpStatus.UNAUTHORIZED)
            .json({ 
                code: HttpStatus.UNAUTHORIZED, 
                message: 'User not found.',
                date: formatDate.asString('yyyy-MM-dd', new Date())
            });

        if(user.password !== password) return res.status(HttpStatus.UNAUTHORIZED)
            .json({ 
                code: HttpStatus.UNAUTHORIZED, 
                message: 'Password wrong.',
                date: formatDate.asString('yyyy-MM-dd', new Date())
            });

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY, { expiresIn:'1m'});

        var dt = new Date();
         dt.setMinutes( dt.getMinutes() + 3);

        return res.status(HttpStatus.OK)
            .json({token: token, expiresIn: formatDate.asString('hh:mm:ss', dt)});

    }catch(e){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ 
                code: HttpStatus.INTERNAL_SERVER_ERROR, 
                message: 'Error application.', 
                error: e,
                date: formatDate.asString('yyyy-MM-dd', new Date())
            });
    }
}


