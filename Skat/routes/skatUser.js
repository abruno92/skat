const express = require('express');
let router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'test',
    database: 'skat'
});

// Get all Skat users
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

// Create new Skat user
router.post('', (req, res) => {
    req.socket.setTimeout(10000);
    pool.getConnection((err, connection) => {
        if(err) throw err

        const params = req.body
        connection.query('INSERT INTO SkatUser SET ?', params, (err) => {
            connection.release()

            if(!err) {
                res.send(`Entry was succesfully added`)
            }else{
                console.log(err)
            }
        })

        console.log('The data just added is at ');
    });
});

// Update Existing Skat User
router.put('', (req, res) => {
    req.socket.setTimeout(10000);
    pool.getConnection((err, connection) => {
        if(err) throw err

        const {Id, Address} = req.body;

        connection.query('UPDATE SkatUser SET SkatUser = ? WHERE Id = ?', [SkatUser, Id], (err) => {
            connection.release()

            if(!err) {
                res.send(`Entry was succesfully updated`)
            }else{
                console.log(err)
            }
        })
    });
});

// Delete skat user by ID
router.delete('/:id', (req, res) => {
    req.socket.setTimeout(10000);
    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query('DELETE FROM Address WHERE Id = ?', [req.params.id], (err) => {
            connection.release() 

            if(!err) {
                res.send(`Entry ${[req.params.id]} was successfully deleted`)
            }else{
                console.log(err)
            }
        })
    });
});

module.exports = router;

