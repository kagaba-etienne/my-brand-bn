const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const config = require('config');


const requireAuth = (req, res, next) => {
    const token = req.headers.jwt;
    
    //check json web token exist & is verified
    if (token) {
        jwt.verify(token, config.SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(401).send({ status:"fail", message: 'You are not authorized.' });
            } else {
                next();
            }
        });
    } 
    else {
        res.status(401).send({ status:"fail", message: 'You are not authorized.' });
    }
}

//check current user
const checkUser = (req, res, next) => {
    const token = req.headers.jwt;

    if (token) {
     jwt.verify(token, config.SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
}

module.exports = {
    requireAuth,
    checkUser
};