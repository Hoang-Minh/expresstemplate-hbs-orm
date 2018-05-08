var mysql      = require('mysql');
var config = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'peepsandpets_db'
});

config.connect(function(e, r){
    if(e) throw e;
    console.log("database is up and running");
})
module.exports = config;