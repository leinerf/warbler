const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

//middlewares


//routes here
app.use(function(req, res, next){
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//handler
app.use(errorHandler);// this goes after creating error or else error will not be found

app.listen(PORT, function(){
    console.log(`Server is starting on port ${PORT}`);
})