var mysql      = require('mysql');
var config = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'my_db'
});

config.connect(e, r){
    if(e) throw e;
    console.log("Database connection is up and runing");
}
module.exports = config;