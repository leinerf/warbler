const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = function(){

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
            id,
            username,
            profileImageUrl,
            token
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