//var dbUrl = "mongodb://genericuser:genericpw@ds027748.mongolab.com:27748/blog";
var dbUrl = "forum";
var collections = ["posts"];

var db = require("mongojs").connect(dbUrl, collections);


module.exports = db;
