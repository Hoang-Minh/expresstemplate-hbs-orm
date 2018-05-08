// npm packages
var express = require('express')
var bodyparser = require('body-parser')
var path = require('path')
var morgan = require('morgan')
var expresshbs = require('express-handlebars')
var config = require("./config/connection");

// new express app
var app = express()

// middleware
app.use(morgan('dev'))
app.engine('hbs', expresshbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

// your code here...
app.get('/', function (req, res) {
  config.query(`SELECT * FROM peeps`, function(e, r){
    if(e) throw e;
    res.render("index", {peopel: r}); // is not working since we don't have database yet
  })
  res.render('index')
})

app.delete("/users/:id", function(req, res){
  var id = req.params.id;
  config.query(`DELETE FROM users WHERE id = ` + id, function(e, r){
    if(e) throw e;
    res.send(200);
  })
})

var orm = require("./config/orm");
orm.selectAll("peeps", function(r){
  console.log(r);
});
orm.selectWhere("peeps", "id", 4, function(r){
  console.log(r);
});
orm.select("*", "peeps", function(r){
  console.log(r);
});

orm.delete("peeps", "id", 1, function(r){
  console.log(r);
})

var PORT = process.env.PORT || 3000
// listening port
app.listen(PORT, function (e) {
  if (e) throw e
})
