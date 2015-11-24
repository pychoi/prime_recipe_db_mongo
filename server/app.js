var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var submit = require('./routes/submit');
//var search = require('./routes/search');


app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

app.use('/submit', submit);
//app.use('/search', search);
app.use('/', index);

app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;