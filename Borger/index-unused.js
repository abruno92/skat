const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express(); 
// mainly to publish application, but only developing on local host so using port 5000
const port = process.env.PORT || 5000;

/* For passing json data later on, urlencodes is a 
function that parses incoming requests with urlencoded payloads,
(false) uses query-string library, which does not support creating a nested object from your query string. */
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// MySQL
// Connection pool, to reuse connection when future requests to db are required (like a cache of db connection)
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'test',
    database: 'skatdb'
});

// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))

const app = require('app.js');

//Get All
app.get('', (req, res) => {
    req.socket.setTimeout(10000);
    pool.getConnection((err, connection) => {
        if(err) throw err

        //queryString, callback
        connection.query('SELECT * FROM BorgerUser', (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            }else{
                console.log(err)
            }
        })
    });
});

//Get an entry by id
app.get('/:id', (req, res) => {
    req.socket.setTimeout(10000);
    pool.getConnection((err, connection) => {
        if(err) throw err

        //queryString, callback
        connection.query('SELECT * FROM BorgerUser WHERE Id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            }else{
                console.log(err)
            }
        })
    });
});

//Delete an entry (need to delete both records in table)
app.delete('/:id', (req, res) => {
    req.socket.setTimeout(10000);
    pool.getConnection((err, connection) => {
        if(err) throw err

        //queryString, callback
        connection.query('DELETE FROM BorgerUser WHERE Id = ?', [req.params.id], (err) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`Entry ${[req.params.id]} was successfully deleted`)
            }else{
                console.log(err)
            }
        })
    });
});

//Add an entry (need to add both records in table)
app.post('', (req, res) => {
    req.socket.setTimeout(10000);
    pool.getConnection((err, connection) => {
        if(err) throw err

        // getting data passed from insomnia
        const params = req.body
        connection.query('INSERT INTO BorgerUser SET ?', params, (err) => {
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

//Update an entry (need to add both records in table)
app.put('', (req, res) => {
    req.socket.setTimeout(10000);
    pool.getConnection((err, connection) => {
        if(err) throw err

        const {Id, Address} = req.body;

        connection.query('UPDATE BorgerUser SET BorgerUser = ? WHERE Id = ?', [Address, Id], (err) => {
            connection.release()

            if(!err) {
                res.send(`Entry was succesfully updated`)
            }else{
                console.log(err)
            }
        })
    });
});