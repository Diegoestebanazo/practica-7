var createError = require('http-errors'); 
var express = require('express');
var indexRouter = require('./routes/index');
var tareasRouter = require('./routes/tareas');
var app = express();
var path = require('path');
var viewPath = path.join(__dirname, 'views');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');


app.set('views', viewPath);
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use('/',indexRouter);
app.use('/tareas',tareasRouter);

app.use(function(req, res, next){
    next(createError(404));
});

app.use(function(err, req, res, next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;