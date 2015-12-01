var express = require("express");
var db = require('./queries');

var router = express.Router();
// nämä on routereita
//handle GET request for /persons context
router.get('/', function(req, res) {
    
    db.getAllPersons(req, res);
    
});


// search:lle router kohta 3. ks vihko 11.11.2015
router.get('/:nimi', function(req,res){
    
    console.log("Get with name router called");  // tämä näkyy nodemon konsoli-promptissa
    db.findPersonsByName(req,res);
});


//handle POST request for /persons context
router.post('/', function(req, res) {
        
    db.saveNewPerson(req, res);
    
});

router.put('/', function(req, res) {
    
    db.updatePerson(req,res);
    
});

router.delete('/:id', function(req, res) {
    
    db.deletePerson(req,res);
    
//    console.log(req.params.id);
//    res.send("Person deleted"); //redirect('/');    //Palaa root sivulle
    
});

module.exports = router;