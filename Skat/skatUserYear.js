const router = require('express').Router();
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'test',
    database: 'skat'
});