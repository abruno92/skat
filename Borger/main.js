const express = require('express');
const bodyParser = require('body-parser');
const address = require('./address');
const borgerUser = require('./borgerUser');

const app = express(); 

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/address', address);
app.use('/borgerUser', borgerUser);

app.listen(port, () => { console.log(`listening on ${port}`)});