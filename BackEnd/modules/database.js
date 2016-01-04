var mongoose = require("mongoose");
var db_name = "oma";
var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;

if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

mongoose.connect(mongodb_connection_string,connectionStatus);

/**
  *Connectuion callback for fail and ok cases
  */
function connectionStatus(err,ok){
    
    if(err){
        
        console.log(err.message);
        
    }else{
        
        console.log("We are connected!");
        
    }
}

//referenssitaulukko. sql:ssa join
//yhden suhde moneen, eli yksi pw / henkilö
var User = mongoose.model('User',{            // malli jolle nimi User
    username:{type:String,unique:true},       // uniikki
    password:String,
    friends:[{type:mongoose.Schema.Types.ObjectId, ref:'Person'}]  //uuden henkilön indeksi friends taulukkoon. ref:llä viitataan nimeen
});


var Person = mongoose.model('Person', {   //joka collectionista tehtävä malli (schema). tee tästä kopio user malliin!!!    
    name:String,
    address:String,
    age:{type:Number} //, min:0,max:120,default:2}
},'person');          // viittaa collectionin nimen


/******** Using exports object you exspose the data to other modules ********/

exports.Person = Person;         //Person 
exports.Friends = User;          
exports.myFunction = function() {
    
    console.log("This ");
}