var express = require("express");
var path = require("path");
var http = require('http');
var bodyParser = require("body-parser");
var database = require('./modules/database');
var queries = require('./modules/queries');
var person = require('./modules/person');
var user = require('./modules/user');
//This is used for creating a secret key value
//for our session coocie
var uuid = require('uuid');
//This is used to create a sesson object for client
var session = require('express-session');

var app = express();

/***********************MIDDLEWARES*************************/

app.use(session({
    secret:uuid.v1(),
    cookie:{maxAge:600000}
}));

//Bodyparser json() middleware parses the json object from HTTP POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(function(req,res,next){

    
//    console.log(req.method);
//    console.log(req.path);
//    console.log(__dirname);
//    console.log(req.body);
//    console.log(req.session);
//    console.log(database.Person);
//    database.myFunction();
    //Send request forward in stack
    next();
});

//Define middlewares for our static files (.html, .css, .js files are loaded
//by browser when parsing index.html file) 
app.use('/',express.static(path.join(__dirname, '../FrontEnd/views')));
app.use('/FrontEnd/css',express.static(path.join(__dirname, '../FrontEnd/css')));
app.use('/FrontEnd/lib',express.static(path.join(__dirname, '../FrontEnd/lib')));
app.use('/FrontEnd/module',express.static(path.join(__dirname, '../FrontEnd/module')));
app.use('/FrontEnd/controllers',express.static(path.join(__dirname, '../FrontEnd/controllers')));
app.use('/FrontEnd/factories',express.static(path.join(__dirname, '../FrontEnd/factories')));
//app.use('/css',express.static(path.join(__dirname, 'css')));
app.use('/FrontEnd/fonts',express.static(path.join(__dirname, '../FrontEnd/fonts')));
//app.use('/controllers',express.static(path.join(__dirname, 'controllers')));
//app.use('/lib',express.static(path.join(__dirname, 'lib')));


/*********************** OUR REST API MIDDLEWARES *************************/

app.use('/persons', person);
app.use('/friends',user);    //kun serverille tulee pyyntö /friends, niin silloin tämä middleware käsittelee  
                             //ja siirtää moduliin user.js, jos ei löydy, niin tulee 404 virhesivu


/************************* ROUTERS ***************************/

app.get('/logout',function(req,res){
    
//    req.session.kayttaja = null;
    req.session.destroy();
    res.redirect('/');
});

//This checks if client is logged in or not
app.get('/islogged',function(req,res){
    //User is logged in if session contains kayttaja attribute
    if(req.session.kayttaja){
        
        res.status(200).send([{status:'ok'}]);
        
    }
    else{
                             
        res.status(401).send([{status:'Unauthorized'}]);       
    }    
});

/*

app.get("/css/styles.css", function (req, res) {
    
    res.sendfile("views/index.html");
});

app.get("/", function (req, res) {
    
    res.send("Hello World:");
});


app.get("/css/styles.css", function (req, res) {
    
    res.sendfile("css/styles.css");
});
*/

/*
app.get("/persons", function(req,res) {
    
    queries.getAllPersons(req, res);
    
});
*/
/*
app.get("/persons", function (req, res) {
    
    res.send("Hello persons there:");
});
*/
app.listen(3000);