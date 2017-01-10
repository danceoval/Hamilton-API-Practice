var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var swig = require('swig');
swig.setDefaults( { cache: false });

var app = express();

app.use(express.static(path.join(__dirname, 'node_modules')));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', function(req, res, next){
  res.render('index', {title: 'Acme Sales', mode: 'home' });
});
app.use('/instructors', require('./routes/instructors'));
app.use('/campus', require('./routes/campus'));
app.use('/instructorCampus', require('./routes/instructorCampus'));

module.exports = app;
