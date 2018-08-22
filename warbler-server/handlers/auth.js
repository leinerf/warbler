const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next){
    //finding a user
    try{
        let user = await db.User.findOne({
        email: req.body.email 
        });
        let { id, username, profileImageUrl} = user;
        //checking if their password matches what was sent to the server
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch) {
            let token = jwt.sign({
                id: id,
                username: username,
                profileImageUrl: profileImageUrl
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id: id,
            username: username,
            profileImageUrl: profileImageUrl,
            token: token
        })
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            });
        }
    } catch(err){
        return next({
            status: 400,
            message: "Invalid Email/Password."
        });
    }
    //if it al matches 
    //log them in
}

exports.signup = async function(req, res, next){
    try{
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl} = user;
        //create a user
        //create a token (signing a token)
        let token = jwt.sign(
            {
                id: id,
                username: username,
                profileImageUrl: profileImageUrl
            }, 
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id: id,
            username: username,
            profileImageUrl: profileImageUrl,
            token: token
          });
    } catch(err) {
        //see what kind of error
        //if a validation fails! 11000
        if(err.code === 11000){
            //respond with /username/email already taken
            err.message = "Sorry, that username and/or email is taken"
        }
        //otherwise just send back a generic 400 error 
        return next({
            status: 400,
            message: err.message
        });
    }
}