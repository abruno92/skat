const express = require('express');
const bodyParser = require('body-parser');
const skatUser = require('./skatUser');
const skatUserYear = require('./skatUserYear');
const skatYear = require('./skatYear');

const app = express(); 

const port = process.env.PORT || 5002;

// to pass the json data later on 
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/skatUser', skatUser);
app.use('/skatUserYear', skatUserYear);
app.use('/skatYear', skatYear);

app.listen(port, () => { console.log(`listening on ${port}`)});