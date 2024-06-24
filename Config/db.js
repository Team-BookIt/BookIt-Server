const { Pool } = require('pg');
const { USER, HOST, DATABASE, PASSWORD, DB_PORT } = process.env;

const pool = new Pool({
    user : USER,
    host : HOST,
    database : DATABASE,
    password : PASSWORD,
    port : DB_PORT
})

pool.connect((err) => {
    if (err) throw err
    console.log('Connected to PostgreSQL successfully!')
    })

module.exports = { pool };