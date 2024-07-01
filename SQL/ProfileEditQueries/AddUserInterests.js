const { pool } = require('../../Config/db');

module.exports.addUserInterests = async(userInterests, userID) => {
    try {
        const placeholder = userInterests.map((_, index) => `($1, $${index + 2})`).join(', ');

        const query = `INSERT INTO interest (guest_id, interest)
                       VALUES ${placeholder}
                       RETURNING *`;

        const values = [userID, ...userInterests];

        const response = await pool.query(query, values);

        return response.rows;

    } catch(error) {
        console.error("Error inserting user interests: ", error)
        throw error;
    }
}