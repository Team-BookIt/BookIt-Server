const { pool } = require('../../Config/db');

const createUser = async(user) => {
    try{ 
        const query =  `INSERT INTO guest(first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *`;
        const values = [user.first_name, user.last_name, user.email, user.password];
        const result = pool.query(query, values);
        return result.rows;
    } catch(error) {
        console.error(error);
        throw error;
    }
}


module.exports = { createUser };