var express = require("express");
var path = require("path");
var https = require('https');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
var database = require('./modules/database');
var queries = require('./modules/queries');
var person = require('./modules/person');
var user = require('./modules/user');
var mysql_module = require('./modules/mysql_module');

var options = {
    
    key:fs.readFileSync('server.key'),
    cert:fs.readFileSync('server.crt'),
    requestCert:false,
    rejectUnauthorized:false
}

//This is used for creating a secret key value
//for our session coocie
var uuid = require('uuid');

//Create a secret for out web token
var secret = uuid.v1();

exports.secret = secret;

//This is used to create a sesson object for client
var session = require('express-session');

var app = express();

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

/***********************MIDDLEWARES*************************/

app.use(session({
    secret:uuid.v1(),
    cookie:{maxAge:6000000}
}));

//Bodyparser json() middleware parses the json object from HTTP POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());



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
app.use('/friends',user);    //kun serverille tulee pyyntö /friends, niin silloin tämä middleware käsittelee  
                             //ja siirtää moduliin user.js, jos ei löydy, niin tulee 404 virhesivu


/************************* ROUTERS ***************************/

app.get('/logout',function(req,res){
    
//    req.session.kayttaja = null;
    req.session.destroy();
    res.redirect('/');
});



app.use(function(req,res,next){

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    //Check if there was a token   
    if(token){
        
        //Verify that token is not 'quessed' by the client and it matches
        //the one we created in login phase
        jwt.verify(token,secret, function(err, decoded){
            //there was error verifying the token
            if(err){
                
                return res.send(401);
            }else{
                
                req.decoded = decoded;
                console.log(req.decoded);
                next();
            }
        });
    }else{
        
        res.sendStatus(403);
    }

//    console.log(req.method);
//    console.log(req.path);
//    console.log(__dirname);
//    console.log(req.body);
//    console.log(req.session);
//    console.log(database.Person);
//    database.myFunction();
    //Send request forward in stack
//    next();
});


app.use('/persons', person);
//app.use('/friends',user);    //kun serverille tulee pyyntö /friends, niin silloin tämä middleware käsittelee  
                             //ja siirtää moduliin user.js, jos ei löydy, niin tulee 404 virhesivu



//This router checks if client is logged in or not
app.get('/islogged',function(req,res){
    //User is logged in if session contains kayttaja attribute
    if(req.session.kayttaja){
        
        res.status(200).send([{status:'ok'}]);
        
    }
    else{
                             
        res.status(401).send([{status:'Unauthorized'}]);       
    }    
});



https.createServer(options,app).listen(app.get('port') ,app.get('ip'), function() {
//    console.log("Express server listening at %s:%d ", app.get('ip'),app.get('port'));
    console.log("Express server started");
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
//app.listen(3000);