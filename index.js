var express = require('express');
var routes = require('./routes/route');
var bodyParser = require('body-parser');

 var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/email', routes);




 var port = process.env.PORT || 3001; //select your port or let it pull from your .env file
app.listen(port);
console.log("listening on " + port + "!");