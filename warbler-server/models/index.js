const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/wrabler", {
    keepAlive: true,
    useMongoClient: true
});

module.exports.User = require("./user")