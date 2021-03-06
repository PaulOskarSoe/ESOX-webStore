const User = require('./user.model')
const jwt  = require('jsonwebtoken')


exports.login = (req, res) => { 
    User.login(req.body)
    .then( user => {
        console.log(user)
        jwt.sign(user, process.env.JWT_PRIVATE_KEY, (err, token) => {
            if(err){
                console.log(err)
                return res.status(500)
            }
            res.status(200).send({
                user,
                token
            })
          });
    })
    .catch(err => {
        res.send(401)
    })
}

exports.signup = (req, res) => {
    User.signup(req.body)
    .then( user => {
        res.status(200).json(user)
    })
    .catch( err => {
        res.send(500)
    })
}