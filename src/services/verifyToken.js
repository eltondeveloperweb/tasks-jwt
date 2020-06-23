const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');
const formatDate = require('../utils/formatDate');

const verifyToken = async (req, res, next) => {

	try {
		if (!req.headers.authorization) {
            return res.status(HttpStatus.UNAUTHORIZED)
                .json({ 
                    code: HttpStatus.UNAUTHORIZED,
                    message: 'UNAUTHORIZED',
                    date: formatDate.asString('yyyy-MM-dd', new Date())
                });
        }
        
        let token = req.headers.authorization.split('Bearer ')[1];
        
		if (token === 'null') {
			return res.status(HttpStatus.UNAUTHORIZED)
                .json({ 
                    code: HttpStatus.UNAUTHORIZED,
                    message: 'UNAUTHORIZED',
                    date: formatDate.asString('yyyy-MM-dd', new Date())
                });
		}

		const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
		if (!payload) {
			return res.status(HttpStatus.UNAUTHORIZED)
                .json({ 
                    code: HttpStatus.UNAUTHORIZED,
                    message: 'UNAUTHORIZED',
                    date: formatDate.asString('yyyy-MM-dd', new Date())
                });
        }
        
		req.userId = payload._id;
        next();
        
	} catch(e) {
		console.log(e)
		return res.status(HttpStatus.UNAUTHORIZED)
                .json({ 
                    code: HttpStatus.UNAUTHORIZED,
                    message: 'UNAUTHORIZED',
                    date: formatDate.asString('yyyy-MM-dd', new Date())
                });
	}
}

module.exports = verifyToken;