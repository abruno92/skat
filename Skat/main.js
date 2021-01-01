const express = require('express');
const skatUser = require('./routes/skatUser');
const skatUserYear = require('./routes/skatUserYear');
const skatYear = require('./routes/skatYear');

const app = express(); 

const port = process.env.PORT || 5002;

app.use('/skatUser', skatUser);
// use the skatUser.js file to handle endoing that start with skatUser

app.use('/skatUserYear', skatUserYear);

app.use('/skatYear', skatYear);

app.listen(port, () => { console.log(`listening on ${port}`)});