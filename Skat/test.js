const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express(); 

const port = process.env.PORT || 5003;

// to pass the json data later on 
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.listen(port, () => { console.log(`listening on ${port}`)});


const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'test',
    database: 'skat'
});


// Get All Rows
app.get('', (req, res) => {
    req.socket.setTimeout(10000);
    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query('SELECT * FROM SkatUser', (err, rows) => {
            connection.release() 

            if(!err) {
                res.send(rows)
            }else{
                console.log(err)
            }
        })
    });
});