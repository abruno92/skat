const express = require('express');
let router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'test',
    database: 'skat'
});

// Get All Rows
router.get('/', (req, res) => {
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

module.exports = router;