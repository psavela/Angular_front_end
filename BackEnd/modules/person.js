var express = require("express");
var db = require('./queries');
var mysql = require('./mysql_module');

var router = express.Router();
// nämä on routereita
//handle GET request for /persons context
router.get('/', function(req, res) {
    
    db.getAllPersons(req, res);
    
});


// search:lle router kohta 3. ks vihko 11.11.2015
router.get('/search',function(req,res){
    //console.log('Router for query called');
    mysql.filterFriends(req,res);
    //db.findPersonsByName(req,res);
});


//handle POST request for /persons context
router.post('/', function(req, res) {
  
    mysql.addNewFriend(req,res);
//    db.saveNewPerson(req, res);
    
});

router.put('/',function(req,res){
    mysql.updateFriend(req,res);
    //db.updatePerson(req,res);
});

router.delete('/',function(req,res){
    mysql.deleteFriends(req,res);
    //db.deletePerson(req,res);
});

module.exports = router;