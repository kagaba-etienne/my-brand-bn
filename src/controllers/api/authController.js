const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const Log = require('../../models/log');
const config = require('config');

//handle errors
const handleErrors = (err) => {
    
    let errors = {
        email: '',
        password: '',
        name: ''
    }
    //incorect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }
    
    //incorect password
    if (err.message === 'incorect password') {
        errors.password = 'That password is not incorrect';
    }


    //duplicates error code
    if (err.code == 11000) {
        errors.email = 'That email is already registered';
        return errors;
    }

    //validating errors
    if (err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        });
    }
    return errors;
}

const maxAge = 2 * 24 * 60 * 60;

const createToken = (user) => {
    return jwt.sign({ user }, config.SECRET, {
        expiresIn: maxAge
    });
}

const post_signup = (req, res) => {
    const user = new User(req.body);
    user.save()
    .then(result => {
        const logBody = {
            action: 'New admin user signed up',
            subject: `${result.name} <${result.email}>`
        }
        const log = new Log(logBody);
        log.save()
            .then(result1 => {
                const token = createToken(result);
                res.status(200).send({status: "success", message: "The operation was successful.", data: { user: result._id, token: token }});
            })
            .catch(err1 => {
                console.log(err1);
                res.status(500).send({ status: "fail", message: "Encountered server error" } );
            });
    })
    .catch(err => {
        console.log(err);
        const errors = handleErrors(err);
        res.status(400).send({status: "fail", message: "The operation was not successful, encountered errors.", data: errors});
    })
};
const post_login = (req, res) => {
    const { email, password } = req.body;
    User.login(email, password)
    .then(user => {
        const token = createToken(user)
        res.status(200).send({status: "success", message: "The operation was successful.", data: { user: user._id, token: token }});
    })
    .catch (err => {
        console.log(err)
        const errors = handleErrors(err);
        res.status(400).send({status: "fail", message: "The operation was not successful, encountered errors.", data: {errors}});
    })
};
const check_auth = (req, res) => {
    res.status(200).send({ status: "success", message: "You are authorized" });
}

module.exports = {
    post_signup,
    post_login,
    check_auth
}