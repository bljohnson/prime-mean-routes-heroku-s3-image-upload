require('dotenv').load();//loads environment variables locally
var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var uploads = require('./routes/uploads');
var index = require('./routes/index');

// middleware
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// express routes

app.use('/uploads', uploads);
app.use('/*', index);


// mongoose connection, if you'd like to run a local database, set MONGODB_URI in .env file to local address

var connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open ', connectionString);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose error connecting ', err);
});
// Handle index file separately
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
})

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
