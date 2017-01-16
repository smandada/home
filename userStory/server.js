var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require("./config");
var mongoose = require("mongoose");
var app = express();

mongoose.connect(config.database, function(err){
  if(err) {
    console.log('Error connecting');
  } else {
    console.log('Database Connection success');
  }
});

app.use(bodyParser.urlencoded({encoded: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var api = require('./app/routes/api')(app, express);
//middleware, passing api , /api is prefix for everything in the file api.js
app.use('/api', api);

app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/views/index.html')
});

app.listen(config.port, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log('Listening on port 3000');
  }
});