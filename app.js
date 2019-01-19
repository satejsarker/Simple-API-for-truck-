var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
}, (error, connect) => {
    if (error) {
        console.log("not connected")
    } else {
        console.log("Mongo DB connected")
    }
});
var indexRouter = require('./routes/index');
var Api = require('./routes/Api');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', Api);

module.exports = app;
