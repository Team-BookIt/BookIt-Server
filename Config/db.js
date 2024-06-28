const { Pool } = require('pg');
const { USER, HOST, DATABASE, PASSWORD, DB_PORT } = process.env;

const pool = new Pool({
    user : USER,
    host : HOST,
    database : DATABASE,
    password : PASSWORD,
    port : DB_PORT
})

module.exports = { pool };