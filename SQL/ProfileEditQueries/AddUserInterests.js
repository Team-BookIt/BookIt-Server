const pool = require('../../Config/db');

module.exports.addUserInterests = async(userInterests, userID) => {
    // LOGIC:
    // Since we're adding multiple rows dynamically, we have to adjust our placeholder as such
    // 1 - We map through the array of user interests, using each element's index + 2 as it's 
    //     placeholder (3rd element will have a placeholder value of $5).
    // 2 - Each placeholder value will have the same `guest_id` attached to it. Hence the fixed $1
    //     placeholder.

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