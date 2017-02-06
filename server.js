require('dotenv').config()

var express = require('express'),
 expressLayouts = require('express-ejs-layouts'),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose');

/** CONFIGURATION ***************************/
var app = express();
var port = 8080;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.DB_URI);
mongoose.connection.once('connected', function() {
	console.log("Connected to database")
});
/** ROUTING *********************************/
var router = require('./app/routes');
app.use("/", router);

app.use(express.static(__dirname + '/public'));

/** START SERVER ****************************/
app.listen(port, function () {
    console.log("app started on http://localhost:"+port);
});
