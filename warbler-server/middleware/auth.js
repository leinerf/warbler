require("dotenv").load();
const jwt = require("jsonwebtoken");

// make sure the user is logged - Authentication
exports.loginRequired = function(req, res, next){
    //in case of no headers.authorization soo check if its undefined
    try{
        const token = req.headers.authorization.split(" ")[1]; // Bearer <jwt token>
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Please log in first"
                });
            }
        });
    } catch(err){
        return next({
            status: 401,
            message: "Please log in first"
        });
    }
    
};

// make sure we get the correct user - Authorization
exports.ensureCorrectUser = function(req, res, next){
    
};