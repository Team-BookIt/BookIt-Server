const postgres = require('postgres');
const { DB_URL } = process.env;

const connectionString = DB_URL;
const sql = postgres(connectionString);

module.exports = sql;