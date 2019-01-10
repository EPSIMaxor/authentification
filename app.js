var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cors = require('cors');



var authRouter = require('./routes/auth');
var validateRouter = require('./routes/validate');


var app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.text());


app.use(bodyParser.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/validate', validateRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(res, req)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(err.status).send(JSON.parse('{"error":"'+ err.message +'"}'))
});

module.exports = app;
