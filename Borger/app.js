const express = require('express');
const bodyParser = require('body-parser');
const address = require('./routers/address');
const borgerUser = require('./routers/borgerUser');
const {port} = require('./config');

const app = express(); 
app.use(bodyParser.json());
app.use('/address', address);
app.use('/borgerUser', borgerUser);

app.listen(port, () => console.log(`Listening on port ${port}`))