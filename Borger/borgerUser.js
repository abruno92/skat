const router = require('express').Router();
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'test',
    database: 'skatdb'
});

//Get All
router.get('', (req, res) => {
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
router.get('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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
router.post('', (req, res) => {
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
router.put('', (req, res) => {
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

module.exports = router;