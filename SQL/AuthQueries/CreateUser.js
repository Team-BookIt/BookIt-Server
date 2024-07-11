const pool = require('../../Config/db');
const bcrypt = require('bcrypt');

const createUser = async(user) => {
    try{ 
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(user.password, 12);
        let query =  `INSERT INTO guest(first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *`;
        const values = [user.first_name, user.last_name, user.email, hashedPassword];
        const newUser = await pool.query(query, values);

        console.log("User created successfully", newUser.rows);

        query = `SELECT * FROM guest WHERE email = $1`
        userDetails = await pool.query(query, [user.email]);

        return userDetails.rows[0];
    } catch(error) {
        console.error(error);
        throw error;
    }
}


module.exports = { createUser };